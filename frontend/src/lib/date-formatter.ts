type LocalDateInput = string | Date | null | undefined;

export function localDateTransform(input: LocalDateInput, toApi: boolean = false): Date | string {
  const bulanList = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const bulanMap: Record<string, number> = Object.fromEntries(
    bulanList.map((b, i) => [b, i])
  );

  if (typeof input === "string") {
    const [day, monthName, year] = input.split(" ");
    const month = bulanMap[monthName] ?? 0;
    const dateObj = new Date(Number(year), month, Number(day));
    return toApi ? dateObj : dateObj;
  }

  if (input instanceof Date) {
    return toApi ? input : input;
  }

  return toApi ? new Date() : "";
}
