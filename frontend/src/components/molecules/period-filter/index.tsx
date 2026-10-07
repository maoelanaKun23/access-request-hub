import { ChevronDownIcon } from "@/components/atoms/icons/chevron-down-icon";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash } from "lucide-react";
import { periodfilterData } from "@/constants/lists";

export function PeriodFilter({
  label,
  onSelect,
  selectedPeriod,
  className,
}: {
  label: string;
  onSelect: (value: string) => void;
  selectedPeriod?: string;
  className?: string;
}) {
  const [selectedPeriods, setSelectedPeriods] = useState<string>(
    selectedPeriod ? selectedPeriod : ""
  );

  const handlePeriodToggle = (value: string) => {
    setSelectedPeriods((prev) => {
      if (prev === value) {
        return "";
      } else {
        return value;
      }
    });
  };

  const isPeriodSelected = (value: string): boolean => {
    return selectedPeriods.includes(value);
  };

  const handleClear = () => {
    setSelectedPeriods([]);
  };

  const handleApply = () => {
    if (selectedPeriods.length > 0) {
      onSelect(selectedPeriods[0]);
    }
  };

  return (
    <Select>
      <SelectTrigger
        className={`w-[310px] text-primary-foreground px-4 shadow-[0px_0px_5.9px_0px_#0000001A] ${className}`}
        hidden={true}
      >
        <p className="text-sm font-semibold">{label}</p>
        <ChevronDownIcon />
      </SelectTrigger>
      <SelectContent className="[&>div>svg]:hidden shadow-xl pb-16">
        <div className="rounded-lg p-4 w-[300px]">
          <h2 className="text-xl font-bold mb-4 text-center">Period Filter</h2>

          <div className="mb-6">
            {periodfilterData.timePeriods.map((item, index) =>
              item.options ? (
                <Accordion
                  key={item.value}
                  type="single"
                  collapsible
                  className="w-full px-2"
                >
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger>{item.label}</AccordionTrigger>
                    {item.options.map((option) => (
                      <AccordionContent key={option.value} className="py-1">
                        <div
                          className="flex flex-row items-center px-2 py-3 gap-2 hover:bg-gray-100 rounded-md cursor-pointer"
                          onClick={() => handlePeriodToggle(option.value)}
                  
                        >
                          <div className="w-full flex justify-between items-center">
                            <p>{option.label}</p>
                            <Checkbox
                              checked={isPeriodSelected(option.value)}
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    ))}
                  </AccordionItem>
                </Accordion>
              ) : (
                <div key={item.value} className="w-full px-2 mb-2">
                  <div
                    className="flex flex-row items-center px-2 py-3 gap-2 hover:bg-gray-100 rounded-md cursor-pointer"
                    onClick={() => handlePeriodToggle(item.value)}
                  
                  >
                    <div className="w-full flex justify-between items-center">
                      <p>{item.label}</p>
                      <Checkbox checked={isPeriodSelected(item.value)} />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="fixed p-4 bottom-0 left-0 right-0 bg-white">
            <div
              className="flex items-center justify-end mb-2 px-2 cursor-pointer text-red-500 hover:text-red-600 gap-1"
              onClick={handleClear}
              
            >
              <Trash size={16} />
              <span className="text-sm font-medium">Clear Filter</span>
            </div>
            <Button
              className="w-full py-6 bg-primary hover:bg-yellow-500 text-black"
              onClick={handleApply}
            
            >
              Apply
            </Button>
          </div>
        </div>
      </SelectContent>
    </Select>
  );
}
