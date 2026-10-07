import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { WorkExperienceType } from "@/types/type";

export function useWorkingExperienceColumns() {
  return useMemo<ColumnDef<WorkExperienceType>[]>(
    () => [
      {
        accessorKey: "companyName",
        header: "Company Name",
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "workDuration",
        header: "Lama Kerja (Tahun)",
        cell: ({ getValue }) => (
          <div className="p-3 text-center">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "workDivision",
        header: "Bagian/Bidang Pekerjaan",
        cell: ({ getValue }) => (
          <div className="p-3 text-center">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "workPosition",
        header: "Jabatan",
        cell: ({ getValue }) => (
          <div className="p-3 text-center">{getValue() as string | null}</div>
        ),
      },
    ],
    []
  );
}