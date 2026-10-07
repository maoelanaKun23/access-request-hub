export function getYtdMonths(): string {
  const currentMonth = new Date().getMonth() + 1;
  return Array.from({ length: currentMonth }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  ).join(",");
}
