import { categoryData } from "@/constants/lists";
import testProps from "@/lib/testing";
import React from "react";

interface IAuditee {
  auditeeName: string;
  categoryName: string;
  totalLeadTime?: number;
}

interface StatusCardProps {
  id: number;
  status: string;
  count: number;
  selectedStatus: number | null;
  onStatusSelect: (id: number) => void;
  testID: string;
}

interface CategoryCardProps {
  name: string;
  items?: IAuditee[];
  status?: string;
}

const StatusCard = ({
  id,
  status,
  count,
  selectedStatus,
  onStatusSelect,
  testID,
}: StatusCardProps) => (
  <div
    className={`rounded-lg p-6 shadow-lg w-full cursor-pointer ${
      selectedStatus === id ? "bg-primary" : ""
    }`}
    onClick={() => onStatusSelect(id)}
    {...testProps(testID)}
  >
    <div className="font-medium text-md">{status}</div>
    <div className="text-3xl font-bold mt-6">{count}</div>
  </div>
);

const CategoryCard = ({ name, items, status }: CategoryCardProps) => (
  <div className={`rounded-lg p-6 shadow-lg w-full min-h-56`}>
    <div
      className={`font-medium align-top h-[10%] ${name === "Yayasan dan Koperasi" ? "text-xs" : "text-sm"}`}
    >
      {name === "Yayasan dan Koperasi" ? "Yayasan & Koperasi" : name}
    </div>
    <div className="my-2 border border-dashed"></div>
    {items && items.length > 0 ? (
      <div className="flex flex-col gap-2">
        {items.map((item, idx) => (
          <div key={idx} className="text-xs flex justify-between">
            <span>{item.auditeeName}</span>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-sm text-gray-500"></div>
    )}
  </div>
);

export const ProjectStatusCard = ({ data }: { data: any }) => {
  const [selectedStatus, setSelectedStatus] = React.useState<number | null>(1);

  const statusData = [
    { id: 1, status: "Open", count: data?.totalOpen || 0, testID: "OPEN" },
    {
      id: 2,
      status: "In Progress",
      count: data?.totalInProgress || 0,
      testID: "IN_PROGRESS",
    },
    {
      id: 3,
      status: "Achieved",
      count: data?.totalAchieved || 0,
      testID: "ACHIEVED",
    },
  ];

  const deskCount = data?.inProgress?.[0]?.desk?.length || 0;
  const fieldCount = data?.inProgress?.[0]?.field?.length || 0;
  const reportingCount = data?.inProgress?.[0]?.auditReporting?.length || 0;

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      {/* Status Cards */}
      <div className="flex gap-4 w-full h-32">
        {statusData.map((card) => (
          <StatusCard
            key={card.id}
            id={card.id}
            status={card.status}
            count={card.count}
            selectedStatus={selectedStatus}
            onStatusSelect={setSelectedStatus}
            testID={`REPORT_STATUS_${card.testID}`}
          />
        ))}
      </div>

      {/* Category Cards */}
      {selectedStatus === 1 && (
        <div className="flex gap-4 w-full">
          {categoryData.map((card) => {
            const items =
              data?.open?.filter((item: IAuditee) => {
                return (
                  item.categoryName.toLowerCase() === card.name.toLowerCase()
                );
              }) || [];

            return (
              <CategoryCard key={card.id} name={card.name} items={items} />
            );
          })}
        </div>
      )}

      {selectedStatus === 2 && (
        <>
          <h1 className="text-lg font-bold my-2 mt-4">Desk : {deskCount}</h1>
          <div className="flex gap-4 w-full">
            {categoryData.map((card) => {
              const items =
                data?.inProgress?.[0]?.desk?.filter(
                  (item: IAuditee) =>
                    item.categoryName.toLowerCase() === card.name.toLowerCase()
                ) || [];

              return (
                <CategoryCard
                  key={card.id}
                  name={card.name}
                  items={items}
                  status="InProgress"
                />
              );
            })}
          </div>

          <h1 className="text-lg font-bold my-2">Field : {fieldCount}</h1>
          <div className="flex gap-4 w-full">
            {categoryData.map((card) => {
              const items =
                data?.inProgress?.[0]?.field?.filter(
                  (item: IAuditee) =>
                    item.categoryName.toLowerCase() === card.name.toLowerCase()
                ) || [];

              return (
                <CategoryCard key={card.id} name={card.name} items={items} />
              );
            })}
          </div>

          <h1 className="text-lg font-bold my-2">
            Reporting : {reportingCount}
          </h1>
          <div className="flex gap-4 w-full">
            {categoryData.map((card) => {
              const items =
                data?.inProgress?.[0]?.auditReporting?.filter(
                  (item: IAuditee) =>
                    item.categoryName.toLowerCase() === card.name.toLowerCase()
                ) || [];

              return (
                <CategoryCard key={card.id} name={card.name} items={items} />
              );
            })}
          </div>
        </>
      )}

      {selectedStatus === 3 && (
        <div className="flex gap-4 w-full">
          {categoryData.map((card) => {
            const items =
              data?.achieved?.filter(
                (item: IAuditee) =>
                  item.categoryName.toLowerCase() === card.name.toLowerCase()
              ) || [];
            return (
              <CategoryCard key={card.id} name={card.name} items={items} />
            );
          })}
        </div>
      )}
    </div>
  );
};
