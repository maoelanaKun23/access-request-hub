import { d as createLucideIcon, j as jsxRuntimeExports, L as Link, g as api } from './index-D7Nd4y7s.js';
import { u as useAuth, a as useQuery } from './use-auth-B83PL5i7.js';
import { R as RefreshCw } from './refresh-cw-DAVov4aI.js';
import { C as CirclePlus, F as FileText } from './file-text-BQJyRQ8R.js';
import { I as Inbox } from './inbox-D8cjnxao.js';
import { a as Clock, C as CircleCheck } from './clock-BR5b8RyE.js';
import { C as CircleX } from './circle-x-CqK3UNrc.js';
import { T as TriangleAlert } from './triangle-alert-ByfPFcxY.js';
import { L as LoaderCircle } from './loader-circle-C5vKezmQ.js';
import { S as ShieldCheck } from './shield-check-H891HDPR.js';

/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const ArrowRight = createLucideIcon("ArrowRight", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
]);

function DashboardPage() {
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
    }
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
    enabled: isApprover
  });
  const isRequester = role === "Requester";
  const isAdmin = role === "Admin";
  const totalRequests = requests.length;
  const waitingApproval = requests.filter(
    (r) => r.status === "WaitingForManager" || r.status === "WaitingForSystemOwner"
  ).length;
  const approvedCount = requests.filter((r) => r.status === "Approved").length;
  const rejectedCount = requests.filter((r) => r.status === "Rejected").length;
  const pendingApprovalsCount = approvals.length;
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 max-w-7xl mx-auto space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-slate-900", children: "Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-slate-500 mt-1", children: [
          "Welcome back, ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-slate-700", children: user?.label }),
          ". Role:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-blue-600", children: user?.role })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              refetchRequests();
              if (isApprover) refetchApprovals();
            },
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
        ),
        isApprover && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/approvals",
            className: "flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm shadow-blue-500/20 transition-all",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "w-4 h-4" }),
              "Go to Approval Inbox (",
              approvals.length,
              ")"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      isRequester && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-slate-500 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-wider", children: "Total Requests" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-slate-400" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-slate-900", children: totalRequests }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-400 mt-1", children: "Submitted by you" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-blue-600 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-wider text-slate-500", children: "Waiting for Approval" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-blue-500" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-blue-600", children: waitingApproval }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-400 mt-1", children: "In review process" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-emerald-600 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-wider text-slate-500", children: "Approved" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-emerald-500" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-emerald-600", children: approvedCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-400 mt-1", children: "Access granted" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-red-600 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-wider text-slate-500", children: "Rejected" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-red-500" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-red-600", children: rejectedCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-400 mt-1", children: "Declined requests" })
        ] })
      ] }),
      isApprover && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-blue-200 rounded-2xl p-5 shadow-xs bg-gradient-to-br from-white to-blue-50/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-blue-600 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-wider text-slate-600", children: "Pending Approvals" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "w-4 h-4 text-blue-600" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-blue-700", children: pendingApprovalsCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-blue-600/80 mt-1", children: "Awaiting your action" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-slate-500 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-wider", children: "Related Requests" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-slate-400" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-slate-900", children: totalRequests }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-400 mt-1", children: "Visible in your scope" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-emerald-600 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-wider text-slate-500", children: "Approved" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-emerald-500" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-emerald-600", children: approvedCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-400 mt-1", children: "Processed" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-red-600 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-wider text-slate-500", children: "Rejected" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-red-500" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-red-600", children: rejectedCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-400 mt-1", children: "Declined" })
        ] })
      ] }),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-slate-500 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-wider", children: "Total Requests" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-slate-400" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-slate-900", children: totalRequests }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-400 mt-1", children: "System-wide requests" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-blue-600 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-wider text-slate-500", children: "Pending" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 text-blue-500" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-blue-600", children: waitingApproval }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-400 mt-1", children: "In review" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-emerald-600 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-wider text-slate-500", children: "Approved" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-emerald-500" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-emerald-600", children: approvedCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-400 mt-1", children: "Approved requests" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-red-600 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium uppercase tracking-wider text-slate-500", children: "Rejected" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-red-500" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-red-600", children: rejectedCount }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-400 mt-1", children: "Rejected requests" })
        ] })
      ] })
    ] }),
    isApprover && approvals.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-bold text-amber-900", children: [
            "You have ",
            approvals.length,
            " access request",
            approvals.length > 1 ? "s" : "",
            " waiting for your review"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber-700 mt-0.5", children: "Review and approve or reject requests assigned to your role." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/approvals",
          className: "flex items-center gap-1 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs transition",
          children: [
            "Review Inbox",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 border-b border-slate-100 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold text-slate-900", children: isAdmin ? "System Access Requests" : "Your Requests" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: "Showing recent access requests from the backend API" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/requests",
            className: "text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1",
            children: [
              "View all",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
            ]
          }
        )
      ] }),
      loadingRequests ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-16 flex flex-col items-center justify-center text-slate-400", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-6 h-6 animate-spin text-blue-600 mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Loading requests from server..." })
      ] }) : requestsError ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-12 px-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex p-3 rounded-full bg-red-50 text-red-600 mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-6 h-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-slate-900", children: "Failed to load requests" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 mt-1 max-w-sm mx-auto", children: requestsError?.response?.data?.error || requestsError?.message || "Network error" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => refetchRequests(),
            className: "mt-3 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition",
            children: "Try Again"
          }
        )
      ] }) : requests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-16 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-6 h-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-slate-800", children: "No requests found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-1 max-w-sm mx-auto", children: "There are currently no access requests in this view." }),
        isRequester && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/requests/new",
            className: "mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4" }),
              "Create First Request"
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "min-w-full divide-y divide-slate-100 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-slate-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5", children: "ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5", children: "Application" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5", children: "Environment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5", children: "Access Level" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5", children: "Requester" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5", children: "Created" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-3.5 text-right", children: "Action" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-slate-100 text-xs", children: requests.slice(0, 5).map((req) => {
          const isHighRisk = req.environment === "Production" || req.accessLevel === "Admin";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-slate-50/70 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-3.5 font-mono text-slate-500 font-medium", children: [
              "#",
              req.id
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-slate-900", children: req.applicationName || (req.applicationId === 1 ? "CRM" : "Finance Portal") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${req.environment === "Production" ? "bg-amber-50 text-amber-700 border border-amber-200" : "bg-slate-100 text-slate-600"}`, children: req.environment }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex px-2 py-0.5 rounded text-[11px] font-medium ${req.accessLevel === "Admin" ? "bg-purple-50 text-purple-700 border border-purple-200 font-semibold" : "bg-slate-100 text-slate-600"}`, children: req.accessLevel }),
              isHighRisk && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] bg-red-100 text-red-700 px-1.5 py-0.2 rounded font-bold", children: "High Risk" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3.5 text-slate-600", children: req.requesterEmail }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3.5", children: getStatusBadge(req.status) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3.5 text-slate-400 whitespace-nowrap", children: req.createdAt ? new Date(req.createdAt).toLocaleDateString() : "-" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3.5 text-right whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/requests/$id",
                params: { id: String(req.id) },
                className: "text-blue-600 hover:text-blue-800 font-semibold hover:underline",
                children: "View Details"
              }
            ) })
          ] }, req.id);
        }) })
      ] }) })
    ] })
  ] });
}

const SplitComponent = DashboardPage;

export { SplitComponent as component };
