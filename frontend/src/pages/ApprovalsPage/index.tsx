import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/use-auth";
import {
  Inbox,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldAlert,
  AlertTriangle,
  Check,
  X,
  Loader2,
  RefreshCw,
  ExternalLink
} from "lucide-react";

export function ApprovalsPage() {
  const { user, role } = useAuth();
  const qc = useQueryClient();

  const [rejectId, setRejectId] = useState<number | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [actionError, setActionError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");

  const {
    data: approvals = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["approvals"],
    queryFn: async () => {
      const res = await api.get("/approvals");
      return res.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (id: number) => {
      await api.post(`/access-requests/${id}/approve`);
    },
    onSuccess: () => {
      setActionSuccess("Request successfully approved.");
      qc.invalidateQueries({ queryKey: ["approvals"] });
      qc.invalidateQueries({ queryKey: ["access-requests"] });
      refetch();
    },
    onError: (err: any) => {
      if (err.response?.status === 409) {
        setActionError("This request was already processed or has changed. Please refresh the inbox.");
      } else if (err.response?.status === 403) {
        setActionError("You are not authorized to perform this action.");
      } else {
        setActionError(err.response?.data?.error || err.message || "Failed to approve request.");
      }
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async ({ id, reason }: { id: number; reason: string }) => {
      await api.post(`/access-requests/${id}/reject`, { reason });
    },
    onSuccess: () => {
      setActionSuccess("Request successfully rejected.");
      setRejectId(null);
      setRejectReason("");
      qc.invalidateQueries({ queryKey: ["approvals"] });
      qc.invalidateQueries({ queryKey: ["access-requests"] });
      refetch();
    },
    onError: (err: any) => {
      if (err.response?.status === 409) {
        setActionError("This request was already processed or has changed. Please refresh the inbox.");
      } else if (err.response?.status === 403) {
        setActionError("You are not authorized to perform this action.");
      } else {
        setActionError(err.response?.data?.error || err.message || "Failed to reject request.");
      }
    },
  });

  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectReason.trim() || rejectId === null) {
      setActionError("A reason is required to reject this request.");
      return;
    }
    setActionError("");
    setActionSuccess("");
    rejectMutation.mutate({ id: rejectId, reason: rejectReason.trim() });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Approval Inbox
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
              {approvals.length} Pending
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Requests requiring your review as <span className="font-semibold text-slate-800">{role}</span> ({user?.label}).
          </p>
        </div>

        <button
          onClick={() => {
            setActionError("");
            setActionSuccess("");
            refetch();
          }}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
          Refresh Inbox
        </button>
      </div>

      {actionSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{actionSuccess}</span>
          </div>
          <button onClick={() => setActionSuccess("")} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {actionError && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span>{actionError}</span>
          </div>
          <button onClick={() => setActionError("")} className="text-red-700 hover:text-red-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600 mb-2" />
            <span className="text-xs">Loading pending approvals...</span>
          </div>
        ) : error ? (
          <div className="py-16 text-center">
            <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-900">Failed to load inbox</h3>
            <p className="text-xs text-slate-500 mt-1">
              {(error as any)?.response?.data?.error || (error as any)?.message}
            </p>
            <button
              onClick={() => refetch()}
              className="mt-3 px-3.5 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition"
            >
              Retry
            </button>
          </div>
        ) : approvals.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
              <Inbox className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">Your approval inbox is clear</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              No pending access requests currently require your approval.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-left">
              <thead className="bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">ID</th>
                  <th className="px-6 py-3.5">Requester</th>
                  <th className="px-6 py-3.5">Application</th>
                  <th className="px-6 py-3.5">Environment</th>
                  <th className="px-6 py-3.5">Access Level</th>
                  <th className="px-6 py-3.5">Current Stage</th>
                  <th className="px-6 py-3.5">Created</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {approvals.map((req: any) => {
                  const isHighRisk = req.environment === "Production" || req.accessLevel === "Admin";
                  const isProcessing =
                    (approveMutation.isPending && approveMutation.variables === req.id) ||
                    (rejectMutation.isPending && rejectMutation.variables?.id === req.id);

                  return (
                    <tr key={req.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4 font-mono text-slate-500 font-semibold">
                        #{req.id}
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {req.requesterEmail}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-900">
                          {req.applicationName || (req.applicationId === 1 ? "CRM" : "Finance Portal")}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${
                          req.environment === "Production"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-slate-100 text-slate-600"
                        }`}>
                          {req.environment}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${
                            req.accessLevel === "Admin"
                              ? "bg-purple-50 text-purple-700 border border-purple-200 font-semibold"
                              : "bg-slate-100 text-slate-600"
                          }`}>
                            {req.accessLevel}
                          </span>
                          {isHighRisk && (
                            <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold">
                              High Risk
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                          <Clock className="w-3.5 h-3.5" />
                          {req.status === "WaitingForManager" ? "Manager Review" : "System Owner Review"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                        {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : "-"}
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to="/requests/$id"
                            params={{ id: String(req.id) }}
                            className="text-slate-500 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-100 transition mr-1"
                            title="View Full Detail"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => {
                              setActionError("");
                              setActionSuccess("");
                              approveMutation.mutate(req.id);
                            }}
                            disabled={isProcessing}
                            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs disabled:opacity-50 transition"
                          >
                            {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                            Approve
                          </button>

                          <button
                            onClick={() => {
                              setActionError("");
                              setActionSuccess("");
                              setRejectId(req.id);
                              setRejectReason("");
                            }}
                            disabled={isProcessing}
                            className="flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold shadow-xs disabled:opacity-50 transition"
                          >
                            <X className="w-3.5 h-3.5" />
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {rejectId !== null && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in-50 zoom-in-95">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Reject Request #{rejectId}</h3>
              <button
                onClick={() => setRejectId(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Please enter the justification for declining this request. This will be visible to the requester.
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
                  placeholder="e.g., Access level exceeds business requirements..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:bg-white focus:border-red-600 outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRejectId(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={rejectMutation.isPending}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-red-600/20 disabled:opacity-50 transition"
                >
                  {rejectMutation.isPending ? "Submitting..." : "Reject Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
