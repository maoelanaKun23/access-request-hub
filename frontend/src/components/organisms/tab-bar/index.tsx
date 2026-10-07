import { useEffect, useState } from "react";
import type React from "react";
import { ButtonUnderline } from "@/components/atoms/button-underline";
import { useNavigate } from "@tanstack/react-router";

interface dataType {
  name: string;
  item: string;
  navigateTo: string;
}

interface TabBarProps {
  type: string;
  data: dataType[];
}

export const TabBar: React.FC<TabBarProps> = ({ type, data }) => {
  const navigate = useNavigate();
  const storedPlan = localStorage.getItem(type);

  const [selectedBar, setSelectedBar] = useState<string | null>(null);

  const handleClick = (plan: string, index: number) => {
    localStorage.setItem(type, plan);
    setSelectedBar(plan);
    navigate({
      to: data[index].navigateTo,
    });
  };

  useEffect(() => {
    if (storedPlan) {
      setSelectedBar(storedPlan);
    }
  }, [type, data, storedPlan]);

  return (
    <div className="px-4">
      <div className="flex flex-col w-full h-9 border-b border-b-[#e5e7eb] mb-4">
        <div className="flex gap-8">
          {data.map((bar, index) => (
            <ButtonUnderline
              key={index}
              lineColor={selectedBar === bar.item ? "#facc15" : ""}
              onClick={() => handleClick(bar.item, index)}
            >
              {bar.name}
            </ButtonUnderline>
          ))}
        </div>
      </div>
    </div>
  );
};
