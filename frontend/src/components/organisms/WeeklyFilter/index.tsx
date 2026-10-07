import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import filter from "/assets/icons/filter.svg";
import { CustomInput } from "@/components/atoms/custom-input";
import { Search } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import testProps from "@/lib/testing";

type IFilterItem = {
  name: string;
  key: string;
  item: string[];
  checkbox?: boolean;
};

interface FilterButtonProps {
  data: IFilterItem[];
  selectedFilters: string;
  setSelectedFilters: React.Dispatch<React.SetStateAction<string>>;
  searchValue?: string;
  setSearchValue?: (value: string) => void;
  type?: "General" | "Periodical";
  teamLeaderList?: string[];
  testID?: string;
}

export function WeeklyFilter({
  selectedFilters,
  setSelectedFilters,
  searchValue,
  setSearchValue,
  type = "General",
  teamLeaderList,
  testID,
}: FilterButtonProps) {
  const [tempFilters, setTempFilters] = useState<string>(selectedFilters);
  const [open, setOpen] = useState(false);

  const data = [
    {
      name: "Team Leader",
      key: "teamLeader",
      item: teamLeaderList,
      checkbox: true,
    },
    {
      name: "Week",
      key: "weeks",
      item: ["W1", "W2", "W3", "W4"],
      checkbox: true,
    },
    {
      name: "Status",
      key: "status",
      item: ["On Progress", "Achieved", "Not Yet"],
      checkbox: true,
    },
    {
      name: "Approval",
      key: "approval",
      item: ["Approved", "Reconfirm", "Open"],
      checkbox: true,
    },
  ];

  const handleApply = () => {
    setSelectedFilters(tempFilters);
    setOpen(false);
  };

  const toggleFilterValue = (key: string, value: string) => {
    const currentFilters: Record<string, string[]> = {};

    const categoryParts = tempFilters.split(",").filter(Boolean);

    categoryParts.forEach((part) => {
      const groupedMatch = part.match(/^(.+)==\(([^)]+)\)$/);
      if (groupedMatch) {
        const [_, filterKey, valuesStr] = groupedMatch;
        currentFilters[filterKey] = valuesStr.split("|");
      } else {
        const [filterKey, filterValue] = part.split("==");
        if (filterKey && filterValue) {
          currentFilters[filterKey] = [filterValue];
        }
      }
    });

    if (!currentFilters[key]) {
      currentFilters[key] = [];
    }

    const valueIndex = currentFilters[key].indexOf(value);
    if (valueIndex === -1) {
      currentFilters[key].push(value);
    } else {
      currentFilters[key].splice(valueIndex, 1);
      if (currentFilters[key].length === 0) {
        delete currentFilters[key];
      }
    }

    const newFilterParts: string[] = [];

    Object.entries(currentFilters).forEach(([filterKey, values]) => {
      if (values.length === 1) {
        newFilterParts.push(`${filterKey}==${values[0]}`);
      } else if (values.length > 1) {
        newFilterParts.push(`${filterKey}==(${values.join("|")})`);
      }
    });

    setTempFilters(newFilterParts.join(","));
  };

  const isChecked = (key: string, value: string) => {
    if (!tempFilters) return false;

    const categoryParts = tempFilters.split(",").filter(Boolean);

    for (const part of categoryParts) {
      if (part.startsWith(`${key}==`)) {
        const groupedMatch = part.match(/^(.+)==\(([^)]+)\)$/);
        if (groupedMatch) {
          const [_, filterKey, valuesStr] = groupedMatch;
          if (filterKey === key) {
            return valuesStr.split("|").includes(value);
          }
        } else {
          const [filterKey, filterValue] = part.split("==");
          if (filterKey === key) {
            return filterValue === value;
          }
        }
      }
    }

    return false;
  };

  return (
    <Select open={open} onOpenChange={setOpen}>
      <SelectTrigger
        hidden={true}
        className="w-[100px] bg-primary text-primary-foreground hover:bg-white px-4"
        {...testProps(testID ?? "")}
      >
        <p className="text-sm font-semibold">
          {type === "General" ? "Filter" : "Periodical Filter"}
        </p>
        <img src={filter} className="w-4 h-4" alt="filter" />
      </SelectTrigger>
      <SelectContent className="[&>div>svg]:hidden shadow-xl pb-16 max-h-[60vh] overflow-y-auto">
        <div className="rounded-lg p-4 w-[300px]">
          <h2 className="text-xl font-bold mb-4 text-center">
            {type === "General" ? "General Filter" : "Periodical Filter"}
          </h2>

          <div className="max-h-80 overflow-y-auto mb-4 px-2">
            {data?.map((filter) => (
              <Accordion
                key={filter.key}
                type="single"
                collapsible
                className="w-full"
              >
                <AccordionItem value={`item-${filter.key}`}>
                  <AccordionTrigger
                    {...testProps(testID + `_ACCORDION_${filter.name}`)}
                  >
                    {filter.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    {filter.key === "teamLeader" && (
                      <CustomInput
                        addonRight={<Search size={20} />}
                        placeholder="Search"
                        className="bg-white w-full mt-1 mb-2"
                        value={searchValue}
                        onChange={(e) =>
                          setSearchValue && setSearchValue(e.target.value)
                        }
                        testID={testID + `_INPUT_SEARCH`}
                      />
                    )}
                    {filter.item?.length === 0 ? (
                      <div className="text-gray-500 text-sm text-center my-4">
                        No items found
                      </div>
                    ) : (
                      filter.item?.map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-row items-center px-2 py-3 gap-2 hover:bg-gray-100 rounded-md cursor-pointer"
                          onClick={() => toggleFilterValue(filter.key, item)}
                          role="button"
                          {...testProps(testID + `_OPTION`)}
                        >
                          <Checkbox
                            checked={isChecked(filter.key, item)}
                            hidden={!filter.checkbox}
                          />
                          <p>{item}</p>
                        </div>
                      ))
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>

          <div className="fixed p-4 bottom-0 left-0 right-0 bg-white">
            <Button
              className="w-full py-6 bg-primary hover:bg-yellow-500 text-black"
              onClick={handleApply}
              {...testProps(testID + `_BUTTON_APPLY`)}
            >
              Apply
            </Button>
          </div>
        </div>
      </SelectContent>
    </Select>
  );
}
