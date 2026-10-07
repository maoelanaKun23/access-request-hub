import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useManpowerGetChartAuditorHook } from "@/api/msAuditManagement/hooks/manpower";
import { LoadingComponent } from "@/components/templates/loading";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import testProps from "@/lib/testing";

export function TableOrganizationChart({
  handleTabChange,
  testID,
}: {
  handleTabChange: (value: "Auditor" | "Auditee" | "Detail") => void;
  testID: string;
}) {
  const { data: teamMembersData, isLoading: isLoadingTeamMembers } =
    useManpowerGetChartAuditorHook();

  const auditHead = teamMembersData?.data?.attributes?.auditHead;
  const operationExcellence =
    teamMembersData?.data?.attributes?.operationExcellence;
  const teamLeadUTCM = teamMembersData?.data?.attributes?.teamLeadUTCM;
  const teamLeadNonUTCM = teamMembersData?.data?.attributes?.teamLeadNonUTCM;
  const teamMembers = teamMembersData?.data?.attributes?.teamMember;

  const PersonCard = ({
    title,
    person,
    children,
    className = "",
    opacity = 100,
  }: {
    title: string;
    person: string | null;
    children?: React.ReactNode;
    className?: string;
    opacity?: number;
  }) => (
    <div className={`${className}`} style={{ zIndex: 9999, opacity }}>
      <div className="bg-primary rounded-lg p-2">
        <div className="text-center border-0 mb-3">
          <h3 className="text-black text-md font-bold mb-1 px-4">{title}</h3>
        </div>

        {person && (
          <Button
            className="w-full bg-white mb-1 px-3 py-2 flex justify-start"
            onClick={() => handleNavigate(person)}
          >
            <span
              className="flex-1 truncate text-black text-xs font-medium text-left"
              title={person}
            >
              {person}
            </span>
            <Pencil className="h-3 w-3 text-gray-600 flex-shrink-0 ml-2" />
          </Button>
        )}
        {children}
      </div>
    </div>
  );

  const handleNavigate = (userId: string) => {
    localStorage.setItem("userId", userId);
    handleTabChange("Detail");
  };

  if (isLoadingTeamMembers) return <LoadingComponent />;

  return (
    <div className="grid grid-cols-1 px-4 py-8">
      <div className="w-full max-w-3xl flex justify-center mx-auto">
        <Table className="w-full table-fixed ">
          <colgroup>
            <col style={{ width: "16.66%" }} />
            <col style={{ width: "16.66%" }} />
            <col style={{ width: "16.66%" }} />
            <col style={{ width: "16.66%" }} />
            <col style={{ width: "16.66%" }} />
            <col style={{ width: "16.66%" }} />
          </colgroup>

          <TableBody>
            {/* Audit Head */}
            <TableRow className="border-0">
              <TableCell className="p-4 border-0"></TableCell>
              <TableCell className="p-4 border-0"></TableCell>
              <TableCell
                colSpan={2}
                rowSpan={2}
                className="border-0 align-bottom"
              >
                <PersonCard title="Corporate Audit Head" person={null}>
                  {auditHead &&
                    auditHead.map((item, index) => (
                      <Button
                        className="w-full justify-between bg-white mb-1 px-3 py-2"
                        key={index}
                        onClick={() => item.nrp && handleNavigate(item.nrp)}
                        disabled={!item.nrp}
                        {...testProps(`${testID}_AUDIT_HEAD_${index}`)}
                      >
                        <span className="text-black text-xs font-medium truncate">
                          {item.name}
                        </span>
                        <Pencil className="h-3 w-3 text-gray-600" />
                      </Button>
                    ))}
                </PersonCard>
              </TableCell>
              <TableCell className="p-4 border-0"></TableCell>
              <TableCell className="p-4 border-0"></TableCell>
            </TableRow>

            <TableRow className="border-0">
              <TableCell className="p-4 border-0"></TableCell>
              <TableCell className="p-4 border-0"></TableCell>
              <TableCell className="p-4 border-0"></TableCell>
              <TableCell className="p-4 border-0"></TableCell>
            </TableRow>

            <TableRow className="border-0">
              <TableCell className="p-4 border-0"></TableCell>
              <TableCell className="p-4 border-0"></TableCell>
              <TableCell className="p-4 border-black border-[3px] border-b-0 border-t-0 border-l-0"></TableCell>
              <TableCell className="p-4 border-0"></TableCell>
              <TableCell className="p-4 border-0"></TableCell>
              <TableCell className="p-4 border-0"></TableCell>
            </TableRow>

            {/* Operation Excellence */}
            <TableRow className="border-0">
              <TableCell className="p-4 border-0"></TableCell>
              <TableCell className="p-4 border-0"></TableCell>
              <TableCell className="p-4 border-0"></TableCell>
              <TableCell className="p-4 border-black border-[3px] border-t-0 border-r-0"></TableCell>
              <TableCell colSpan={2} rowSpan={2} className="border-0 ">
                <PersonCard title="Operation Excellence" person={null}>
                  {operationExcellence &&
                    operationExcellence.map((item, index) => (
                      <Button
                        className="w-full justify-between bg-white mb-1 px-3 py-2"
                        key={index}
                        onClick={() => item?.nrp && handleNavigate(item?.nrp)}
                        disabled={!item?.nrp}
                        {...testProps(
                          `${testID}_OPERATIONAL_EXCELLENCE_${index}`
                        )}
                      >
                        <span className="text-black text-xs font-medium truncate">
                          {item?.name}
                        </span>
                        <Pencil className="h-3 w-3 text-gray-600" />
                      </Button>
                    ))}
                </PersonCard>
              </TableCell>
            </TableRow>

            <TableRow className="border-0">
              <TableCell className="p-4 border-0"></TableCell>
              <TableCell className="p-4 border-0"></TableCell>
              <TableCell className="p-4 border-0"></TableCell>
              <TableCell className="p-4 border-black border-[3px] border-r-0 border-b-0 border-t-0"></TableCell>
            </TableRow>

            <TableRow className="border-0">
              <TableCell className="p-4 border-black border-[0px] border-r-0 border-t-0 border-l-0"></TableCell>
              <TableCell className="p-4 border-black border-[3px] border-r-0 border-t-0 border-l-0"></TableCell>
              <TableCell className="p-4 border-black border-[3px]  border-t-0 border-l-0"></TableCell>
              <TableCell className="p-4 border-black border-[3px] border-r-0 border-t-0 border-l-0"></TableCell>
              <TableCell className="p-4 border-black border-[3px] border-r-0 border-t-0 border-l-0"></TableCell>
              <TableCell className="p-4 border-0"></TableCell>
            </TableRow>
            <TableRow className="border-0">
              <TableCell className="p-4 border-black border-[3px] border-b-0 border-t-0 border-l-0"></TableCell>
              <TableCell className="p-4 border-0"></TableCell>
              <TableCell className="p-4 border-black border-[3px] border-b-0 border-t-0 border-l-0"></TableCell>
              <TableCell className="p-4 border-0"></TableCell>
              <TableCell className="p-4 border-black border-[3px] border-b-0 border-t-0 border-l-0"></TableCell>
              <TableCell className="p-4 border-0"></TableCell>
            </TableRow>

            {/* Team Lead */}
            <TableRow className="border-0">
              <TableCell colSpan={2} rowSpan={2} className="border-0 align-top">
                <PersonCard
                  title="UTCM Operation Audit
              Team Leader"
                  person={null}
                >
                  {teamLeadUTCM &&
                    teamLeadUTCM.map((item, index) => (
                      <Button
                        className="w-full justify-between bg-white mb-1 px-3 py-2"
                        key={index}
                        onClick={() => item?.nrp && handleNavigate(item?.nrp)}
                        disabled={!item?.nrp}
                        {...testProps(`${testID}_LEAD_UTCM_${index}`)}
                      >
                        <span className="text-black text-xs font-medium truncate">
                          {item?.name}
                        </span>
                        <Pencil className="h-3 w-3 text-gray-600" />
                      </Button>
                    ))}
                </PersonCard>
              </TableCell>
              <TableCell className="p-4 border-black border-[3px] border-b-0 border-t-0 border-l-0"></TableCell>
              <TableCell className="p-4 border-0"></TableCell>
              <TableCell colSpan={2} rowSpan={2} className="border-0 align-top">
                <PersonCard
                  title="Corporate & IT Audit
                Team Leader"
                  person={null}
                >
                  {teamLeadNonUTCM &&
                    teamLeadNonUTCM.map((item: any, index: number) => (
                      <Button
                        className="w-full justify-between bg-white mb-1 px-3 py-2"
                        key={index}
                        onClick={() => item?.nrp && handleNavigate(item?.nrp)}
                        disabled={!item?.nrp}
                        {...testProps(`${testID}_LEAD_NON_UTCM_${index}`)}
                      >
                        <span className="text-black text-xs font-medium truncate">
                          {item?.name}
                        </span>
                        <Pencil className="h-3 w-3 text-gray-600" />
                      </Button>
                    ))}
                </PersonCard>
              </TableCell>
            </TableRow>

            <TableRow className="border-0">
              <TableCell className="p-4 border-black border-[3px] border-b-0 border-t-0 border-l-0"></TableCell>
              <TableCell className="p-4 border-0"></TableCell>
            </TableRow>

            <TableRow className="border-0">
              <TableCell className="p-4 border-0"></TableCell>
              <TableCell className="p-4 border-0"></TableCell>
              <TableCell className="p-4 border-black border-[3px] border-b-0 border-t-0 border-l-0"></TableCell>
              <TableCell className="p-4 border-0"></TableCell>
              <TableCell className="p-4 border-0"></TableCell>
              <TableCell className="p-4 border-0"></TableCell>
            </TableRow>

            {/* Team Member */}
            <TableRow className="border-0">
              <TableCell className="p-4 border-0"></TableCell>
              <TableCell className="p-4 border-0"></TableCell>
              <TableCell colSpan={2} rowSpan={2} className="border-0 align-top">
                <PersonCard title="Team Member" person={null}>
                  {teamMembers &&
                    teamMembers.map((member: any, index: number) => (
                      <Button
                        className="w-full justify-between bg-white mb-1 px-3 py-2"
                        key={index}
                        onClick={() =>
                          member?.nrp && handleNavigate(member?.nrp)
                        }
                        disabled={!member?.nrp}
                        {...testProps(`${testID}_TEAM_MEMBER_${index}`)}
                      >
                        <span className="text-black text-xs font-medium truncate">
                          {member?.name}
                        </span>
                        <Pencil className="h-3 w-3 text-gray-600" />
                      </Button>
                    ))}
                </PersonCard>
              </TableCell>
              <TableCell className="p-4 border-0"></TableCell>
              <TableCell className="p-4 border-0"></TableCell>
            </TableRow>

            <TableRow className="border-0">
              <TableCell className="p-4 border-0"></TableCell>
              <TableCell className="p-4 border-0"></TableCell>
              <TableCell className="p-4 border-0"></TableCell>
              <TableCell className="p-4 border-0"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
