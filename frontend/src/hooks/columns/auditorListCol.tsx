import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import testProps from "@/lib/testing";
import { MANPOWER_TABLE_AUDITOR_LIST_BUTTON_DETAIL } from "@/constants/test-ids/master-data/manpower";

export type UserData = {
  itemId: string;
  name: string;
  username: string;
  userRole: string | null;
  gender: string | null;
  position: string;
  employeeStatus: string | null;
  emailOffice: string;
  emailPersonal: string | null;
};

export function useAuditorListColumns(
  handleTabChange: (value: "Auditor" | "Auditee" | "Detail") => void,
  addTeamMember: (data: {
    id: string;
    username: string;
    nrp: string;
    name: string;
    position: string;
    email: string;
  }) => void
) {
  return useMemo<ColumnDef<UserData>[]>(
    () => [
      {
        accessorKey: "name",
        header: () => <div className="p-3 text-start">Name</div>,
        cell: ({ getValue, row }) => (
          <div
            className="p-3 text-start cursor-pointer"
            onClick={() => {
              localStorage.setItem("userId", row.original.username);
              handleTabChange("Detail");
            }}
            {...testProps(MANPOWER_TABLE_AUDITOR_LIST_BUTTON_DETAIL)}
          >
            {getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: "username",
        header: () => <div className="p-3 text-start">User Name</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "userRole",
        header: () => <div className="p-3 text-start">User Role</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "gender",
        header: () => <div className="p-3 text-start">Gender</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "position",
        header: () => <div className="p-3 text-start">Position</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "employeeStatus",
        header: () => <div className="p-3 text-start">Status Karyawan</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string | null}</div>
        ),
      },
      {
        accessorKey: "emailOffice",
        header: () => <div className="p-3 text-start">Email Kantor</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "emailPersonal",
        header: () => <div className="p-3 text-start">Email Pribadi</div>,
        cell: ({ getValue }) => (
          <div className="p-3 text-start">{getValue() as string | null}</div>
        ),
      },
    ],
    [addTeamMember]
  );
}
