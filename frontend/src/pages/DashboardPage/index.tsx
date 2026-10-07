import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/use-auth";
import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Inbox,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  PlusCircle,
  Loader2,
  RefreshCw
} from "lucide-react";

export function DashboardPage() {
  const { user, role } = useAuth();

  const {
    data: requests = [],
    isLoading: loadingRequests,
    error: requestsError,
    refetch: refetchRequests
  } = useQuery({
    queryKey: ["access-requests"],
    queryFn: async () => {
      const res = await api.get("/access-requests");
      return res.data;
    },
  });

  const isApprover = role === "Manager" || role === "System Owner";
  const {
    data: approvals = [],
    isLoading: loadingApprovals,
    refetch: refetchApprovals
  } = useQuery({
    queryKey: ["approvals"],
    queryFn: async () => {
      const res = await api.get("/approvals");
      return res.data;
    },
    enabled: isApprover,
  });

  const isRequester = role === "Requester";
  const isAdmin = role === "Admin";

  const totalRequests = requests.length;
  const waitingApproval = requests.filter(
    (r: any) => r.status === "WaitingForManager" || r.status === "WaitingForSystemOwner"
  ).length;
  const approvedCount = requests.filter((r: any) => r.status === "Approved").length;
  const rejectedCount = requests.filter((r: any) => r.status === "Rejected").length;

  const pendingApprovalsCount = approvals.length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Approved
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
            <XCircle className="w-3.5 h-3.5" /> Rejected
          </span>
        );
      case "WaitingForManager":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Clock className="w-3.5 h-3.5" /> Waiting for Manager
          </span>
        );
      case "WaitingForSystemOwner":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <Clock className="w-3.5 h-3.5" /> Waiting for System Owner
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Welcome back, <span className="font-semibold text-slate-700">{user?.label}</span>. Role:{" "}
            <span className="font-semibold text-blue-600">{user?.role}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              refetchRequests();
              if (isApprover) refetchApprovals();
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            Refresh
          </button>

          {isRequester && (
            <Link
              to="/requests/new"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm shadow-blue-500/20 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              New Access Request
            </Link>
          )}

          {isApprover && (
            <Link
              to="/approvals"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm shadow-blue-500/20 transition-all"
            >
              <Inbox className="w-4 h-4" />
              Go to Approval Inbox ({approvals.length})
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {isRequester && (
          <>
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider">Total Requests</span>
                <FileText className="w-4 h-4 text-slate-400" />
              </div>
              <div className="text-2xl font-bold text-slate-900">{totalRequests}</div>
              <div className="text-xs text-slate-400 mt-1">Submitted by you</div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between text-blue-600 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Waiting for Approval</span>
                <Clock className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-blue-600">{waitingApproval}</div>
              <div className="text-xs text-slate-400 mt-1">In review process</div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between text-emerald-600 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Approved</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-bold text-emerald-600">{approvedCount}</div>
              <div className="text-xs text-slate-400 mt-1">Access granted</div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between text-red-600 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Rejected</span>
                <XCircle className="w-4 h-4 text-red-500" />
              </div>
              <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
              <div className="text-xs text-slate-400 mt-1">Declined requests</div>
            </div>
          </>
        )}

        {isApprover && (
          <>
            <div className="bg-white border border-blue-200 rounded-2xl p-5 shadow-xs bg-gradient-to-br from-white to-blue-50/30">
              <div className="flex items-center justify-between text-blue-600 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-600">Pending Approvals</span>
                <Inbox className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-700">{pendingApprovalsCount}</div>
              <div className="text-xs text-blue-600/80 mt-1">Awaiting your action</div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider">Related Requests</span>
                <FileText className="w-4 h-4 text-slate-400" />
              </div>
              <div className="text-2xl font-bold text-slate-900">{totalRequests}</div>
              <div className="text-xs text-slate-400 mt-1">Visible in your scope</div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between text-emerald-600 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Approved</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-bold text-emerald-600">{approvedCount}</div>
              <div className="text-xs text-slate-400 mt-1">Processed</div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between text-red-600 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Rejected</span>
                <XCircle className="w-4 h-4 text-red-500" />
              </div>
              <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
              <div className="text-xs text-slate-400 mt-1">Declined</div>
            </div>
          </>
        )}

        {isAdmin && (
          <>
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider">Total Requests</span>
                <FileText className="w-4 h-4 text-slate-400" />
              </div>
              <div className="text-2xl font-bold text-slate-900">{totalRequests}</div>
              <div className="text-xs text-slate-400 mt-1">System-wide requests</div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between text-blue-600 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Pending</span>
                <Clock className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-blue-600">{waitingApproval}</div>
              <div className="text-xs text-slate-400 mt-1">In review</div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between text-emerald-600 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Approved</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-bold text-emerald-600">{approvedCount}</div>
              <div className="text-xs text-slate-400 mt-1">Approved requests</div>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between text-red-600 mb-2">
                <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Rejected</span>
                <XCircle className="w-4 h-4 text-red-500" />
              </div>
              <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
              <div className="text-xs text-slate-400 mt-1">Rejected requests</div>
            </div>
          </>
        )}
      </div>

      {isApprover && approvals.length > 0 && (
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-amber-900">
                You have {approvals.length} access request{approvals.length > 1 ? "s" : ""} waiting for your review
              </h3>
              <p className="text-xs text-amber-700 mt-0.5">
                Review and approve or reject requests assigned to your role.
              </p>
            </div>
          </div>
          <Link
            to="/approvals"
            className="flex items-center gap-1 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs transition"
          >
            Review Inbox
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              {isAdmin ? "System Access Requests" : "Your Requests"}
            </h2>
            <p className="text-xs text-slate-500">
              Showing recent access requests from the backend API
            </p>
          </div>
          <Link
            to="/requests"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            View all
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loadingRequests ? (
          <div className="py-16 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600 mb-2" />
            <span className="text-xs">Loading requests from server...</span>
          </div>
        ) : requestsError ? (
          <div className="py-12 px-6 text-center">
            <div className="inline-flex p-3 rounded-full bg-red-50 text-red-600 mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Failed to load requests</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {(requestsError as any)?.response?.data?.error || (requestsError as any)?.message || "Network error"}
            </p>
            <button
              onClick={() => refetchRequests()}
              className="mt-3 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition"
            >
              Try Again
            </button>
          </div>
        ) : requests.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">No requests found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              There are currently no access requests in this view.
            </p>
            {isRequester && (
              <Link
                to="/requests/new"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition"
              >
                <PlusCircle className="w-4 h-4" />
                Create First Request
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-left">
              <thead className="bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">ID</th>
                  <th className="px-6 py-3.5">Application</th>
                  <th className="px-6 py-3.5">Environment</th>
                  <th className="px-6 py-3.5">Access Level</th>
                  <th className="px-6 py-3.5">Requester</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Created</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {requests.slice(0, 5).map((req: any) => {
                  const isHighRisk = req.environment === "Production" || req.accessLevel === "Admin";
                  return (
                    <tr key={req.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-3.5 font-mono text-slate-500 font-medium">
                        #{req.id}
                      </td>
                      <td className="px-6 py-3.5">
                        <span className="font-semibold text-slate-900">
                          {req.applicationName || (req.applicationId === 1 ? "CRM" : "Finance Portal")}
                        </span>
                      </td>
                      <td className="px-6 py-3.5">
                        <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${
                          req.environment === "Production"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-slate-100 text-slate-600"
                        }`}>
                          {req.environment}
                        </span>
                      </td>
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${
                            req.accessLevel === "Admin"
                              ? "bg-purple-50 text-purple-700 border border-purple-200 font-semibold"
                              : "bg-slate-100 text-slate-600"
                          }`}>
                            {req.accessLevel}
                          </span>
                          {isHighRisk && (
                            <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.2 rounded font-bold">
                              High Risk
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-slate-600">
                        {req.requesterEmail}
                      </td>
                      <td className="px-6 py-3.5">
                        {getStatusBadge(req.status)}
                      </td>
                      <td className="px-6 py-3.5 text-slate-400 whitespace-nowrap">
                        {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : "-"}
                      </td>
                      <td className="px-6 py-3.5 text-right whitespace-nowrap">
                        <Link
                          to="/requests/$id"
                          params={{ id: String(req.id) }}
                          className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
