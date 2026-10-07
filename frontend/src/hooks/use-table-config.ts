import {
  type ColumnDef,
  type RowData,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type {useTableState} from './use-table-state'

declare module '@tanstack/react-table' {
  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  interface ColumnMeta<TData extends RowData, TValue = unknown> {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    filterComponent?: any
    header?: {
      className?: string
    }
    cell?: {
      className?: string
    }
  }
}

export function useTableConfig<
  TData extends RowData,
  TValue = unknown,
>(options: {
  data: TData[]
  columns: ColumnDef<TData, TValue>[]
  tableState: ReturnType<typeof useTableState>
  pageCount: number
}) {
  const {data, columns, tableState, pageCount} = options

  return useReactTable({
    data,
    columns,
    state: {
      sorting: tableState.sorting,
      columnFilters: tableState.columnFilters,
      pagination: tableState.pagination,
      columnVisibility: tableState.columnVisibility,
      rowSelection: tableState.rowSelection,
      columnPinning: tableState.columnPinning,
    },
    getRowCanExpand: tableState.getRowCanExpand,
    onSortingChange: tableState.setSorting,
    onColumnFiltersChange: tableState.setColumnFilters,
    onPaginationChange: tableState.setPagination,
    onColumnVisibilityChange: tableState.setColumnVisibility,
    onRowSelectionChange: tableState.setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onColumnPinningChange: tableState.setColumnPinning,
    pageCount: pageCount,
    enableRowSelection: true,
    enableMultiSort: false,
    enableSortingRemoval: false,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    meta: {
      emptyState: {
        label: 'No data found',
      },
    },
  })
}
