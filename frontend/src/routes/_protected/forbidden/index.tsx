import { Button } from "@/components/ui/button";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import stopSign from "/assets/icons/stop-sign.svg";

export const Route = createFileRoute("/_protected/forbidden/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate({ to: "/home" });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white max-w-xl mt-40 mx-auto">
      <h1 className="text-xl font-bold text-gray-800 mb-6">
        Maaf, Anda tidak memiliki izin untuk mengakses halaman ini
      </h1>

      <div className="w-full h-full mb-6">
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={stopSign}
            alt="Page Not Found"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <p className="text-gray-500 text-center mb-8">
        Halaman yang Anda coba buka memiliki pembatasan akses
      </p>

      <Button onClick={handleClick} className="w-full">
        OK
      </Button>
    </div>
  );
}
