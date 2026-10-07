import { a as useRouter, b as useSelector, c as useStructuralSharing, d as createLucideIcon, u as useNavigate, r as reactExports, j as jsxRuntimeExports, L as Link, O as Outlet } from './index-D7Nd4y7s.js';
import { u as useAuth, D as DEMO_USERS } from './use-auth-B83PL5i7.js';
import { S as ShieldCheck } from './shield-check-H891HDPR.js';
import { F as FileText, C as CirclePlus } from './file-text-BQJyRQ8R.js';
import { I as Inbox } from './inbox-D8cjnxao.js';
import { H as History } from './history-x7QsqzCe.js';

//#region src/useLocation.tsx
/**
* Read the current location from the router state with optional selection.
* Useful for subscribing to just the pieces of location you care about.
*
* Options:
* - `select`: Project the `location` object to a derived value
* - `structuralSharing`: Enable structural sharing for stable references
*
* @returns The current location (or selected value).
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useLocationHook
*/
function useLocation(opts) {
	const router = useRouter();
	return useSelector(router.stores.location, useStructuralSharing(opts, router));
}

/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const ChevronDown = createLucideIcon("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);

/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const LayoutDashboard = createLucideIcon("LayoutDashboard", [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
]);

/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const LogOut = createLucideIcon("LogOut", [
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
  ["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }],
  ["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }]
]);

function AppLayout({ children }) {
  const { user, role, logout, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = reactExports.useState(false);
  const dropdownRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleSwitchUser = async (targetEmail) => {
    setDropdownOpen(false);
    await login.mutateAsync({ email: targetEmail });
    navigate({ to: "/dashboard" });
  };
  const getRoleBadge = (roleName) => {
    switch (roleName) {
      case "Requester":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 border border-blue-200", children: "Requester" });
      case "Manager":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200", children: "Manager" });
      case "System Owner":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 text-xs font-semibold rounded-full bg-purple-100 text-purple-700 border border-purple-200", children: "System Owner" });
      case "Admin":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-100 text-amber-800 border border-amber-200", children: "Admin / Auditor" });
      default:
        return null;
    }
  };
  const isRequester = role === "Requester";
  const isApprover = role === "Manager" || role === "System Owner";
  const isAdmin = role === "Admin";
  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, show: true },
    { label: isAdmin ? "All Requests" : "My Requests", href: "/requests", icon: FileText, show: true },
    { label: "Create Request", href: "/requests/new", icon: CirclePlus, show: isRequester },
    { label: "Approval Inbox", href: "/approvals", icon: Inbox, show: isApprover },
    { label: "Audit Trail", href: "/audit", icon: History, show: isAdmin }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-screen bg-slate-50 text-slate-800 antialiased overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "w-64 bg-slate-900 border-r border-slate-800 flex flex-col flex-shrink-0 z-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-16 flex items-center gap-3 px-6 border-b border-slate-800 bg-slate-950", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[14px] font-bold tracking-wider text-white uppercase font-sans", children: "Access Request" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-semibold text-blue-400 tracking-widest uppercase", children: "Hub" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-slate-800/80 bg-slate-900/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-medium uppercase tracking-wider text-slate-400 mb-1.5", children: "Active Simulated Session" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xs", children: user?.label ? user.label.slice(0, 2).toUpperCase() : "U" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-slate-100 truncate", children: user?.label || "Demo User" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-slate-400 truncate", children: user?.email })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex-1 px-3 py-4 space-y-1 overflow-y-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400", children: "Menu Navigation" }),
        navItems.filter((item) => item.show).map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: item.href,
              className: `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${isActive ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30 font-semibold" : "text-slate-300 hover:bg-slate-800 hover:text-white"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label })
              ]
            },
            item.href
          );
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 border-t border-slate-800 bg-slate-950/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => logout(),
          className: "w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 border border-transparent hover:border-red-500/20 transition-all",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Switch / Logout" })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-w-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between z-10 flex-shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-slate-800 text-sm hidden sm:block", children: "Internal Application Access Management" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          getRoleBadge(role),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", ref: dropdownRef, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setDropdownOpen(!dropdownOpen),
                className: "flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 transition-all text-left",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold", children: user?.label ? user.label[0] : "U" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-slate-800 leading-tight", children: user?.label || "Select User" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-slate-500 leading-tight", children: user?.email })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3.5 h-3.5 text-slate-400 ml-1" })
                ]
              }
            ),
            dropdownOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 p-2 animate-in fade-in-50 zoom-in-95", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1", children: "Simulate As Seed User" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0.5", children: DEMO_USERS.map((u) => {
                const isSelected = user?.email === u.email;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => handleSwitchUser(u.email),
                    className: `w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${isSelected ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-700 hover:bg-slate-50"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs", children: u.label }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-slate-400 font-normal", children: u.email })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium", children: u.role })
                    ]
                  },
                  u.email
                );
              }) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-y-auto bg-slate-50", children })
    ] })
  ] });
}

function RootComponent() {
  const {
    user,
    isLoading
  } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!isLoading && !user) {
      navigate({
        to: "/login",
        replace: true
      });
    }
  }, [user, isLoading, navigate]);
  if (!user) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AppLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
}

export { RootComponent as component };
