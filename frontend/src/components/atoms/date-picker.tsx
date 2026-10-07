"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, getMonth, getYear, setMonth, setYear } from "date-fns";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CalendarIcon } from "./icons";
import testProps from "@/lib/testing";

interface DatePickerProps extends React.ComponentProps<typeof Button> {
  placeholder?: string;
  selectedDate?: Date;
  formatDate?: string;
  onDateChange?: (formattedDate?: string, rawDate?: Date) => void;
  startYear?: number;
  endYear?: number;
  minDate?: Date;
  align?: "start" | "center" | "end";
  testID?: string;
  calendarClassName?: string;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function DatePicker({
  placeholder = "Pick a date",
  selectedDate,
  formatDate = "dd MMM yyyy",
  onDateChange,
  className,
  align = "center",
  startYear = getYear(new Date()) - 10,
  endYear = getYear(new Date()),
  disabled,
  minDate,
  testID,
  calendarClassName,
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    selectedDate instanceof Date && !isNaN(selectedDate.getTime())
      ? selectedDate
      : undefined,
  );
  const [monthYear, setMonthYear] = React.useState<Date>(
    selectedDate instanceof Date && !isNaN(selectedDate.getTime())
      ? selectedDate
      : new Date(),
  );

  React.useEffect(() => {
    if (selectedDate instanceof Date && !isNaN(selectedDate.getTime())) {
      setDate(selectedDate);
      setMonthYear(selectedDate);
    }
  }, [selectedDate]);

  const years = React.useMemo(
    () =>
      Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i),
    [startYear, endYear],
  );

  const handleDateChange = (newDate?: Date) => {
    setDate(newDate);
    onDateChange?.(newDate ? format(newDate, formatDate) : undefined, newDate);
  };

  const updateMonthYear = (month?: number, year?: number) => {
    setMonthYear((prev) => {
      let updated = prev;
      if (month !== undefined) {
        updated = setMonth(updated, month);
      }
      if (year !== undefined) {
        updated = setYear(updated, year);
      }
      return updated;
    });
  };
  const formattedMinDate = React.useMemo(() => {
    if (!minDate) {
      return undefined;
    }

    const date = new Date(format(minDate, "dd-MM-yyyy"));

    date.setHours(0, 0, 0, 0);

    return date;
  }, [minDate]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between text-left font-normal ",
            !date && "text-[#C8C8C8]",
            className,
          )}
          disabled={disabled}
          {...testProps(testID ?? "")}
        >
          {date ? format(date, formatDate) : <span>{placeholder}</span>}
          <div
            className={cn(
              "place-content-center bg-primary p-[5px] rounded-lg -mr-2",
              calendarClassName,
            )}
          >
            <CalendarIcon />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 z-[10000]" align={align}>
        <div className="flex justify-between p-2">
          <Select
            onValueChange={(value) => updateMonthYear(months.indexOf(value))}
            value={months[getMonth(monthYear)]}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue
                placeholder="Month"
                {...testProps(`${testID}_SELECT_MONTH`)}
              />
            </SelectTrigger>
            <SelectContent className="z-[10000]">
              {months.map((month, i) => (
                <SelectItem
                  key={i}
                  value={month}
                  {...testProps(`${testID}_SELECT_MONTH_OPTION`)}
                >
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) =>
              updateMonthYear(undefined, Number.parseInt(value))
            }
            value={getYear(monthYear).toString()}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue
                placeholder="Year"
                {...testProps(`${testID}_SELECT_YEAR`)}
              />
            </SelectTrigger>
            <SelectContent className="z-[10000]">
              {years.map((year) => (
                <SelectItem
                  key={year}
                  value={year.toString()}
                  {...testProps(`${testID}_SELECT_YEAR_OPTION`)}
                >
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
          month={monthYear}
          onMonthChange={setMonthYear}
          fromDate={formattedMinDate}
        />
      </PopoverContent>
    </Popover>
  );
}
