import { cn } from "@/lib/utils";
import React, { type ComponentProps } from "react";
import { Input } from "../ui/input";
import testProps from "@/lib/testing";
import { idFormatter } from "@/lib/id-formatter";

export interface AddEditAuditeeCustomInputProps
  extends React.ComponentProps<typeof Input> {
  containerClassName?: string;
  addonLeft?: React.ReactNode;
  addonRight?: React.ReactNode;
  addonLeftProps?: ComponentProps<"div">;
  addonRightProps?: ComponentProps<"div">;
  inputStyle?: "default" | "borderless";
  format?: "numberWithSeparator" | "percent";
  testID?: string;
}

const formatNumber = (value: number | string) => {
  if (value === null || value === undefined || value === "") return "";
  const [intPart, decimalPart] = String(value).split(".");
  const formattedInt = new Intl.NumberFormat("id-ID").format(Number(intPart));
  return decimalPart !== undefined
    ? `${formattedInt},${decimalPart}`
    : formattedInt;
};

const formatPercent = (value: number | string) => {
  if (value === null || value === undefined || value === "") return "";
  return `${formatNumber(value)}%`;
};

export const AddEditAuditeeCustomInput = React.forwardRef<
  HTMLInputElement,
  AddEditAuditeeCustomInputProps
>(
  (
    {
      containerClassName,
      className,
      addonLeft,
      addonRight,
      addonLeftProps,
      addonRightProps,
      inputStyle = "default",
      format,
      value,
      onChange,
      placeholder,
      testID,
      ...props
    },
    ref
  ) => {
    const MAX_LENGTH = 15;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (format === "numberWithSeparator") {
        const raw = e.target.value.replace(/\./g, "").replace(",", ".");
        if (/^\d*[.,]?\d*$/.test(raw) || raw === "") {
          const [intPart] = raw.split(".");
          if (intPart.length <= MAX_LENGTH) {
            onChange?.({
              ...e,
              target: { ...e.target, value: raw },
            } as any);
          }
        }
      } else if (format === "percent") {
        const raw = e.target.value.replace(/[^0-9]/g, "");
        const [intPart] = raw.split(".");
        if (intPart.length <= MAX_LENGTH) {
          onChange?.({
            ...e,
            target: { ...e.target, value: raw },
          } as any);
        }
      } else {
        onChange?.(e);
      }
    };

    const displayValue =
      format === "numberWithSeparator"
        ? value !== "" && value !== null && value !== undefined
          ? formatNumber(value as any)
          : ""
        : format === "percent"
          ? formatPercent(value as any)
          : value;

    const computedPlaceholder =
      format === "percent" ? "0%" : (placeholder ?? "");

    const commonClassName = cn(
      inputStyle === "default"
        ? "bg-[#FFFFFF] h-10 font-normal"
        : "bg-transparent h-8 font-normal border-x-0 border-t-0 border-b border-gray-300 rounded-none focus:border-b-2 focus:border-gray-500",
      "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 -z-10 truncate",
      "placeholder:text-ellipsis placeholder:overflow-hidden placeholder:text-[#C8C8C8]",
      addonLeft && "pl-9",
      addonRight && "pr-10",
      !value && "border",
      className
    );

    return (
      <div
        className={cn("relative flex items-center z-10", containerClassName)}
      >
        {addonLeft && (
          <div
            className={cn(
              "absolute left-0 pl-3 flex items-center cursor-pointer",
              addonLeftProps?.className
            )}
            {...addonLeftProps}
          >
            {addonLeft}
          </div>
        )}

        <Input
          {...props}
          ref={ref}
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          placeholder={computedPlaceholder}
          className={commonClassName}
          style={{ borderRadius: 8, borderColor: "hsl(0 0% 89.8%)" }}
          {...testProps(testID ? testID + `_INPUT_${idFormatter(computedPlaceholder)}` : "")}
        />

        {addonRight && (
          <div
            className={cn(
              "absolute right-0 pr-3 flex items-center z-20 cursor-pointer",
              addonRightProps?.className
            )}
            {...addonRightProps}
          >
            {addonRight}
          </div>
        )}
      </div>
    );
  }
);

AddEditAuditeeCustomInput.displayName = "AddEditAuditeeCustomInput";
