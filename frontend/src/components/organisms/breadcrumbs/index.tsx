import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { breadcrumbList } from "@/constants/breadcrumb-list";
import { useNavigate } from "@tanstack/react-router";
import testProps from "@/lib/testing";
import { BREADCRUMBS_TITLE } from "@/constants/test-ids/breadcrumbs";
interface BreadcrumbsProps {
  initialPaths?: string[];
}

export default function Breadcrumbs({ initialPaths = [] }: BreadcrumbsProps) {
  const [paths, setPaths] = useState<string[]>(
    initialPaths.length > 0 ? initialPaths : ["Home"]
  );
  const navigate = useNavigate();

  useEffect(() => {
    const pathname = window.location.pathname;

    const pageName = pathname.split("/").filter(Boolean).pop() || "";

    const formatPageName = (name: string): string => {
      return name
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    const formattedPageName = formatPageName(pageName);

    for (const menuItem of breadcrumbList) {
      if (menuItem.title === formattedPageName) {
        setPaths([menuItem.title]);
        return;
      }

      if (menuItem.children) {
        const childMatch = menuItem.children.find(
          (child) => child.title === formattedPageName
        );
        if (childMatch) {
          setPaths([menuItem.title, childMatch.title]);
          return;
        }
      }
    }

    if (pageName.includes("detail")) {
      const basePage = pageName.replace("detail-", "");
      const formattedBasePage = formatPageName(basePage);

      for (const menuItem of breadcrumbList) {
        if (menuItem.children) {
          const childMatch = menuItem.children.find((child) =>
            child.title.toLowerCase().includes(formattedBasePage.toLowerCase())
          );

          if (childMatch) {
            setPaths([
              menuItem.title,
              childMatch.title,
              `Detail ${childMatch.title}`,
            ]);
            return;
          }
        }
      }
    }

    setPaths([formattedPageName]);
  }, [window.location.pathname]);

  const handleBreadcrumbClick = (path: string) => {
    switch (path) {
      case "Home":
        navigate({ to: "/home", replace: true });
        return;
      case "Master Data":
        navigate({ to: `/master-data/audit-universe`, replace: true });
        return;
      case "Audit Plan":
        navigate({ to: `/audit-plan/general-plan`, replace: true });
        return;
      case "Audit Execution":
        navigate({ to: `/audit-execution/desk-audit`, replace: true });
        return;
      case "Audit Monitoring":
        navigate({ to: `/audit-monitoring/audit-project`, replace: true });
        return;
      default:
        break;
    }
  };

  return (
    <div className="flex items-center px-6 py-4 bg-white w-full">
      <nav className="flex items-center text-sm">
        {paths.map((path, index) => (
          <div key={index} className="flex items-center">
            <p
              className={`${
                index === paths.length - 1
                  ? "text-gray-800 font-medium"
                  : "text-blue-600 hover:text-blue-800 hover:cursor-pointer"
              } transition-colors`}
            >
              <p
                className="m-0"
                onClick={() => handleBreadcrumbClick(path)}
                {...testProps(
                  `${BREADCRUMBS_TITLE}${path.replace(/\s+/g, "_").toUpperCase()}`
                )}
              >
                {path === "Lampiran St"
                  ? "Lampiran ST"
                  : path === "Isr"
                    ? "ISR"
                    : path}
              </p>
            </p>

            {index < paths.length - 1 && (
              <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
