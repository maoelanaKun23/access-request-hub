import { h as useParams, f as useQueryClient, u as useNavigate, r as reactExports, g as api, j as jsxRuntimeExports, L as Link, X } from './index-D7Nd4y7s.js';
import { u as useAuth, a as useQuery, b as useMutation } from './use-auth-B83PL5i7.js';
import { L as LoaderCircle } from './loader-circle-C5vKezmQ.js';
import { T as TriangleAlert } from './triangle-alert-ByfPFcxY.js';
import { A as ArrowLeft } from './arrow-left-Bqv5GadQ.js';
import { C as Check } from './check-B7a0GvC_.js';
import { H as History } from './history-x7QsqzCe.js';
import { a as Clock, C as CircleCheck } from './clock-BR5b8RyE.js';
import { C as CircleX } from './circle-x-CqK3UNrc.js';

function RequestDetailPage() {
  const { id } = useParams({ strict: false });
  const { role } = useAuth();
  const qc = useQueryClient();
  useNavigate();
  const [rejectModalOpen, setRejectModalOpen] = reactExports.useState(false);
  const [rejectReason, setRejectReason] = reactExports.useState("");
  const [actionError, setActionError] = reactExports.useState("");
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
    enabled: !!id
  });
  const req = data?.request;
  const auditTrail = data?.auditTrail || [];
  const isHighRisk = req?.environment === "Production" || req?.accessLevel === "Admin";
  const canApprove = req?.status === "WaitingForManager" && role === "Manager" || req?.status === "WaitingForSystemOwner" && role === "System Owner";
  const approveMutation = useMutation({
    mutationFn: async () => {
      await api.post(`/access-requests/${id}/approve`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["access-requests"] });
      qc.invalidateQueries({ queryKey: ["approvals"] });
      refetch();
    },
    onError: (err) => {
      if (err.response?.status === 409) {
        setActionError("This request was already processed or has changed. Please refresh the page.");
      } else if (err.response?.status === 403) {
        setActionError("You are not authorized to perform this action.");
      } else {
        setActionError(err.response?.data?.error || err.message || "Approval failed.");
      }
    }
  });
  const rejectMutation = useMutation({
    mutationFn: async (reason) => {
      await api.post(`/access-requests/${id}/reject`, { reason });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["access-requests"] });
      qc.invalidateQueries({ queryKey: ["approvals"] });
      setRejectModalOpen(false);
      setRejectReason("");
      refetch();
    },
    onError: (err) => {
      if (err.response?.status === 409) {
        setActionError("This request was already processed or has changed. Please refresh the page.");
      } else if (err.response?.status === 403) {
        setActionError("You are not authorized to perform this action.");
      } else {
        setActionError(err.response?.data?.error || err.message || "Rejection failed.");
      }
    }
  });
  const handleRejectSubmit = (e) => {
    e.preventDefault();
    if (!rejectReason.trim()) {
      setActionError("A reason is strictly required to reject this request.");
      return;
    }
    setActionError("");
    rejectMutation.mutate(rejectReason.trim());
  };
  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-emerald-600" }),
          " Approved"
        ] });
      case "Rejected":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-red-600" }),
          " Rejected"
        ] });
      case "WaitingForManager":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-blue-600" }),
          " Waiting for Manager"
        ] });
      case "WaitingForSystemOwner":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-purple-600" }),
          " Waiting for System Owner"
        ] });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800", children: status });
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-12 flex flex-col items-center justify-center text-slate-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-blue-600 mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium", children: [
        "Loading request #",
        id,
        "..."
      ] })
    ] });
  }
  if (error || !req) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-12 max-w-lg mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-10 h-10 text-red-500 mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-slate-900", children: "Request Not Found or Inaccessible" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mt-1", children: error?.response?.data?.error || error?.message || "You may not have permissions to view this request." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/requests",
          className: "mt-4 inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Back to Requests"
          ]
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 max-w-5xl mx-auto space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/requests",
            className: "p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-bold tracking-tight text-slate-900", children: [
              "Request #",
              req.id
            ] }),
            getStatusBadge(req.status),
            isHighRisk && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300", children: "High Risk" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-400 mt-1 font-mono", children: [
            "Client Request ID: ",
            req.clientRequestId
          ] })
        ] })
      ] }),
      canApprove && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              setActionError("");
              approveMutation.mutate();
            },
            disabled: approveMutation.isPending,
            className: "flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-emerald-600/20 disabled:opacity-50 transition",
            children: [
              approveMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }),
              "Approve Request"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              setActionError("");
              setRejectModalOpen(true);
            },
            className: "flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-red-600/20 transition",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }),
              "Reject Request"
            ]
          }
        )
      ] })
    ] }),
    actionError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-3 text-xs font-medium", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-red-600 flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", children: "Action Failed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: actionError })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200 rounded-3xl p-6 shadow-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-bold uppercase tracking-wider text-slate-500 mb-6", children: "Approval Workflow Progress" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-center justify-between gap-4 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 w-full text-center p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto mb-2 text-xs font-bold shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-slate-900", children: "1. Submission" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-emerald-700 mt-0.5", children: req.requesterEmail })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block w-8 border-t-2 border-slate-200" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex-1 w-full text-center p-4 rounded-2xl border transition ${req.status === "WaitingForManager" ? "bg-blue-50/80 border-blue-400 ring-2 ring-blue-500/20" : req.status === "WaitingForSystemOwner" || req.status === "Approved" ? "bg-emerald-50/60 border-emerald-200" : req.status === "Rejected" ? "bg-slate-50 border-slate-200" : "bg-slate-50 border-slate-200"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 text-xs font-bold ${req.status === "WaitingForManager" ? "bg-blue-600 text-white animate-pulse" : req.status === "WaitingForSystemOwner" || req.status === "Approved" ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500"}`,
                  children: req.status === "WaitingForSystemOwner" || req.status === "Approved" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }) : "2"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-slate-900", children: "2. Manager Review" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-slate-500 mt-0.5", children: req.status === "WaitingForManager" ? "Awaiting Decision" : "Completed" })
            ]
          }
        ),
        isHighRisk && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block w-8 border-t-2 border-slate-200" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `flex-1 w-full text-center p-4 rounded-2xl border transition ${req.status === "WaitingForSystemOwner" ? "bg-purple-50/80 border-purple-400 ring-2 ring-purple-500/20" : req.status === "Approved" ? "bg-emerald-50/60 border-emerald-200" : "bg-slate-50 border-slate-200"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 text-xs font-bold ${req.status === "WaitingForSystemOwner" ? "bg-purple-600 text-white animate-pulse" : req.status === "Approved" ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500"}`,
                    children: req.status === "Approved" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }) : "3"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-slate-900", children: "3. System Owner Review" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-slate-500 mt-0.5", children: req.status === "WaitingForSystemOwner" ? "Awaiting Decision" : isHighRisk ? "Required (High-Risk)" : "Skipped" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block w-8 border-t-2 border-slate-200" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `flex-1 w-full text-center p-4 rounded-2xl border ${req.status === "Approved" ? "bg-emerald-50/80 border-emerald-300" : req.status === "Rejected" ? "bg-red-50/80 border-red-300" : "bg-slate-50 border-slate-200 opacity-60"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 text-xs font-bold ${req.status === "Approved" ? "bg-emerald-600 text-white" : req.status === "Rejected" ? "bg-red-600 text-white" : "bg-slate-200 text-slate-400"}`,
                  children: req.status === "Approved" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }) : req.status === "Rejected" ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) : "✓"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-slate-900", children: req.status === "Rejected" ? "Rejected" : "Final State" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-slate-500 mt-0.5", children: req.status === "Approved" || req.status === "Rejected" ? req.status : "Pending" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-3", children: "Request Specifications" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between py-1 border-b border-slate-50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "Application:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-slate-900", children: req.applicationName || (req.applicationId === 1 ? "CRM" : "Finance Portal") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between py-1 border-b border-slate-50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "Environment:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-0.5 rounded font-semibold ${req.environment === "Production" ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-800"}`, children: req.environment })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between py-1 border-b border-slate-50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "Access Level:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-0.5 rounded font-semibold ${req.accessLevel === "Admin" ? "bg-purple-100 text-purple-800" : "bg-slate-100 text-slate-800"}`, children: req.accessLevel })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between py-1 border-b border-slate-50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "Risk Assessment:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-0.5 rounded font-bold ${isHighRisk ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"}`, children: isHighRisk ? "High Risk" : "Standard" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between py-1 border-b border-slate-50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "Policy Version:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-slate-600", children: req.policyVersion || "Default Policy" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-3", children: "Metadata & Justification" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between py-1 border-b border-slate-50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "Requester Email:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-slate-900", children: req.requesterEmail })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between py-1 border-b border-slate-50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "Created At:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-600", children: new Date(req.createdAt).toLocaleString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between py-1 border-b border-slate-50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "Last Updated:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-600", children: new Date(req.updatedAt).toLocaleString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500 block mb-1", children: "Justification:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-slate-800 font-medium whitespace-pre-wrap leading-relaxed", children: req.justification })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-b border-slate-100 pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "w-4 h-4 text-slate-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-bold uppercase tracking-wider text-slate-500", children: "Audit Timeline & State History" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 pl-4 border-l-2 border-slate-200 relative", children: auditTrail.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-400 py-4", children: "No audit events recorded yet." }) : auditTrail.map((evt) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-white" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-1.5 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-slate-900 text-sm", children: evt.action }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-slate-400", children: new Date(evt.timestamp).toLocaleString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-slate-600", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Actor: " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-slate-800", children: evt.performedByEmail })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[11px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "Transition:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-mono", children: evt.oldStatus || "None" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "➔" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-mono font-semibold", children: evt.newStatus })
          ] }),
          evt.reason && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 p-2.5 rounded-xl bg-red-50/70 border border-red-200 text-red-900", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-[11px]", children: "Rejection Reason: " }),
            evt.reason
          ] })
        ] })
      ] }, evt.id)) })
    ] }),
    rejectModalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in-50 zoom-in-95", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-slate-900", children: "Reject Access Request" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setRejectModalOpen(false),
            className: "text-slate-400 hover:text-slate-600 p-1 rounded-lg",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "A rejection reason is mandatory and will be recorded permanently in the audit history." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleRejectSubmit, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-bold uppercase text-slate-700 mb-1", children: [
            "Rejection Reason ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              required: true,
              rows: 3,
              value: rejectReason,
              onChange: (e) => setRejectReason(e.target.value),
              placeholder: "Explain why this request is being rejected...",
              className: "w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:bg-white focus:border-red-600 outline-none resize-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setRejectModalOpen(false),
              className: "px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: rejectMutation.isPending,
              className: "px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-red-600/20 disabled:opacity-50 transition",
              children: rejectMutation.isPending ? "Rejecting..." : "Confirm Rejection"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}

const SplitComponent = RequestDetailPage;

export { SplitComponent as component };
