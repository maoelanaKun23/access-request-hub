import { months } from "@/constants/lists";

export function numberToMonth(month: string): string {
  const index = parseInt(month, 10) - 1;
  if (index >= 0 && index < 12) {
    return months[index];
  }
  return "";
}
