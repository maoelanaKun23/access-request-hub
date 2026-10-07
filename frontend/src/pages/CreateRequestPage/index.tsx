import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/use-auth";
import {
  ShieldAlert,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Send,
  Info
} from "lucide-react";

export function CreateRequestPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [applicationId, setApplicationId] = useState<number>(1); // 1 = CRM, 2 = Finance Portal
  const [environment, setEnvironment] = useState<string>("NonProduction");
  const [accessLevel, setAccessLevel] = useState<string>("Read");
  const [justification, setJustification] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const isHighRisk = environment === "Production" || accessLevel === "Admin";

  const createMutation = useMutation({
    mutationFn: async (payload: {
      clientRequestId: string;
      applicationId: number;
      environment: string;
      accessLevel: string;
      justification: string;
    }) => {
      const res = await api.post("/access-requests", payload);
      return res.data;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["access-requests"] });
      navigate({
        to: "/requests/$id",
        params: { id: String(data.id) },
      });
    },
    onError: (err: any) => {
      if (err.response?.status === 400) {
        setErrorMessage(err.response?.data?.error || err.response?.data?.message || "Invalid input data.");
      } else if (err.response?.status === 409) {
        setErrorMessage("A request with this Client Request ID already exists or encountered a conflict.");
      } else if (err.response?.status === 403) {
        setErrorMessage("You are not authorized to perform this action.");
      } else {
        setErrorMessage(err.response?.data?.error || err.message || "Failed to create request.");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!justification.trim()) {
      setErrorMessage("Justification is required.");
      return;
    }

    const clientRequestId = crypto.randomUUID();

    createMutation.mutate({
      clientRequestId,
      applicationId: Number(applicationId),
      environment,
      accessLevel,
      justification: justification.trim(),
    });
  };

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate({ to: "/requests" })}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition"
          title="Back to Requests"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Create Access Request
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Submit a new access request for internal enterprise applications.
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xs">
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-sm">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
            <div>
              <div className="font-semibold">Request submission failed</div>
              <div className="text-xs text-red-700 mt-0.5">{errorMessage}</div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-500">Requester: </span>
              <span className="font-semibold text-slate-900">{user?.label}</span>
              <span className="text-slate-400 ml-1">({user?.email})</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-semibold text-[11px]">
              Simulated User
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Application <span className="text-red-500">*</span>
            </label>
            <select
              value={applicationId}
              onChange={(e) => setApplicationId(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:bg-white focus:border-blue-600 outline-none transition cursor-pointer"
            >
              <option value={1}>CRM (System Owner: Carol)</option>
              <option value={2}>Finance Portal (System Owner: Dana)</option>
            </select>
            <p className="text-[11px] text-slate-400 mt-1.5">
              Select the target internal enterprise software.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Environment <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition ${
                  environment === "NonProduction"
                    ? "border-blue-600 bg-blue-50/40 text-blue-900 font-semibold"
                    : "border-slate-200 hover:border-slate-300 text-slate-700"
                }`}
              >
                <input
                  type="radio"
                  name="environment"
                  value="NonProduction"
                  checked={environment === "NonProduction"}
                  onChange={() => setEnvironment("NonProduction")}
                  className="accent-blue-600"
                />
                <div>
                  <div className="text-sm">Non-Production</div>
                  <div className="text-[11px] text-slate-400 font-normal">Dev / Staging environments</div>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition ${
                  environment === "Production"
                    ? "border-amber-600 bg-amber-50/40 text-amber-900 font-semibold"
                    : "border-slate-200 hover:border-slate-300 text-slate-700"
                }`}
              >
                <input
                  type="radio"
                  name="environment"
                  value="Production"
                  checked={environment === "Production"}
                  onChange={() => setEnvironment("Production")}
                  className="accent-amber-600"
                />
                <div>
                  <div className="text-sm">Production</div>
                  <div className="text-[11px] text-slate-400 font-normal">Live enterprise data</div>
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Access Level <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition ${
                  accessLevel === "Read"
                    ? "border-blue-600 bg-blue-50/40 text-blue-900 font-semibold"
                    : "border-slate-200 hover:border-slate-300 text-slate-700"
                }`}
              >
                <input
                  type="radio"
                  name="accessLevel"
                  value="Read"
                  checked={accessLevel === "Read"}
                  onChange={() => setAccessLevel("Read")}
                  className="accent-blue-600"
                />
                <div>
                  <div className="text-sm">Read Access</div>
                  <div className="text-[11px] text-slate-400 font-normal">Standard view-only permission</div>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition ${
                  accessLevel === "Admin"
                    ? "border-purple-600 bg-purple-50/40 text-purple-900 font-semibold"
                    : "border-slate-200 hover:border-slate-300 text-slate-700"
                }`}
              >
                <input
                  type="radio"
                  name="accessLevel"
                  value="Admin"
                  checked={accessLevel === "Admin"}
                  onChange={() => setAccessLevel("Admin")}
                  className="accent-purple-600"
                />
                <div>
                  <div className="text-sm">Admin Access</div>
                  <div className="text-[11px] text-slate-400 font-normal">Privileged / administrative role</div>
                </div>
              </label>
            </div>
          </div>

          {isHighRisk ? (
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-300 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900 leading-relaxed">
                <span className="font-bold">High-Risk Request Detected:</span> Because you selected{" "}
                <span className="font-semibold">
                  {environment === "Production" && accessLevel === "Admin"
                    ? "Production & Admin Access"
                    : environment === "Production"
                    ? "Production"
                    : "Admin Access"}
                </span>
                , this request will require a 2-stage approval:
                <div className="mt-1 font-semibold text-amber-800">
                  Manager Approval ➔ System Owner Approval ➔ Final Decision
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <Info className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-slate-600">
                <span className="font-bold">Standard Request:</span> This non-high-risk request will only require your Manager's approval.
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Business Justification <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              placeholder="State the reason why access to this application is necessary..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 focus:bg-white focus:border-blue-600 outline-none transition resize-none"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Please provide clear context for your manager and system owner.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting Request...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Access Request
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
