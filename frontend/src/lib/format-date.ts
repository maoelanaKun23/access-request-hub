import { format, parseISO } from "date-fns";

export const formatDate = ({
  date,
  formatDate = "dd-MM-yyyy",
}: {
  date: string;
  formatDate: string;
}) => {
  if (!date) {
    return "";
  }

  const localDate = parseISO(date);
  return format(localDate, formatDate);
};

export const dateConvert = ({ date }: { date: string }) => {
  if (!date) {
    return "";
  }

  const localDate = parseISO(date);
  return localDate;
};

export const formatDateToLocal = (
  dateString: string | null | undefined
): string => {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  } catch (error) {
    return "";
  }
};

export const formatDateForDisplay = (
  date: Date | string | null
): Date | undefined => {
  if (!date) return undefined;

  if (date instanceof Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  if (typeof date === "string") {
    const parsedDate = new Date(date);
    return new Date(
      parsedDate.getFullYear(),
      parsedDate.getMonth(),
      parsedDate.getDate()
    );
  }

  return undefined;
};

export const formatDateForSubmit = (
  date: Date | undefined | null
): Date | string | null => {
  if (!date) return null;

  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const formatDateForSubmitToString = (
  date: Date | null
): string | null => {
  if (!date) return null;
  const normalizedDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  return normalizedDate.toISOString().split("T")[0]; // YYYY-MM-DD
};
