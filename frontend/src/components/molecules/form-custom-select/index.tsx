import testProps from "@/lib/testing";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

interface Iitems {
  key: string;
  value: string;
}

export function FormCustomSelect({
  label,
  placeholder,
  items,
  onSelect,
  selectedValue,
  className,
  disabled = false,
  testID,
}: {
  label?: string;
  placeholder: string;
  items: Iitems[] | undefined;
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
      <Select value={selectedValue} onValueChange={onSelect}>
        <SelectTrigger
          className={`w-full ${selectedValue ? "text-black" : "text-[#C8C8C8]"} ${className}`}
          disabled={disabled}
          {...testProps(testID ?? "")}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent style={{ zIndex: 9999 }} className="hover:bg-gray-50">
          {items?.map((item) => (
            <SelectItem key={item.key} value={item.value} {...testProps(`${testID}_OPTION`)}>
              {item.key}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
