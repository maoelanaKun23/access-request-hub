import { ChevronDownIcon } from "@/components/atoms/icons/chevron-down-icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import testProps from "@/lib/testing";
import { useState } from "react";

export function CustomFilter({
  label,
  items,
  onSelect,
  selectedValue,
  className,
  testID,
}: {
  label: string;
  items: string[] | undefined;
  onSelect: (value: string) => void;
  selectedValue?: string;
  className?: string;
  testID: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`w-full h-10 rounded-md shadow-[0px_0px_5.9px_0px_#0000001A] justify-between ${className ? className : "border-black"}`}
          {...testProps(testID)}
        >
          {label}
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px] max-h-[300px] overflow-y-auto p-2">
        {items?.map((item) => (
          <div
            key={item}
            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-secondary ${selectedValue === item ? "bg-secondary" : ""}`}
            onClick={() => {
              onSelect(item);
            }}
            {...testProps(testID + "_OPTION")}
          >
            {item}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
