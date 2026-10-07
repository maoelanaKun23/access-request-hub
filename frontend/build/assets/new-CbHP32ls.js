import { d as createLucideIcon, u as useNavigate, f as useQueryClient, r as reactExports, g as api, j as jsxRuntimeExports } from './index-D7Nd4y7s.js';
import { u as useAuth, b as useMutation } from './use-auth-B83PL5i7.js';
import { A as ArrowLeft } from './arrow-left-Bqv5GadQ.js';
import { T as TriangleAlert } from './triangle-alert-ByfPFcxY.js';
import { L as LoaderCircle } from './loader-circle-C5vKezmQ.js';

/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const Info = createLucideIcon("Info", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
]);

/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const Send = createLucideIcon("Send", [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
]);

/**
 * @license lucide-react v0.460.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */


const ShieldAlert = createLucideIcon("ShieldAlert", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
]);

function CreateRequestPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [applicationId, setApplicationId] = reactExports.useState(1);
  const [environment, setEnvironment] = reactExports.useState("NonProduction");
  const [accessLevel, setAccessLevel] = reactExports.useState("Read");
  const [justification, setJustification] = reactExports.useState("");
  const [errorMessage, setErrorMessage] = reactExports.useState("");
  const isHighRisk = environment === "Production" || accessLevel === "Admin";
  const createMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await api.post("/access-requests", payload);
      return res.data;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["access-requests"] });
      navigate({
        to: "/requests/$id",
        params: { id: String(data.id) }
      });
    },
    onError: (err) => {
      if (err.response?.status === 400) {
        setErrorMessage(err.response?.data?.error || err.response?.data?.message || "Invalid input data.");
      } else if (err.response?.status === 409) {
        setErrorMessage("A request with this Client Request ID already exists or encountered a conflict.");
      } else if (err.response?.status === 403) {
        setErrorMessage("You are not authorized to perform this action.");
      } else {
        setErrorMessage(err.response?.data?.error || err.message || "Failed to create request.");
      }
    }
  });
  const handleSubmit = (e) => {
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
      justification: justification.trim()
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 max-w-3xl mx-auto space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => navigate({ to: "/requests" }),
          className: "p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition",
          title: "Back to Requests",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-slate-900", children: "Create Access Request" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 mt-0.5", children: "Submit a new access request for internal enterprise applications." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-slate-200 rounded-3xl p-8 shadow-xs", children: [
      errorMessage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: "Request submission failed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-red-700 mt-0.5", children: errorMessage })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500", children: "Requester: " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-slate-900", children: user?.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400 ml-1", children: [
              "(",
              user?.email,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-semibold text-[11px]", children: "Simulated User" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2", children: [
            "Application ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: applicationId,
              onChange: (e) => setApplicationId(Number(e.target.value)),
              className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:bg-white focus:border-blue-600 outline-none transition cursor-pointer",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 1, children: "CRM (System Owner: Carol)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 2, children: "Finance Portal (System Owner: Dana)" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400 mt-1.5", children: "Select the target internal enterprise software." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2", children: [
            "Environment ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                className: `flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition ${environment === "NonProduction" ? "border-blue-600 bg-blue-50/40 text-blue-900 font-semibold" : "border-slate-200 hover:border-slate-300 text-slate-700"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "radio",
                      name: "environment",
                      value: "NonProduction",
                      checked: environment === "NonProduction",
                      onChange: () => setEnvironment("NonProduction"),
                      className: "accent-blue-600"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: "Non-Production" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-slate-400 font-normal", children: "Dev / Staging environments" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                className: `flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition ${environment === "Production" ? "border-amber-600 bg-amber-50/40 text-amber-900 font-semibold" : "border-slate-200 hover:border-slate-300 text-slate-700"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "radio",
                      name: "environment",
                      value: "Production",
                      checked: environment === "Production",
                      onChange: () => setEnvironment("Production"),
                      className: "accent-amber-600"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: "Production" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-slate-400 font-normal", children: "Live enterprise data" })
                  ] })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2", children: [
            "Access Level ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                className: `flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition ${accessLevel === "Read" ? "border-blue-600 bg-blue-50/40 text-blue-900 font-semibold" : "border-slate-200 hover:border-slate-300 text-slate-700"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "radio",
                      name: "accessLevel",
                      value: "Read",
                      checked: accessLevel === "Read",
                      onChange: () => setAccessLevel("Read"),
                      className: "accent-blue-600"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: "Read Access" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-slate-400 font-normal", children: "Standard view-only permission" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "label",
              {
                className: `flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition ${accessLevel === "Admin" ? "border-purple-600 bg-purple-50/40 text-purple-900 font-semibold" : "border-slate-200 hover:border-slate-300 text-slate-700"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "radio",
                      name: "accessLevel",
                      value: "Admin",
                      checked: accessLevel === "Admin",
                      onChange: () => setAccessLevel("Admin"),
                      className: "accent-purple-600"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: "Admin Access" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-slate-400 font-normal", children: "Privileged / administrative role" })
                  ] })
                ]
              }
            )
          ] })
        ] }),
        isHighRisk ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-2xl bg-amber-50/80 border border-amber-300 flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-amber-900 leading-relaxed", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: "High-Risk Request Detected:" }),
            " Because you selected",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: environment === "Production" && accessLevel === "Admin" ? "Production & Admin Access" : environment === "Production" ? "Production" : "Admin Access" }),
            ", this request will require a 2-stage approval:",
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-semibold text-amber-800", children: "Manager Approval ➔ System Owner Approval ➔ Final Decision" })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-slate-600", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: "Standard Request:" }),
            " This non-high-risk request will only require your Manager's approval."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2", children: [
            "Business Justification ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              required: true,
              rows: 4,
              value: justification,
              onChange: (e) => setJustification(e.target.value),
              placeholder: "State the reason why access to this application is necessary...",
              className: "w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-900 focus:bg-white focus:border-blue-600 outline-none transition resize-none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400 mt-1", children: "Please provide clear context for your manager and system owner." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "submit",
            disabled: createMutation.isPending,
            className: "w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-md shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition",
            children: createMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
              "Submitting Request..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" }),
              "Submit Access Request"
            ] })
          }
        ) })
      ] })
    ] })
  ] });
}

const SplitComponent = CreateRequestPage;

export { SplitComponent as component };
