import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  PROJECT_LIST_PAGINATION_BUTTON_NEXT,
  PROJECT_LIST_PAGINATION_BUTTON_PAGE_PREFIX,
} from "@/constants/test-ids/audit-plan/general-plan";
import testProps from "@/lib/testing";

interface PaginationComponentProps {
  totalPages: number;
  initialPage?: number;
  siblingsCount?: number;
  onPageChange?: (page: number) => void;
  currentPage?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  testID?: string;
}

export function PaginationComponent({
  totalPages,
  initialPage = 1,
  siblingsCount = 1,
  onPageChange,
  currentPage: externalCurrentPage,
  hasPreviousPage,
  hasNextPage,
  testID,
}: PaginationComponentProps) {
  const [internalCurrentPage, setInternalCurrentPage] = useState(initialPage);
  const currentPage =
    externalCurrentPage !== undefined
      ? externalCurrentPage
      : internalCurrentPage;

  useEffect(() => {
    if (externalCurrentPage !== undefined) {
      setInternalCurrentPage(externalCurrentPage);
    } else if (initialPage !== undefined) {
      setInternalCurrentPage(initialPage);
    }
  }, [initialPage, externalCurrentPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      handlePageChange(1);
    }
  }, [totalPages, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      if (externalCurrentPage === undefined) {
        setInternalCurrentPage(page);
      }
      if (onPageChange) {
        onPageChange(page);
      }
    }
  };

  const generatePagination = () => {
    const firstPage = 1;
    const lastPage = totalPages;

    if (lastPage <= 1) {
      return [currentPage];
    }

    const leftSiblingIndex = Math.max(currentPage - siblingsCount, firstPage);
    const rightSiblingIndex = Math.min(currentPage + siblingsCount, lastPage);

    const shouldShowLeftDots = leftSiblingIndex > firstPage + 1;
    const shouldShowRightDots = rightSiblingIndex < lastPage - 1;

    const pageNumbers = [];

    if (firstPage < leftSiblingIndex) {
      pageNumbers.push(firstPage);
      if (shouldShowLeftDots) {
        pageNumbers.push("leftEllipsis");
      }
    }

    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      pageNumbers.push(i);
    }

    if (lastPage > rightSiblingIndex) {
      if (shouldShowRightDots) {
        pageNumbers.push("rightEllipsis");
      }
      pageNumbers.push(lastPage);
    }

    return pageNumbers;
  };

  const pages = generatePagination();

  const canGoToPrevious =
    hasPreviousPage !== undefined ? hasPreviousPage : currentPage > 1;

  const canGoToNext =
    hasNextPage !== undefined ? hasNextPage : currentPage < totalPages;

  return (
    <div className="flex items-center justify-center gap-1">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!canGoToPrevious}
        className={`w-8 h-8 p-0 rounded ${
          !canGoToPrevious
            ? "opacity-50 cursor-not-allowed"
            : "bg-primary hover:bg-yellow-500"
        }`}
        {...testProps(testID ? testID + "_PREVIOUS" : "")}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>

      {/* Page Numbers */}
      {pages.map((page, index) => {
        if (page === "leftEllipsis" || page === "rightEllipsis") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="w-8 h-8 flex items-center justify-center"
            >
              &hellip;
            </span>
          );
        }

        return (
          <Button
            key={`page-${index}`}
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => handlePageChange(page as number)}
            disabled={totalPages <= 1}
            className={`w-8 h-8 p-0 ${
              currentPage === page
                ? "bg-primary hover:bg-yellow-500 font-bold text-black"
                : "bg-white border border-gray-200 hover:bg-gray-100"
            } ${totalPages <= 1 ? "opacity-50 cursor-not-allowed" : ""}`}
            {...testProps(testID ? testID + "_PAGE_" + index : "")}
          >
            {page}
          </Button>
        );
      })}

      {/* Next Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!canGoToNext}
        className={`w-8 h-8 p-0 rounded ${
          !canGoToNext
            ? "opacity-50 cursor-not-allowed"
            : "bg-primary hover:bg-yellow-500"
        }`}
        {...testProps(testID ? testID + "_NEXT" : "")}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  );
}
