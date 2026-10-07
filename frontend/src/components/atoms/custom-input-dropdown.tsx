import { cn } from "@/lib/utils";
import React, { type ComponentProps, useState, useRef, useEffect } from "react";
import testProps from "@/lib/testing";
import { X, ChevronDown } from "lucide-react";
import { Input } from "../ui/input";

export interface SearchItem {
  picID: string;
  name: string;
  email: string;
  position: string;
  gender: string;
}

export interface CustomInputProps extends React.ComponentProps<typeof Input> {
  containerClassName?: string;
  addonLeft?: React.ReactNode;
  addonRight?: React.ReactNode;
  addonLeftProps?: ComponentProps<"div">;
  addonRightProps?: ComponentProps<"div">;
  inputStyle?: "default" | "borderless";
  testID?: string;
  searchMode?: boolean;
  searchItems?: SearchItem[];
  selectedValues?: string[];
  onSelectMultiple?: (values: string[]) => void;
  onSearchChange?: (query: string) => void;
  searchPlaceholder?: string;
}

const CustomInputDropdown = React.forwardRef<
  HTMLInputElement,
  CustomInputProps
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
      testID,
      searchMode = false,
      searchItems = [],
      selectedValues = [],
      onSelectMultiple,
      onSearchChange,
      searchPlaceholder,
      ...props
    },
    ref,
  ) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsDropdownOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleSelect = (email: string) => {
      if (onSelectMultiple && !selectedValues.includes(email)) {
        onSelectMultiple([...selectedValues, email]);
        setInputValue("");
        setIsDropdownOpen(false);
        if (onSearchChange) onSearchChange("");
        inputRef.current?.focus();
      }
    };

    const handleRemove = (valueToRemove: string) => {
      if (onSelectMultiple) {
        onSelectMultiple(selectedValues.filter((v) => v !== valueToRemove));
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      setIsDropdownOpen(true);
      if (onSearchChange) onSearchChange(e.target.value);
      if (props.onChange) props.onChange(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputValue.trim() !== "") {
        e.preventDefault();
        const newEmail = inputValue.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newEmail)) return;
        handleSelect(newEmail);
      }
    };

    const getNameFromEmail = (email: string): string => {
      if (!searchItems || searchItems.length === 0) return email;
      const item = searchItems.find((item) => item.email === email);
      return item?.name || email;
    };

    if (searchMode) {
      return (
        <div
          ref={containerRef}
          className={cn("relative w-full", containerClassName)}
        >
          <div
            className={cn(
              "min-h-[40px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm flex flex-wrap gap-2 items-center",
              props.disabled && "opacity-50 cursor-not-allowed",
              className,
            )}
            onClick={() => {
              if (!props.disabled) {
                inputRef.current?.focus();
                setIsDropdownOpen(true);
              }
            }}
          >
            {/* Selected tags */}
            {selectedValues.map((email) => (
              <div
                key={email}
                className="inline-flex items-center gap-1 bg-gray-100 text-black rounded px-2 py-1 text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <span>{getNameFromEmail(email)}</span>
                {!props.disabled && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(email);
                    }}
                    className="hover:bg-gray-200 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            ))}

            {/* Input area */}
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsDropdownOpen(true)}
              placeholder={
                selectedValues.length === 0
                  ? searchPlaceholder || props.placeholder
                  : ""
              }
              disabled={props.disabled}
              className={cn(
                "flex-1 min-w-[120px] outline-none bg-transparent",
                "placeholder:text-[#C8C8C8]",
                selectedValues.length === 0 && "w-full",
              )}
              {...testProps(testID ?? "")}
            />

            {/* Dropdown icon */}
            <ChevronDown
              className={cn(
                "h-4 w-4 text-gray-400 transition-transform",
                isDropdownOpen && "transform rotate-180",
              )}
            />
          </div>

          {/* Dropdown */}
          {isDropdownOpen && !props.disabled && (
            <div className="absolute top-full mt-1 w-full z-[10000] rounded-md border bg-white shadow-lg max-h-60 overflow-auto">
              {searchItems.length > 0 ? (
                searchItems.map((item) => (
                  <div
                    key={item.email}
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                    onClick={() => handleSelect(item.email)}
                    {...testProps(`${testID ?? ""}_OPTION`)}
                  >
                    {item.name} | {item.email}
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-gray-400 text-sm italic">
                  No results
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

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

CustomInputDropdown.displayName = "CustomInputDropdown";
export { CustomInputDropdown };
