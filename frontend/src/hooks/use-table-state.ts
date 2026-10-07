import type {
  ColumnFiltersState,
  ColumnPinningState,
  PaginationState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table'
import {useState} from 'react'

export function useTableState(options?: {
  initialPageSize?: number
  initialSorting?: SortingState
  initialColumnFilters?: ColumnFiltersState
  initialColumnVisibility?: VisibilityState
  initialColumnPinning?: ColumnPinningState
  initialGetRowCanExpand?: boolean
}) {
  const [sorting, setSorting] = useState<SortingState>(
    options?.initialSorting || [],
  )

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    options?.initialColumnFilters || [],
  )

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: options?.initialPageSize || 10,
  })

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    options?.initialColumnVisibility || {},
  )

  const [rowSelection, setRowSelection] = useState({})

  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>(
    options?.initialColumnPinning || {left: [], right: []},
  )

  const getRowCanExpand = () => options?.initialGetRowCanExpand ?? false

  return {
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    pagination,
    setPagination,
    columnVisibility,
    setColumnVisibility,
    rowSelection,
    setRowSelection,
    columnPinning,
    setColumnPinning,
    getRowCanExpand,
  }
}
