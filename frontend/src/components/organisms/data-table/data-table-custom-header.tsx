import { Button } from "@/components/ui/button";
import testProps from "@/lib/testing";
import { cn } from "@/lib/utils";
import type { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import type React from "react";
import { ReactNode } from "react";

type FilterInputProps<TData, TValue> = {
  column: Column<TData, TValue>;
};

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  containerClassName?: string;
  column: Column<TData, TValue>;
  title: string;
  filterInput?: (props: FilterInputProps<TData, TValue>) => ReactNode;
  sortFilter?: string;
  handleSortChange?: (field: string) => void;
  buttonClassName?: string;
  testID?: string;
  disabled?: boolean;
  sortID?: string;
}

export function DataTableCustomHeader<TData, TValue>({
  containerClassName,
  column,
  title,
  buttonClassName,
  handleSortChange,
  testID,
  disabled,
  sortID,
}: DataTableColumnHeaderProps<TData, TValue>) {
  return (
    <div
      className={cn(
        "flex flex-col h-full justify-between px-1 py-2 w-full",
        containerClassName
      )}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          handleSortChange?.(sortID ?? column.id);
        }}
        className={cn(
          "w-full h-full gap-1 px-0 mb-2 data-[state=open]:bg-transparent justify-start hover:bg-transparent font-bold text-start leading-tight break-words whitespace-normal disabled:opacity-100 disabled:cursor-pointer disabled:text-inherit disabled:pointer-events-none",
          buttonClassName
        )}
        disabled={disabled}
        {...(testID && { ...testProps(testID) })}
      >
        <span>{title}</span>
        {!disabled && <ArrowUpDown />}
      </Button>
    </div>
  );
}
