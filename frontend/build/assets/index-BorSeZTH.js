import { f as useQueryClient, r as reactExports, g as api, j as jsxRuntimeExports, X, L as Link } from './index-D7Nd4y7s.js';
import { u as useAuth, a as useQuery, b as useMutation } from './use-auth-B83PL5i7.js';
import { R as RefreshCw } from './refresh-cw-DAVov4aI.js';
import { C as CircleCheck, a as Clock } from './clock-BR5b8RyE.js';
import { T as TriangleAlert } from './triangle-alert-ByfPFcxY.js';
import { L as LoaderCircle } from './loader-circle-C5vKezmQ.js';
import { I as Inbox } from './inbox-D8cjnxao.js';
import { E as ExternalLink } from './external-link-Dvd9D4Z2.js';
import { C as Check } from './check-B7a0GvC_.js';

function ApprovalsPage() {
  const { user, role } = useAuth();
  const qc = useQueryClient();
  const [rejectId, setRejectId] = reactExports.useState(null);
  const [rejectReason, setRejectReason] = reactExports.useState("");
  const [actionError, setActionError] = reactExports.useState("");
  const [actionSuccess, setActionSuccess] = reactExports.useState("");
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
    }
  });
  const approveMutation = useMutation({
    mutationFn: async (id) => {
      await api.post(`/access-requests/${id}/approve`);
    },
    onSuccess: () => {
      setActionSuccess("Request successfully approved.");
      qc.invalidateQueries({ queryKey: ["approvals"] });
      qc.invalidateQueries({ queryKey: ["access-requests"] });
      refetch();
    },
    onError: (err) => {
      if (err.response?.status === 409) {
        setActionError("This request was already processed or has changed. Please refresh the inbox.");
      } else if (err.response?.status === 403) {
        setActionError("You are not authorized to perform this action.");
      } else {
        setActionError(err.response?.data?.error || err.message || "Failed to approve request.");
      }
    }
  });
  const rejectMutation = useMutation({
    mutationFn: async ({ id, reason }) => {
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
    onError: (err) => {
      if (err.response?.status === 409) {
        setActionError("This request was already processed or has changed. Please refresh the inbox.");
      } else if (err.response?.status === 403) {
        setActionError("You are not authorized to perform this action.");
      } else {
        setActionError(err.response?.data?.error || err.message || "Failed to reject request.");
      }
    }
  });
  const handleRejectSubmit = (e) => {
    e.preventDefault();
    if (!rejectReason.trim() || rejectId === null) {
      setActionError("A reason is required to reject this request.");
      return;
    }
    setActionError("");
    setActionSuccess("");
    rejectMutation.mutate({ id: rejectId, reason: rejectReason.trim() });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 max-w-7xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-slate-900", children: "Approval Inbox" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800", children: [
            approvals.length,
            " Pending"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-slate-500 mt-1", children: [
          "Requests requiring your review as ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-slate-800", children: role }),
          " (",
          user?.label,
          ")."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => {
            setActionError("");
            setActionSuccess("");
            refetch();
          },
          className: "flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition shadow-xs",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5 text-slate-500" }),
            "Refresh Inbox"
          ]
        }
      )
    ] }),
    actionSuccess && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between text-xs font-semibold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-emerald-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: actionSuccess })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActionSuccess(""), className: "text-emerald-700 hover:text-emerald-900", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
    ] }),
    actionError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 flex items-center justify-between text-xs font-semibold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-red-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: actionError })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActionError(""), className: "text-red-700 hover:text-red-900", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-20 flex flex-col items-center justify-center text-slate-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-6 h-6 animate-spin text-blue-600 mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Loading pending approvals..." })
    ] }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-8 h-8 text-red-500 mx-auto mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-slate-900", children: "Failed to load inbox" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mt-1", children: error?.response?.data?.error || error?.message }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => refetch(),
          className: "mt-3 px-3.5 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition",
          children: "Retry"
        }
      )
    ] }) : approvals.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "w-6 h-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-slate-800", children: "Your approval inbox is clear" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-1 max-w-sm mx-auto", children: "No pending access requests currently require your approval." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "min-w-full divide-y divide-slate-100 text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5", children: "ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5", children: "Requester" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5", children: "Application" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5", children: "Environment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5", children: "Access Level" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5", children: "Current Stage" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5", children: "Created" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5 text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-slate-100 text-xs", children: approvals.map((req) => {
        const isHighRisk = req.environment === "Production" || req.accessLevel === "Admin";
        const isProcessing = approveMutation.isPending && approveMutation.variables === req.id || rejectMutation.isPending && rejectMutation.variables?.id === req.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-slate-50/70 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-4 font-mono text-slate-500 font-semibold", children: [
            "#",
            req.id
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 font-semibold text-slate-900", children: req.requesterEmail }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-slate-900", children: req.applicationName || (req.applicationId === 1 ? "CRM" : "Finance Portal") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${req.environment === "Production" ? "bg-amber-50 text-amber-700 border border-amber-200" : "bg-slate-100 text-slate-600"}`, children: req.environment }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${req.accessLevel === "Admin" ? "bg-purple-50 text-purple-700 border border-purple-200 font-semibold" : "bg-slate-100 text-slate-600"}`, children: req.accessLevel }),
            isHighRisk && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold", children: "High Risk" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
            req.status === "WaitingForManager" ? "Manager Review" : "System Owner Review"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-slate-400 whitespace-nowrap", children: req.createdAt ? new Date(req.createdAt).toLocaleDateString() : "-" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-right whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/requests/$id",
                params: { id: String(req.id) },
                className: "text-slate-500 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-100 transition mr-1",
                title: "View Full Detail",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => {
                  setActionError("");
                  setActionSuccess("");
                  approveMutation.mutate(req.id);
                },
                disabled: isProcessing,
                className: "flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs disabled:opacity-50 transition",
                children: [
                  isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5" }),
                  "Approve"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => {
                  setActionError("");
                  setActionSuccess("");
                  setRejectId(req.id);
                  setRejectReason("");
                },
                disabled: isProcessing,
                className: "flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold shadow-xs disabled:opacity-50 transition",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" }),
                  "Reject"
                ]
              }
            )
          ] }) })
        ] }, req.id);
      }) })
    ] }) }) }),
    rejectId !== null && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in-50 zoom-in-95", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-bold text-slate-900", children: [
          "Reject Request #",
          rejectId
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setRejectId(null),
            className: "text-slate-400 hover:text-slate-600 p-1 rounded-lg",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Please enter the justification for declining this request. This will be visible to the requester." }),
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
              placeholder: "e.g., Access level exceeds business requirements...",
              className: "w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:bg-white focus:border-red-600 outline-none resize-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setRejectId(null),
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
              children: rejectMutation.isPending ? "Submitting..." : "Reject Request"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}

const SplitComponent = ApprovalsPage;

export { SplitComponent as component };
