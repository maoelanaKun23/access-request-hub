import { cn } from "@/lib/utils";
import React, { type ComponentProps } from "react";
import { Input } from "../ui/input";
import testProps from "@/lib/testing";

export interface CustomInputProps extends React.ComponentProps<typeof Input> {
  containerClassName?: string;
  addonLeft?: React.ReactNode;
  addonRight?: React.ReactNode;
  addonLeftProps?: ComponentProps<"div">;
  addonRightProps?: ComponentProps<"div">;
  inputStyle?: "default" | "borderless";
  testID?: string;
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      containerClassName,
      className,
      addonLeft,
      addonRight,
      addonLeftProps,
      addonRightProps,
      inputStyle = "default",
      testID,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn("relative flex items-center z-10", containerClassName)}
      >
        {addonLeft && (
          <div
            className={cn(
              "absolute left-0 pl-3 flex items-center cursor-pointer",
              addonLeftProps?.className,
            )}
            {...addonLeftProps}
          >
            {addonLeft}
          </div>
        )}
        {inputStyle === "default" ? (
          <Input
            className={cn(
              "bg-[#FFFFFF] h-10 font-normal focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 -z-10 truncate",
              "placeholder:text-ellipsis placeholder:overflow-hidden",
              "placeholder:text-[#C8C8C8]",
              addonLeft && "pl-9",
              addonRight && "pr-10",
              className,
            )}
            ref={ref}
            {...props}
            {...testProps(testID ?? "")}
          />
        ) : (
          <Input
            className={cn(
              "bg-transparent h-8 font-normal focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 -z-10 truncate",
              "placeholder:text-ellipsis placeholder:overflow-hidden",
              "placeholder:text-[#C8C8C8]",
              "border-x-0 border-t-0 border-b border-gray-300 rounded-none",
              "focus:border-b-2 focus:border-gray-500",
              addonLeft && "pl-9",
              addonRight && "pr-10",
              className,
            )}
            ref={ref}
            {...props}
            {...testProps(testID ?? "")}
          />
        )}
        {addonRight && (
          <div
            className={cn(
              "absolute right-0 pr-3 flex items-center z-20 cursor-pointer",
              addonRightProps?.className,
            )}
            {...addonRightProps}
          >
            {addonRight}
          </div>
        )}
      </div>
    );
  },
);

CustomInput.displayName = "CustomInput";

export { CustomInput };
