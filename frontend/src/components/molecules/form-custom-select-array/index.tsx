import { LoadingComponent } from "@/components/templates/loading";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import testProps from "@/lib/testing";
import { X } from "lucide-react";

export function FormCustomSelectArrayValue({
  isLoading,
  label,
  placeholder,
  items,
  onSelect,
  selectedValue,
  className,
  disabled,
  testID,
}: {
  isLoading?: boolean;
  label?: string;
  placeholder: string;
  items: string[];
  onSelect: (value: string) => void;
  selectedValue?: string;
  className?: string;
  disabled?: boolean;
  testID?: string;
}) {
  return (
    <div className="w-full">
      {label && (
        <Label className="block text-sm font-medium mb-2">{label}</Label>
      )}
      <div className="relative flex items-center">
        <Select value={selectedValue ?? ""} onValueChange={onSelect}>
          <SelectTrigger
            className={`w-full text-[#C8C8C8] ${selectedValue ? "text-black [&>svg]:hidden pr-6" : ""} ${className}`}
            disabled={disabled}
            {...testProps(testID ?? "")}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="z-[10000]">
            {items?.map((item) => (
              <SelectItem
                key={item}
                value={item}
                className="hover:bg-gray-50 hover:cursor-pointer"
                {...testProps(`${testID ?? ""}_OPTION`)}
              >
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedValue && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect("");
            }}
            className="absolute right-2 z-10 p-0.5 rounded-full hover:bg-gray-200 text-gray-500 hover:text-black"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}