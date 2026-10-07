import { ChevronDownIcon } from "@/components/atoms/icons/chevron-down-icon";
import { SeparatedNavigation } from "@/components/templates/SeparatedNavigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import testProps from "@/lib/testing";
import React, { useState, useEffect } from "react";

export function OptionSelectFilter({
  label,
  items,
  onSelect,
  onSelectMultiple,
  customIcon,
  selectedPeriod,
  className,
  checkbox,
  testID,
}: {
  label: string;
  items: { label: string; value: string }[];
  onSelect?: (value: string) => void;
  onSelectMultiple?: (value: string[]) => void;
  customIcon?: React.ReactNode;
  selectedPeriod?: string;
  className?: string;
  checkbox?: boolean;
  testID?: string;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (selectedPeriod !== undefined && !checkbox) {
      setSelected([selectedPeriod]);
    }
  }, [selectedPeriod, checkbox]);

  const handleSelect = (value: string) => {
    if (onSelectMultiple) {
      setSelected((prev) => {
        const newSelected = prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value];
        onSelectMultiple(newSelected);
        return newSelected;
      });
    } else if (onSelect) {
      setSelected([value]);
      onSelect(value);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`w-full h-10 rounded-md shadow-[0px_0px_5.9px_0px_#0000001A] justify-between ${className ? className : "border-black"}`}
          {...testProps(testID ?? "")}
        >
          {label}
          {customIcon && typeof customIcon === "string" ? (
            <img src={customIcon} alt="" />
          ) : (
            <ChevronDownIcon />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[240px] max-h-[300px] overflow-y-auto p-4"
        onClick={(e) => e.preventDefault()}
      >
        {items?.map((item, index) => (
          <div
            key={item.value}
            className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer hover:bg-secondary ${
              index === 0 ? "disabled" : ""
            } ${selected.includes(item.value) ? "bg-secondary" : ""}`}
            onClick={() => handleSelect(item.value)}
            {...testProps(testID + "_OPTION")}
          >
            <SeparatedNavigation
              className={`w-full items-center justify-between ${
                index === 0 ? "disabled" : ""
              }`}
            >
              <span className="text-sm font-medium">{item.label}</span>
              {checkbox && <Checkbox checked={selected.includes(item.value)} />}
            </SeparatedNavigation>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
