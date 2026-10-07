import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, getMonth, getYear } from "date-fns";
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { monthsShort } from "@/constants/lists";
import { CalendarIcon } from "./icons";

interface DatePickerProps extends React.ComponentProps<typeof Button> {
  placeholder?: string;
  selectedDate?: Date;
  formatDate?: string;
  onDateChange?: (formattedDate?: string, rawDate?: Date) => void;
  startYear?: number;
  endYear?: number;
  minDate?: Date;
  align?: "start" | "center" | "end";
}

export function CustomDatePicker({
  placeholder = "Pick a date",
  selectedDate,
  formatDate = "dd MMM yyyy",
  onDateChange,
  className,
  align = "center",
  startYear = getYear(new Date()) - 10,
  endYear = getYear(new Date()) + 10,
  disabled,
  minDate,
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    selectedDate instanceof Date && !isNaN(selectedDate.getTime())
      ? selectedDate
      : undefined
  );
  const [currentYear, setCurrentYear] = React.useState(
    selectedDate instanceof Date && !isNaN(selectedDate.getTime())
      ? getYear(selectedDate)
      : getYear(new Date())
  );
  const [showYearPicker, setShowYearPicker] = React.useState(false);

  React.useEffect(() => {
    if (selectedDate instanceof Date && !isNaN(selectedDate.getTime())) {
      setDate(selectedDate);
      setCurrentYear(getYear(selectedDate));
    }
  }, [selectedDate]);

  const years = React.useMemo(
    () =>
      Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i),
    [startYear, endYear]
  );

  const handleMonthSelect = (monthIndex: number) => {
    const localDate = new Date(currentYear, monthIndex, 1, 0, 0, 0, 0);
    setDate(localDate);

    const localISOString = `${currentYear}-${String(monthIndex + 1).padStart(2, "0")}-01T00:00:00`;

    onDateChange?.(localISOString, localDate);
  };

  const handleYearChange = (direction: "prev" | "next") => {
    if (direction === "prev" && currentYear > startYear) {
      setCurrentYear(currentYear - 1);
    } else if (direction === "next" && currentYear < endYear) {
      setCurrentYear(currentYear + 1);
    }
  };

  const handleYearSelect = (year: number) => {
    setCurrentYear(year);
    setShowYearPicker(false);
  };

  const handleToday = () => {
    const today = new Date();
    setDate(today);
    setCurrentYear(getYear(today));
    onDateChange?.(today.toISOString(), today);
  };

  const handleClear = () => {
    setDate(undefined);
    onDateChange?.(undefined, undefined);
  };

  const isMonthDisabled = (monthIndex: number) => {
    if (!minDate) return false;
    const monthDate = new Date(currentYear, monthIndex, 1);
    const minDateMonth = new Date(getYear(minDate), getMonth(minDate), 1);
    return monthDate < minDateMonth;
  };

  const isSelectedMonth = (monthIndex: number) => {
    if (!date) return false;
    return getYear(date) === currentYear && getMonth(date) === monthIndex;
  };

  const renderYearPicker = () => (
    <div className="p-3">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowYearPicker(false)}
          className="h-8 px-2 text-xs"
        >
          Back
        </Button>
        <div className="text-sm font-semibold">Select Year</div>
        <div className="w-12"></div>
      </div>

      <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
        {years.map((year) => (
          <Button
            key={year}
            variant={year === currentYear ? "default" : "ghost"}
            size="sm"
            onClick={() => handleYearSelect(year)}
            className={cn(
              "h-8 text-xs font-normal",
              year === currentYear && "bg-primary text-primary-foreground"
            )}
          >
            {year}
          </Button>
        ))}
      </div>
    </div>
  );

  const renderMonthPicker = () => (
    <div className="p-3">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleYearChange("prev")}
          disabled={currentYear <= startYear}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          onClick={() => setShowYearPicker(true)}
          className="text-sm w-full font-semibold hover:bg-muted px-2 py-1 rounded"
        >
          {currentYear}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleYearChange("next")}
          disabled={currentYear >= endYear}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Month Grid */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {monthsShort.map((month, index) => (
          <Button
            key={index}
            variant={isSelectedMonth(index) ? "default" : "ghost"}
            size="sm"
            onClick={() => handleMonthSelect(index)}
            disabled={isMonthDisabled(index)}
            className={cn(
              "h-8 text-xs font-normal",
              isSelectedMonth(index) && "bg-primary text-primary-foreground"
            )}
          >
            {month.label}
          </Button>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="flex justify-between text-xs">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToday}
          className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
        >
          Today
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
        >
          Clear
        </Button>
      </div>
    </div>
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          {date ? (
            getMonth(date) === 6 && getYear(date) === 2025 ? (
              format(date, formatDate)
            ) : (
              format(date, "MMMM yyyy")
            )
          ) : (
            <span className="text-[#C8C8C8]">{placeholder}</span>
          )}
          <div className="place-content-center bg-primary p-[5px] rounded-lg -mr-2">
            <CalendarIcon />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align={align}>
        {showYearPicker ? renderYearPicker() : renderMonthPicker()}
      </PopoverContent>
    </Popover>
  );
}
