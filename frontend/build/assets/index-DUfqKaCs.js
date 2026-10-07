import { r as reactExports, j as jsxRuntimeExports, L as Link, g as api } from './index-D7Nd4y7s.js';
import { u as useAuth, a as useQuery } from './use-auth-B83PL5i7.js';
import { R as RefreshCw } from './refresh-cw-DAVov4aI.js';
import { C as CirclePlus, F as FileText } from './file-text-BQJyRQ8R.js';
import { L as LoaderCircle } from './loader-circle-C5vKezmQ.js';
import { T as TriangleAlert } from './triangle-alert-ByfPFcxY.js';
import { E as ExternalLink } from './external-link-Dvd9D4Z2.js';
import { a as Clock, C as CircleCheck } from './clock-BR5b8RyE.js';
import { C as CircleX } from './circle-x-CqK3UNrc.js';

function RequestsPage() {
  const { role } = useAuth();
  const [filterStatus, setFilterStatus] = reactExports.useState("All");
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
  const isRequester = role === "Requester";
  const isAdmin = role === "Admin";
  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
          " Approved"
        ] });
      case "Rejected":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5" }),
          " Rejected"
        ] });
      case "WaitingForManager":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
          " Waiting for Manager"
        ] });
      case "WaitingForSystemOwner":
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
          " Waiting for System Owner"
        ] });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700", children: status });
    }
  };
  const filteredRequests = requests.filter((r) => {
    if (filterStatus === "All") return true;
    if (filterStatus === "Pending") return r.status === "WaitingForManager" || r.status === "WaitingForSystemOwner";
    return r.status === filterStatus;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 max-w-7xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-slate-900", children: isAdmin ? "All Access Requests" : "My Requests" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 mt-1", children: isAdmin ? "System-wide view of all submitted access requests and statuses." : "Track and review your submitted application access requests." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
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
        ),
        isRequester && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/requests/new",
            className: "flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm shadow-blue-500/20 transition-all",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4" }),
              "New Access Request"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 border-b border-slate-200 pb-3", children: ["All", "Pending", "Approved", "Rejected"].map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setFilterStatus(status),
        className: `px-3 py-1.5 rounded-lg text-xs font-medium transition ${filterStatus === status ? "bg-slate-900 text-white font-semibold" : "text-slate-600 hover:bg-slate-100"}`,
        children: status
      },
      status
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-20 flex flex-col items-center justify-center text-slate-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-6 h-6 animate-spin text-blue-600 mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Loading requests..." })
    ] }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-8 h-8 text-red-500 mx-auto mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-slate-900", children: "Failed to load requests" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mt-1 max-w-sm mx-auto", children: error?.response?.data?.error || error?.message }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => refetch(),
          className: "mt-3 px-3.5 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition",
          children: "Retry"
        }
      )
    ] }) : filteredRequests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-6 h-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-slate-800", children: "No requests found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-1 max-w-sm mx-auto", children: filterStatus !== "All" ? `No requests match the "${filterStatus}" status.` : "You have not submitted any access requests yet." }),
      isRequester && filterStatus === "All" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/requests/new",
          className: "mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4" }),
            "Submit Access Request"
          ]
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "min-w-full divide-y divide-slate-100 text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5", children: "Request ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5", children: "Application" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5", children: "Environment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5", children: "Access Level" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5", children: "Requester" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5", children: "Created" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5 text-right", children: "Action" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-slate-100 text-xs", children: filteredRequests.map((req) => {
        const isHighRisk = req.environment === "Production" || req.accessLevel === "Admin";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-slate-50/70 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-4 font-mono text-slate-500 font-semibold", children: [
            "#",
            req.id
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-slate-900", children: req.applicationName || (req.applicationId === 1 ? "CRM" : "Finance Portal") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${req.environment === "Production" ? "bg-amber-50 text-amber-700 border border-amber-200" : "bg-slate-100 text-slate-600"}`, children: req.environment }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${req.accessLevel === "Admin" ? "bg-purple-50 text-purple-700 border border-purple-200 font-semibold" : "bg-slate-100 text-slate-600"}`, children: req.accessLevel }),
            isHighRisk && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold", children: "High Risk" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-slate-600", children: req.requesterEmail }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: getStatusBadge(req.status) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-slate-400 whitespace-nowrap", children: req.createdAt ? new Date(req.createdAt).toLocaleString() : "-" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-right whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/requests/$id",
              params: { id: String(req.id) },
              className: "inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold px-2.5 py-1.5 rounded-lg hover:bg-blue-50 transition",
              children: [
                "View Details",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" })
              ]
            }
          ) })
        ] }, req.id);
      }) })
    ] }) }) })
  ] });
}

const SplitComponent = RequestsPage;

export { SplitComponent as component };
