import React, { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useManpowerGetChartAuditorHook } from "@/api/msAuditManagement/hooks/manpower";
import { LoadingComponent } from "@/components/templates/loading";

export function OrganizationChart({
  handleTabChange,
}: {
  handleTabChange: (value: "Auditor" | "Auditee" | "Detail") => void;
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
  }: {
    title: string;
    person: string | null;
    children?: React.ReactNode;
    className?: string;
  }) => (
    <div className={`${className}`} style={{ zIndex: 9999 }}>
      <div className="bg-primary rounded-lg p-2 min-w-[280px] max-w-[320px]">
        {/* Title */}
        <div className="text-center mb-3">
          <h3 className="text-black text-sm font-bold mb-1">{title}</h3>
        </div>

        {/* Person card */}
        {person && (
          <Button
            className="w-full justify-between bg-white mb-1 px-3 py-2"
            onClick={() => handleNavigate(person)}
          >
            <span className="text-black text-xs font-medium">{person}</span>
            <Pencil className="h-3 w-3 text-gray-600" />
          </Button>
        )}

        {/* Additional content */}
        {children}
      </div>
    </div>
  );
  const [lineWidth, setLineWidth] = useState(470);

  const handleNavigate = (userId: string) => {
    localStorage.setItem("userId", userId);
    handleTabChange("Detail");
  };

  const handleSize = () => {
    const widthPerMember = teamMembers && teamMembers.length * 3;
    setLineWidth(lineWidth + (widthPerMember ?? 0));
  };

  useEffect(() => {
    handleSize();
  }, [teamMembersData]);

  if (isLoadingTeamMembers) return <LoadingComponent />;

  return (
    <div className="flex flex-col items-center p-4">
      {/* Corporate Audit Function */}
      <div className="mb-8 flex flex-col items-center">
        <PersonCard title="Corporate Audit Function" person={null}>
          {auditHead &&
            auditHead.map((item, index) => (
              <Button
                className="w-full justify-between bg-white mb-1 px-3 py-2"
                key={index}
                onClick={() => item.nrp && handleNavigate(item.nrp)}
                disabled={!item.nrp}
              >
                <span className="text-black text-xs font-medium">
                  {item.name}
                </span>
                <Pencil className="h-3 w-3 text-gray-600" />
              </Button>
            ))}
        </PersonCard>
        <Separator
          className={`h-1 bg-black rotate-90 ${teamLeadUTCM.length === 0 || teamLeadNonUTCM.length === 0 ? "translate-y-36" : "translate-y-52"} justify-start`}
          style={{
            width: `${teamLeadUTCM.length === 0 || teamLeadNonUTCM.length === 0 ? 420 : lineWidth}px`,
          }}
        />
      </div>

      {/* Operation Excellence */}
      <div
        className={`mb-16 ${operationExcellence.length === 0 ? "translate-x-60" : "translate-x-64"} flex flex-row items-center`}
      >
        <Separator className="h-1 bg-black w-[200px]" />
        <PersonCard title="Operation Excellence" person={null}>
          {operationExcellence &&
            operationExcellence.map((item, index) => (
              <Button
                className="w-full justify-between bg-white mb-1 px-3 py-2"
                key={index}
                onClick={() => item.nrp && handleNavigate(item.nrp)}
                disabled={!item.nrp}
              >
                <span className="text-black text-xs font-medium">
                  {item.name}
                </span>
                <Pencil className="h-3 w-3 text-gray-600" />
              </Button>
            ))}
        </PersonCard>
      </div>
      <Separator className="h-1 bg-black w-[476px] -translate-y-8" />

      {/* Audit Team Leaders */}
      <div className="mb-8 flex flex-row gap-48">
        <div className="flex flex-col items-center">
          <Separator className="h-1 bg-black w-[72px] rotate-90" />
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
                  onClick={() => item.nrp && handleNavigate(item.nrp)}
                  disabled={!item.nrp}
                >
                  <span className="text-black text-xs font-medium">
                    {item.name}
                  </span>
                  <Pencil className="h-3 w-3 text-gray-600" />
                </Button>
              ))}
          </PersonCard>
        </div>

        {/* Corporate & IT Audit Team Leader */}
        <div className="flex flex-col items-center">
          <Separator className="h-1 bg-black w-[72px] rotate-90" />
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
                  onClick={() => item.nrp && handleNavigate(item.nrp)}
                  disabled={!item.nrp}
                >
                  <span className="text-black text-xs font-medium">
                    {item.name}
                  </span>
                  <Pencil className="h-3 w-3 text-gray-600" />
                </Button>
              ))}
          </PersonCard>
        </div>
      </div>

      {/* Audit Team Members */}
      <div className="mb-8 flex flex-row">
        <PersonCard title="Team Member" person={null}>
          {teamMembers &&
            teamMembers.map((member: any, index: number) => (
              <Button
                className="w-full justify-between bg-white mb-1 px-3 py-2"
                key={index}
                onClick={() => member.nrp && handleNavigate(member.nrp)}
                disabled={!member.nrp}
              >
                <span className="text-black text-xs font-medium">
                  {member.name}
                </span>
                <Pencil className="h-3 w-3 text-gray-600" />
              </Button>
            ))}
        </PersonCard>
      </div>
    </div>
  );
}
