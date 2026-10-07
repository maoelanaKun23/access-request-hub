import { j as jsxRuntimeExports, L as Link, g as api } from './index-D7Nd4y7s.js';
import { u as useAuth, a as useQuery } from './use-auth-B83PL5i7.js';
import { R as RefreshCw } from './refresh-cw-DAVov4aI.js';
import { L as LoaderCircle } from './loader-circle-C5vKezmQ.js';
import { T as TriangleAlert } from './triangle-alert-ByfPFcxY.js';
import { S as ShieldCheck } from './shield-check-H891HDPR.js';
import { E as ExternalLink } from './external-link-Dvd9D4Z2.js';

function AuditTrailPage() {
  useAuth();
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
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 max-w-7xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-slate-900", children: "Audit Trail & Compliance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800", children: "Auditor View" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 mt-1", children: "Complete compliance overview of system access requests, authorization states, and audit trails." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => refetch(),
          className: "flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition shadow-xs",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5 text-slate-500" }),
            "Refresh"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 border-b border-slate-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-slate-900", children: "System Access Requests Audit Register" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "All historical access transactions and decisions" })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-20 flex flex-col items-center justify-center text-slate-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-6 h-6 animate-spin text-blue-600 mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Loading audit data..." })
      ] }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-16 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-8 h-8 text-red-500 mx-auto mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-slate-900", children: "Failed to load audit records" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mt-1", children: error?.response?.data?.error || error?.message })
      ] }) : requests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-20 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-12 h-12 text-slate-300 mx-auto mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-slate-800", children: "No requests recorded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-1", children: "No access requests exist yet in the database." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "min-w-full divide-y divide-slate-100 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5", children: "Request ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5", children: "Requester" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5", children: "Application" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5", children: "Environment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5", children: "Access Level" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5", children: "Created At" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5 text-right", children: "Audit Detail" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-slate-100 text-xs", children: requests.map((req) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-slate-50/70 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-4 font-mono text-slate-500 font-semibold", children: [
            "#",
            req.id
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 font-medium text-slate-900", children: req.requesterEmail }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 font-semibold text-slate-900", children: req.applicationName || (req.applicationId === 1 ? "CRM" : "Finance Portal") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${req.environment === "Production" ? "bg-amber-50 text-amber-700 border border-amber-200 font-bold" : "bg-slate-100 text-slate-600"}`, children: req.environment }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${req.accessLevel === "Admin" ? "bg-purple-50 text-purple-700 border border-purple-200 font-bold" : "bg-slate-100 text-slate-600"}`, children: req.accessLevel }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-slate-800", children: req.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-slate-400 whitespace-nowrap", children: req.createdAt ? new Date(req.createdAt).toLocaleString() : "-" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-right whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/requests/$id",
              params: { id: String(req.id) },
              className: "inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold hover:underline",
              children: [
                "Inspect Audit Trail",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" })
              ]
            }
          ) })
        ] }, req.id)) })
      ] }) })
    ] })
  ] });
}

const SplitComponent = AuditTrailPage;

export { SplitComponent as component };
