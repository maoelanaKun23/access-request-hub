import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/use-auth";
import {
  History,
  ShieldCheck,
  Loader2,
  RefreshCw,
  AlertTriangle,
  ArrowRight,
  ExternalLink
} from "lucide-react";

export function AuditTrailPage() {
  const { user } = useAuth();

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

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Audit Trail & Compliance
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
              Auditor View
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Complete compliance overview of system access requests, authorization states, and audit trails.
          </p>
        </div>

        <button
          onClick={() => refetch()}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
          Refresh
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-900">System Access Requests Audit Register</h2>
          <p className="text-xs text-slate-500">All historical access transactions and decisions</p>
        </div>

        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600 mb-2" />
            <span className="text-xs">Loading audit data...</span>
          </div>
        ) : error ? (
          <div className="py-16 text-center">
            <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-900">Failed to load audit records</h3>
            <p className="text-xs text-slate-500 mt-1">
              {(error as any)?.response?.data?.error || (error as any)?.message}
            </p>
          </div>
        ) : requests.length === 0 ? (
          <div className="py-20 text-center">
            <ShieldCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800">No requests recorded</h3>
            <p className="text-xs text-slate-400 mt-1">No access requests exist yet in the database.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-left">
              <thead className="bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3.5">Request ID</th>
                  <th className="px-6 py-3.5">Requester</th>
                  <th className="px-6 py-3.5">Application</th>
                  <th className="px-6 py-3.5">Environment</th>
                  <th className="px-6 py-3.5">Access Level</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Created At</th>
                  <th className="px-6 py-3.5 text-right">Audit Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {requests.map((req: any) => (
                  <tr key={req.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4 font-mono text-slate-500 font-semibold">
                      #{req.id}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {req.requesterEmail}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {req.applicationName || (req.applicationId === 1 ? "CRM" : "Finance Portal")}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${
                        req.environment === "Production"
                          ? "bg-amber-50 text-amber-700 border border-amber-200 font-bold"
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        {req.environment}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${
                        req.accessLevel === "Admin"
                          ? "bg-purple-50 text-purple-700 border border-purple-200 font-bold"
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        {req.accessLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-800">
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                      {req.createdAt ? new Date(req.createdAt).toLocaleString() : "-"}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <Link
                        to="/requests/$id"
                        params={{ id: String(req.id) }}
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                      >
                        Inspect Audit Trail
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
