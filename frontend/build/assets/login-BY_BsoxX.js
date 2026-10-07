import { d as createLucideIcon, r as reactExports, u as useNavigate, j as jsxRuntimeExports, e as createFileRoute } from './index-D7Nd4y7s.js';
import { u as useAuth } from './use-auth-B83PL5i7.js';
import { S as ShieldCheck } from './shield-check-H891HDPR.js';
import { L as LoaderCircle } from './loader-circle-C5vKezmQ.js';

/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const LogIn = createLucideIcon("LogIn", [
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }],
  ["polyline", { points: "10 17 15 12 10 7", key: "1ail0h" }],
  ["line", { x1: "15", x2: "3", y1: "12", y2: "12", key: "v6grx8" }]
]);

createFileRoute()({
  component: LoginPage
});
const DEMO_USERS = [
  { email: "alice@example.local", role: "Requester", label: "Alice (Requester)" },
  { email: "bob@example.local", role: "Manager", label: "Bob (Manager)" },
  { email: "carol@example.local", role: "System Owner", label: "Carol (CRM Owner)" },
  { email: "dana@example.local", role: "System Owner", label: "Dana (Finance Owner)" },
  { email: "erin@example.local", role: "Admin", label: "Erin (Admin/Auditor)" }
];
function LoginPage() {
  const [email, setEmail] = reactExports.useState(DEMO_USERS[0].email);
  const [error, setError] = reactExports.useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (user) {
      navigate({ to: "/dashboard", replace: true });
    }
  }, [user, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login.mutateAsync({ email, password: "password" });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to switch user.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-slate-50 flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xl shadow-blue-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-8 h-8 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-extrabold text-slate-900 tracking-tight", children: "Access Request Hub" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 mt-2 font-medium", children: "Enterprise Access Management" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200 rounded-3xl p-8 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-slate-900 mb-2", children: "Simulated Login" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 mb-6", children: "Select a demo user to simulate authentication." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-5", children: [
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-700 font-medium", children: error }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-semibold text-slate-700 mb-2", children: "Demo User" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                value: email,
                onChange: (e) => setEmail(e.target.value),
                className: "w-full appearance-none text-sm text-slate-900 bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-blue-600 focus:bg-white transition-all cursor-pointer font-medium",
                children: DEMO_USERS.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: u.email, children: [
                  u.label,
                  " - ",
                  u.email
                ] }, u.email))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "fill-current h-4 w-4", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" }) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: login.isPending,
            className: "w-full flex items-center justify-center gap-2 bg-blue-600 text-white text-sm font-bold py-3.5 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-2 shadow-md shadow-blue-200",
            children: login.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 animate-spin" }),
              " Authenticating..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-5 h-5" }),
              " Switch User"
            ] })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-slate-400 mt-8 font-medium", children: "© 2026 Access Request Hub MVP" })
  ] }) });
}

function RouteComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LoginPage, {});
}

export { RouteComponent as component };
