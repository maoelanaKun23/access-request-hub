import { u as useNavigate, j as jsxRuntimeExports, B as Button } from './index-D7Nd4y7s.js';

const stopSign = "/assets/icons/stop-sign.svg";

function RouteComponent() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate({
      to: "/home"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center w-full h-full bg-white max-w-xl mt-40 mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-gray-800 mb-6", children: "Maaf, Anda tidak memiliki izin untuk mengakses halaman ini" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: stopSign, alt: "Page Not Found", className: "w-full h-full object-cover" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-center mb-8", children: "Halaman yang Anda coba buka memiliki pembatasan akses" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleClick, className: "w-full", children: "OK" })
  ] });
}

export { RouteComponent as component };
