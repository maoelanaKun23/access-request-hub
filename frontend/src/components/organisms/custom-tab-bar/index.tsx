import type React from "react";
import { ButtonUnderline } from "@/components/atoms/button-underline";
import testProps from "@/lib/testing";

interface TabBarProps {
  type: string;
  data: ("Auditor" | "Auditee" | "Detail")[];
  state: "Auditor" | "Auditee" | "Detail";
  setState: (value: "Auditor" | "Auditee" | "Detail") => void;
  testID?: string;
}

export const CustomTabBar: React.FC<TabBarProps> = ({
  type,
  data,
  state,
  setState,
  testID,
}) => {
  const handleClick = (item: "Auditor" | "Auditee" | "Detail") => {
    localStorage.setItem(type, item);
    setState(item);
  };

  return (
    <div className="flex flex-col w-full h-9 border-b border-b-[#e5e7eb] mb-4">
      <div className="flex gap-8">
        {data.map((item, index) => (
          <ButtonUnderline
            key={index}
            lineColor={
              state === item || (state === "Detail" && item === "Auditor")
                ? "#facc15"
                : ""
            }
            onClick={() => handleClick(item)}
            {...testProps(testID ? testID + item.toUpperCase() : "")}
          >
            {item}
          </ButtonUnderline>
        ))}
      </div>
    </div>
  );
};
