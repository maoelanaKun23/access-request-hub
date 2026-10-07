import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/use-auth";
import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  PlusCircle,
  Loader2,
  RefreshCw,
  AlertTriangle,
  ExternalLink,
  ShieldAlert
} from "lucide-react";
import { useState } from "react";

export function RequestsPage() {
  const { user, role } = useAuth();
  const [filterStatus, setFilterStatus] = useState<string>("All");

  const {
    data: requests = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["access-requests"],
    queryFn: async () => {
      const res = await api.get("/access-requests");
      return res.data;
    },
  });

  const isRequester = role === "Requester";
  const isAdmin = role === "Admin";

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

  const filteredRequests = requests.filter((r: any) => {
    if (filterStatus === "All") return true;
    if (filterStatus === "Pending") return r.status === "WaitingForManager" || r.status === "WaitingForSystemOwner";
    return r.status === filterStatus;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {isAdmin ? "All Access Requests" : "My Requests"}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {isAdmin
              ? "System-wide view of all submitted access requests and statuses."
              : "Track and review your submitted application access requests."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
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
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        {["All", "Pending", "Approved", "Rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              filterStatus === status
                ? "bg-slate-900 text-white font-semibold"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600 mb-2" />
            <span className="text-xs">Loading requests...</span>
          </div>
        ) : error ? (
          <div className="py-16 text-center">
            <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-900">Failed to load requests</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              {(error as any)?.response?.data?.error || (error as any)?.message}
            </p>
            <button
              onClick={() => refetch()}
              className="mt-3 px-3.5 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition"
            >
              Retry
            </button>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">No requests found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              {filterStatus !== "All"
                ? `No requests match the "${filterStatus}" status.`
                : "You have not submitted any access requests yet."}
            </p>
            {isRequester && filterStatus === "All" && (
              <Link
                to="/requests/new"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition"
              >
                <PlusCircle className="w-4 h-4" />
                Submit Access Request
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-left">
              <thead className="bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Request ID</th>
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
                {filteredRequests.map((req: any) => {
                  const isHighRisk = req.environment === "Production" || req.accessLevel === "Admin";
                  return (
                    <tr key={req.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-6 py-4 font-mono text-slate-500 font-semibold">
                        #{req.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">
                          {req.applicationName || (req.applicationId === 1 ? "CRM" : "Finance Portal")}
                        </div>
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
                      <td className="px-6 py-4 text-slate-600">
                        {req.requesterEmail}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(req.status)}
                      </td>
                      <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                        {req.createdAt ? new Date(req.createdAt).toLocaleString() : "-"}
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <Link
                          to="/requests/$id"
                          params={{ id: String(req.id) }}
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold px-2.5 py-1.5 rounded-lg hover:bg-blue-50 transition"
                        >
                          View Details
                          <ExternalLink className="w-3.5 h-3.5" />
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
