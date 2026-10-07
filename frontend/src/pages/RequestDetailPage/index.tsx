import { useState } from "react";
import { useParams, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/use-auth";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  History,
  User,
  Building,
  Check,
  X,
  Loader2,
  FileText
} from "lucide-react";

export function RequestDetailPage() {
  const { id } = useParams({ strict: false });
  const { user, role } = useAuth();
  const qc = useQueryClient();
  const navigate = useNavigate();

  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [actionError, setActionError] = useState("");

  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["access-requests", id],
    queryFn: async () => {
      const res = await api.get(`/access-requests/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const req = data?.request;
  const auditTrail: any[] = data?.auditTrail || [];

  const isHighRisk = req?.environment === "Production" || req?.accessLevel === "Admin";

  const canApprove =
    (req?.status === "WaitingForManager" && role === "Manager") ||
    (req?.status === "WaitingForSystemOwner" && role === "System Owner");

  const approveMutation = useMutation({
    mutationFn: async () => {
      await api.post(`/access-requests/${id}/approve`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["access-requests"] });
      qc.invalidateQueries({ queryKey: ["approvals"] });
      refetch();
    },
    onError: (err: any) => {
      if (err.response?.status === 409) {
        setActionError("This request was already processed or has changed. Please refresh the page.");
      } else if (err.response?.status === 403) {
        setActionError("You are not authorized to perform this action.");
      } else {
        setActionError(err.response?.data?.error || err.message || "Approval failed.");
      }
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (reason: string) => {
      await api.post(`/access-requests/${id}/reject`, { reason });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["access-requests"] });
      qc.invalidateQueries({ queryKey: ["approvals"] });
      setRejectModalOpen(false);
      setRejectReason("");
      refetch();
    },
    onError: (err: any) => {
      if (err.response?.status === 409) {
        setActionError("This request was already processed or has changed. Please refresh the page.");
      } else if (err.response?.status === 403) {
        setActionError("You are not authorized to perform this action.");
      } else {
        setActionError(err.response?.data?.error || err.message || "Rejection failed.");
      }
    },
  });

  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectReason.trim()) {
      setActionError("A reason is strictly required to reject this request.");
      return;
    }
    setActionError("");
    rejectMutation.mutate(rejectReason.trim());
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Approved
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">
            <XCircle className="w-4 h-4 text-red-600" /> Rejected
          </span>
        );
      case "WaitingForManager":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <Clock className="w-4 h-4 text-blue-600" /> Waiting for Manager
          </span>
        );
      case "WaitingForSystemOwner":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
            <Clock className="w-4 h-4 text-purple-600" /> Waiting for System Owner
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
            {status}
          </span>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="p-12 flex flex-col items-center justify-center text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-3" />
        <span className="text-sm font-medium">Loading request #{id}...</span>
      </div>
    );
  }

  if (error || !req) {
    return (
      <div className="p-12 max-w-lg mx-auto text-center">
        <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-900">Request Not Found or Inaccessible</h2>
        <p className="text-xs text-slate-500 mt-1">
          {(error as any)?.response?.data?.error || (error as any)?.message || "You may not have permissions to view this request."}
        </p>
        <Link
          to="/requests"
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Requests
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Top Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/requests"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Request #{req.id}
              </h1>
              {getStatusBadge(req.status)}
              {isHighRisk && (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  High Risk
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Client Request ID: {req.clientRequestId}
            </p>
          </div>
        </div>

        {canApprove && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setActionError("");
                approveMutation.mutate();
              }}
              disabled={approveMutation.isPending}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-emerald-600/20 disabled:opacity-50 transition"
            >
              {approveMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              Approve Request
            </button>
            <button
              onClick={() => {
                setActionError("");
                setRejectModalOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-red-600/20 transition"
            >
              <X className="w-4 h-4" />
              Reject Request
            </button>
          </div>
        )}
      </div>

      {actionError && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-3 text-xs font-medium">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <div>
            <div className="font-bold">Action Failed</div>
            <div>{actionError}</div>
          </div>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">
          Approval Workflow Progress
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
          <div className="flex-1 w-full text-center p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-2 text-xs font-bold shadow-sm">
              <Check className="w-4 h-4" />
            </div>
            <div className="text-xs font-bold text-slate-900">1. Submission</div>
            <div className="text-[11px] text-emerald-700 mt-0.5">{req.requesterEmail}</div>
          </div>

          <div className="hidden md:block w-8 border-t-2 border-slate-200" />

          <div
            className={`flex-1 w-full text-center p-4 rounded-2xl border transition ${
              req.status === "WaitingForManager"
                ? "bg-blue-50/80 border-blue-400 ring-2 ring-blue-500/20"
                : req.status === "WaitingForSystemOwner" || req.status === "Approved"
                ? "bg-emerald-50/60 border-emerald-200"
                : req.status === "Rejected"
                ? "bg-slate-50 border-slate-200"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 text-xs font-bold ${
                req.status === "WaitingForManager"
                  ? "bg-blue-600 text-white animate-pulse"
                  : req.status === "WaitingForSystemOwner" || req.status === "Approved"
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              {req.status === "WaitingForSystemOwner" || req.status === "Approved" ? (
                <Check className="w-4 h-4" />
              ) : (
                "2"
              )}
            </div>
            <div className="text-xs font-bold text-slate-900">2. Manager Review</div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              {req.status === "WaitingForManager" ? "Awaiting Decision" : "Completed"}
            </div>
          </div>

          {isHighRisk && (
            <>
              <div className="hidden md:block w-8 border-t-2 border-slate-200" />
              <div
                className={`flex-1 w-full text-center p-4 rounded-2xl border transition ${
                  req.status === "WaitingForSystemOwner"
                    ? "bg-purple-50/80 border-purple-400 ring-2 ring-purple-500/20"
                    : req.status === "Approved"
                    ? "bg-emerald-50/60 border-emerald-200"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 text-xs font-bold ${
                    req.status === "WaitingForSystemOwner"
                      ? "bg-purple-600 text-white animate-pulse"
                      : req.status === "Approved"
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {req.status === "Approved" ? <Check className="w-4 h-4" /> : "3"}
                </div>
                <div className="text-xs font-bold text-slate-900">3. System Owner Review</div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {req.status === "WaitingForSystemOwner" ? "Awaiting Decision" : isHighRisk ? "Required (High-Risk)" : "Skipped"}
                </div>
              </div>
            </>
          )}

          <div className="hidden md:block w-8 border-t-2 border-slate-200" />

          <div
            className={`flex-1 w-full text-center p-4 rounded-2xl border ${
              req.status === "Approved"
                ? "bg-emerald-50/80 border-emerald-300"
                : req.status === "Rejected"
                ? "bg-red-50/80 border-red-300"
                : "bg-slate-50 border-slate-200 opacity-60"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 text-xs font-bold ${
                req.status === "Approved"
                  ? "bg-emerald-600 text-white"
                  : req.status === "Rejected"
                  ? "bg-red-600 text-white"
                  : "bg-slate-200 text-slate-400"
              }`}
            >
              {req.status === "Approved" ? (
                <Check className="w-4 h-4" />
              ) : req.status === "Rejected" ? (
                <X className="w-4 h-4" />
              ) : (
                "✓"
              )}
            </div>
            <div className="text-xs font-bold text-slate-900">
              {req.status === "Rejected" ? "Rejected" : "Final State"}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              {req.status === "Approved" || req.status === "Rejected" ? req.status : "Pending"}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-3">
            Request Specifications
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Application:</span>
              <span className="font-semibold text-slate-900">
                {req.applicationName || (req.applicationId === 1 ? "CRM" : "Finance Portal")}
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Environment:</span>
              <span className={`px-2 py-0.5 rounded font-semibold ${
                req.environment === "Production"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-slate-100 text-slate-800"
              }`}>
                {req.environment}
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Access Level:</span>
              <span className={`px-2 py-0.5 rounded font-semibold ${
                req.accessLevel === "Admin"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-slate-100 text-slate-800"
              }`}>
                {req.accessLevel}
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Risk Assessment:</span>
              <span className={`px-2 py-0.5 rounded font-bold ${
                isHighRisk ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"
              }`}>
                {isHighRisk ? "High Risk" : "Standard"}
              </span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Policy Version:</span>
              <span className="font-mono text-slate-600">
                {req.policyVersion || "Default Policy"}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-3">
            Metadata & Justification
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Requester Email:</span>
              <span className="font-semibold text-slate-900">{req.requesterEmail}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Created At:</span>
              <span className="text-slate-600">{new Date(req.createdAt).toLocaleString()}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">Last Updated:</span>
              <span className="text-slate-600">{new Date(req.updatedAt).toLocaleString()}</span>
            </div>

            <div className="pt-2">
              <span className="text-slate-500 block mb-1">Justification:</span>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-slate-800 font-medium whitespace-pre-wrap leading-relaxed">
                {req.justification}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <History className="w-4 h-4 text-slate-500" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Audit Timeline & State History
          </h2>
        </div>

        <div className="space-y-6 pl-4 border-l-2 border-slate-200 relative">
          {auditTrail.length === 0 ? (
            <div className="text-xs text-slate-400 py-4">No audit events recorded yet.</div>
          ) : (
            auditTrail.map((evt: any) => (
              <div key={evt.id} className="relative group">
                <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-white" />

                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">
                      {evt.action}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(evt.timestamp).toLocaleString()}
                    </span>
                  </div>

                  <div className="text-slate-600">
                    <span className="text-slate-400">Actor: </span>
                    <span className="font-semibold text-slate-800">{evt.performedByEmail}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="text-slate-400">Transition:</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-mono">
                      {evt.oldStatus || "None"}
                    </span>
                    <span className="text-slate-400">➔</span>
                    <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-mono font-semibold">
                      {evt.newStatus}
                    </span>
                  </div>

                  {evt.reason && (
                    <div className="mt-2 p-2.5 rounded-xl bg-red-50/70 border border-red-200 text-red-900">
                      <span className="font-bold text-[11px]">Rejection Reason: </span>
                      {evt.reason}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {rejectModalOpen && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in-50 zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Reject Access Request</h3>
              <button
                onClick={() => setRejectModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              A rejection reason is mandatory and will be recorded permanently in the audit history.
            </p>

            <form onSubmit={handleRejectSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Rejection Reason <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Explain why this request is being rejected..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:bg-white focus:border-red-600 outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={rejectMutation.isPending}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-red-600/20 disabled:opacity-50 transition"
                >
                  {rejectMutation.isPending ? "Rejecting..." : "Confirm Rejection"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
