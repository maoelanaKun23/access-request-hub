import { ChevronDownIcon } from "@/components/atoms/icons/chevron-down-icon";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash } from "lucide-react";
import { periodDataFilter } from "@/constants/lists";
import testProps from "@/lib/testing";

export function PeriodFilter({
  onSelect,
  selectedValue,
  setSelectedValue,
  className,
  testID,
}: {
  onSelect: (value: string) => void;
  selectedValue?: string;
  setSelectedValue?: (value: string) => void;
  className?: string;
  testID?: string;
}) {
  const [selectedAll, setSelectedAll] = useState<boolean>(true);
  const [selectedYtd, setSelectedYtd] = useState<boolean>(false);
  const [selectedMonthly, setSelectedMonthly] = useState<string[]>([]);
  const [selectedQuarterly, setSelectedQuarterly] = useState<string[]>([]);

  const getQuartersFromMonths = (months: string[]): string[] => {
    const quarterlyOptions =
      periodDataFilter.timePeriods.find((p) => p.key === "quarterly")
        ?.options || [];

    const quarters: string[] = [];

    quarterlyOptions.forEach((quarter) => {
      const quarterMonths = quarter.value.split(",");
      if (quarterMonths.every((month) => months.includes(month))) {
        quarters.push(quarter.key);
      }
    });

    return quarters;
  };

  const getDisplayText = (): string => {
    if (!selectedValue) return "Select Period";

    if (selectedValue === "(01|02|03|04|05|06|07|08|09|10|11|12)") {
      return "All";
    }

    const ytdMonths = getYtdMonths();
    if (selectedValue === `(${ytdMonths.join("|")})`) {
      return "YTD";
    }

    const monthlyOptions =
      periodDataFilter.timePeriods.find((p) => p.key === "monthly")?.options ||
      [];

    const quarterlyOptions =
      periodDataFilter.timePeriods.find((p) => p.key === "quarterly")
        ?.options || [];

    const months = selectedValue.replace(/[()]/g, "").split("|");

    if (months.length === 1 && months[0].length === 2) {
      const monthOption = monthlyOptions.find((opt) => opt.value === months[0]);
      return monthOption ? monthOption.label : "Select Period";
    }

    if (months.length > 1) {
      const quarterOption = quarterlyOptions.find((opt) => {
        const quarterMonths = opt.value.split(",");
        return (
          months.length === quarterMonths.length &&
          months.every((m) => quarterMonths.includes(m))
        );
      });
      if (quarterOption) {
        return quarterOption.label;
      }

      return `${months.length} months selected`;
    }

    return "Select Period";
  };

  function getYtdMonths(): string[] {
    const currentMonth = new Date().getMonth() + 1;
    return Array.from({ length: currentMonth }, (_, i) =>
      (i + 1).toString().padStart(2, "0")
    );
  }

  const getMonthsFromQuarters = (quarters: string[]): string[] => {
    const monthOptions =
      periodDataFilter.timePeriods.find((p) => p.key === "quarterly")
        ?.options || [];
    return quarters.flatMap((q) => {
      const quarter = monthOptions.find((o) => o.key === q);
      return quarter ? quarter.value.split(",") : [];
    });
  };

  const getMonthlyKeysFromMonths = (months: string[]): string[] => {
    const monthlyOptions =
      periodDataFilter.timePeriods.find((p) => p.key === "monthly")?.options ||
      [];
    return months
      .map((month) => {
        const option = monthlyOptions.find((opt) => opt.value === month);
        return option ? option.key : "";
      })
      .filter((key) => key !== "");
  };

  const getMonthsFromMonthlyKeys = (monthlyKeys: string[]): string[] => {
    const monthlyOptions =
      periodDataFilter.timePeriods.find((p) => p.key === "monthly")?.options ||
      [];
    return monthlyKeys
      .map((key) => {
        const option = monthlyOptions.find((opt) => opt.key === key);
        return option ? option.value : "";
      })
      .filter((value) => value !== "");
  };

  useEffect(() => {
    if (selectedAll || selectedYtd) return;

    const selectedMonths = getMonthsFromMonthlyKeys(selectedMonthly);
    const newSelectedQuarters = getQuartersFromMonths(selectedMonths);
    setSelectedQuarterly(newSelectedQuarters);
  }, [selectedMonthly, selectedAll, selectedYtd]);

  const handlePeriodToggle = (
    type: "all" | "ytd" | "monthly" | "quarterly",
    key?: string
  ) => {
    if (type === "all") {
      const newValue = !selectedAll;
      setSelectedAll(newValue);
      if (newValue) {
        setSelectedYtd(false);
        setSelectedMonthly([]);
        setSelectedQuarterly([]);
      }
      return;
    }

    if (type === "ytd") {
      const newValue = !selectedYtd;
      setSelectedYtd(newValue);
      if (newValue) {
        setSelectedAll(false);
        setSelectedMonthly([]);
        setSelectedQuarterly([]);
      }
      return;
    }

    if (type === "monthly" && key) {
      setSelectedAll(false);
      setSelectedYtd(false);
      setSelectedMonthly((prev) =>
        prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
      );
    }

    if (type === "quarterly" && key) {
      setSelectedAll(false);
      setSelectedYtd(false);

      const newSelectedQuarterly = selectedQuarterly.includes(key)
        ? selectedQuarterly.filter((k) => k !== key)
        : [...selectedQuarterly, key];

      setSelectedQuarterly(newSelectedQuarterly);

      const monthsFromQuarters = getMonthsFromQuarters(newSelectedQuarterly);
      const monthlyKeysFromQuarters =
        getMonthlyKeysFromMonths(monthsFromQuarters);

      setSelectedMonthly(monthlyKeysFromQuarters);
    }
  };

  const isPeriodSelected = (
    type: "all" | "ytd" | "monthly" | "quarterly",
    key?: string
  ): boolean => {
    if (selectedAll) {
      if (type === "all") return true;
      if (type === "monthly" || type === "quarterly") return true;
      return false;
    }

    if (selectedYtd) {
      if (type === "ytd") return true;

      if (type === "monthly" && key) {
        const monthVal = periodDataFilter.timePeriods
          .find((p) => p.key === "monthly")
          ?.options?.find((o) => o.key === key)?.value;
        return monthVal ? getYtdMonths().includes(monthVal) : false;
      }

      if (type === "quarterly" && key) {
        const quarterMonths = getMonthsFromQuarters([key]);
        return quarterMonths.some((m) => getYtdMonths().includes(m));
      }

      return false;
    }

    if (type === "all") return selectedAll;
    if (type === "ytd") return selectedYtd;
    if (type === "monthly" && key) return selectedMonthly.includes(key);
    if (type === "quarterly" && key) return selectedQuarterly.includes(key);
    return false;
  };

  const handleClear = () => {
    setSelectedAll(false);
    setSelectedYtd(false);
    setSelectedMonthly([]);
    setSelectedQuarterly([]);
    setSelectedValue?.("");
  };

  const handleApply = () => {
    if (selectedAll) {
      onSelect("(01|02|03|04|05|06|07|08|09|10|11|12)");
      return;
    }

    if (selectedYtd) {
      onSelect(`(${getYtdMonths().join("|")})`);
      return;
    }

    let months: string[] = [];

    selectedMonthly.forEach((key) => {
      const option = periodDataFilter.timePeriods
        .find((p) => p.key === "monthly")
        ?.options?.find((o) => o.key === key);
      if (option) {
        months.push(option.value);
      }
    });

    months = [...months, ...getMonthsFromQuarters(selectedQuarterly)];

    const uniqueMonths = [...new Set(months)]
      .sort((a, b) => parseInt(a) - parseInt(b))
      .join("|");

    if (uniqueMonths.includes("|")) {
      onSelect(`(${uniqueMonths})`);
    } else {
      onSelect(uniqueMonths);
    }
  };

  return (
    <Select>
      <SelectTrigger
        className={`w-[310px] text-primary-foreground px-4 shadow-[0px_0px_5.9px_0px_#0000001A] ${className}`}
        hidden={true}
        {...testProps(testID ?? "")}
      >
        <p className="text-sm font-semibold">{getDisplayText()}</p>
        <ChevronDownIcon />
      </SelectTrigger>

      <SelectContent className="[&>div>svg]:hidden shadow-xl pb-16">
        <div className="rounded-lg p-4 w-[300px]">
          <h2 className="text-xl font-bold mb-4 text-center">Period Filter</h2>

          <div className="mb-6">
            {periodDataFilter.timePeriods.map((item, index) =>
              item.options ? (
                <Accordion
                  key={item.key}
                  type="single"
                  collapsible
                  className="w-full px-2"
                  {...testProps(testID + "_ACCORDION_" + item.key)}
                >
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger>{item.label}</AccordionTrigger>
                    {item.options.map((option) => (
                      <AccordionContent
                        key={option.key}
                        className="py-1"
                        onClick={() =>
                          handlePeriodToggle(
                            item.key as "monthly" | "quarterly",
                            option.key
                          )
                        }
                        {...testProps(
                          testID + `_ACCORDION_${item.key}_${option.label}`
                        )}
                      >
                        <div className="flex flex-row items-center px-2 py-3 gap-2 hover:bg-gray-100 rounded-md cursor-pointer">
                          <div className="w-full flex justify-between items-center">
                            <p>{option.label}</p>
                            <Checkbox
                              checked={isPeriodSelected(
                                item.key as "monthly" | "quarterly",
                                option.key
                              )}
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    ))}
                  </AccordionItem>
                </Accordion>
              ) : (
                <div key={item.key} className="w-full px-2 mb-2">
                  <div
                    className="flex flex-row items-center px-2 py-3 gap-2 hover:bg-gray-100 rounded-md cursor-pointer"
                    onClick={() =>
                      handlePeriodToggle(item.key as "all" | "ytd")
                    }
                    {...testProps(testID + `_OPTION`)}
                  >
                    <div className="w-full flex justify-between items-center">
                      <p>{item.label}</p>
                      <Checkbox
                        checked={isPeriodSelected(item.key as "all" | "ytd")}
                      />
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
              {...testProps(`${testID}_BUTTON_APPLY`)}
              className="w-full py-6 bg-primary hover:bg-yellow-500 text-black"
              onClick={handleApply}
              disabled={
                !selectedAll &&
                !selectedYtd &&
                selectedMonthly.length === 0 &&
                selectedQuarterly.length === 0
              }
            >
              Apply
            </Button>
          </div>
        </div>
      </SelectContent>
    </Select>
  );
}
