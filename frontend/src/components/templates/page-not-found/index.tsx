import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import pageNotFound from  "/assets/images/page-not-found.svg";

export function PageNotFound() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate({ to: "/home" });
    };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-white max-w-xl mt-40 mx-auto">
      <h1 className="text-xl font-bold text-gray-800 mb-6">Huhu sayang sekali...</h1>
      
      <div className="w-full h-full mb-6">
        <div className="w-full h-full flex items-center justify-center">
          <img src={pageNotFound} alt="Page Not Found" className="w-full h-full object-cover" />
        </div>
      </div>
      
      <p className="text-gray-500 text-center mb-8">Kamu tidak dapat mengakses halaman ini</p>
      
      <Button onClick={handleClick} className="w-full">
        OK
      </Button>
    </div>
  );
}