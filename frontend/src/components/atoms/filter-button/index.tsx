import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

interface IItem {
  id: string;
  label: string;
  value: { label: string; value: string }[];
}

interface FilterButtonProps {
  placeholder: string;
  items: IItem;
  setSelectedValue: (value: string) => void;
  className?: string;
}

export const FilterButton = ({
  placeholder,
  items,
  className,
  setSelectedValue
}: FilterButtonProps) => {
  const [value, setValue] = useState<number>(2025);

  useEffect(() => {
    if (items.value) {
      setSelectedValue(value.toString());
    }
  }, [items.value]);
  return (
    <Select>
      <SelectTrigger className={`w-full ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.value.map((item, index) => (
          <SelectItem key={index} value={item.label} onClick={() => setValue(+item.value)}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
