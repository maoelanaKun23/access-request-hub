// biome-ignore lint/style/useImportType: <explanation>
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from '@tanstack/react-table'
import {add, format} from 'date-fns'

export type TableSorts<T> = ColumnDef<T>['id'] | `-${ColumnDef<T>['id']}`

/**
 * This sorting string can be used to sort a table in ascending or descending order based on the id of the column.
 * The - sign indicates descending order
 * @example
 * //from this:
 * [
 *   { id: 'name', desc: true },
 * ]
 * //into this:
 * '-name'
 */
const transformSortId = (id: string) => id.replace(/_/g, '.')

export function generateSorts<TSorting>(
  sortState: SortingState,
): TableSorts<TSorting> {
  return sortState[0]
    ? `${sortState[0].desc ? '-' : ''}${transformSortId(sortState[0].id)}`
    : undefined
}

/**
 * This function is used to transform an array of column filters into an object
 * where each key-value pair represents a column filter.
 * @example
 * //from this:
 * [
 *   { id: 'name', value: 'John' },
 *   { id: 'age', value: '20' },
 * ]
 * //into this:
 * {
 *  name: 'John',
 *  age: '20',
 *  }
 */
export function generateFiltersLegacy<Columns>(
  colFilters: ColumnFiltersState,
): Columns {
  const mapping = colFilters.map(colFilter => [colFilter.id, colFilter.value])

  return Object.fromEntries(mapping)
}

export const filterOperators = {
  Equals: '==',
  NotEquals: '!=',
  LessThan: '<',
  LessThanOrEqual: '<=',
  GreaterThan: '>',
  GreaterThanOrEqual: '>=',
  StartsWith: '_=',
  EndsWith: '=_',
  Contains: '@=',
  NotContains: '!@=',
} as const

export function generateFilters(colFilters: ColumnFiltersState): string {
  return colFilters
    .map(
      ({
        id,
        value,
        operator,
      }: {
        id: string
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        value: any
        operator?: keyof typeof filterOperators
      }) => {
        if (
          id === 'model' ||
          id === 'serialNumber' ||
          id === 'code' ||
          id === 'customerName' ||
          id === 'plantName'
        ) {
          return `${id}@=${value}`
        }

        if (id === 'smr') {
          return `${id}string@=${value}`
        }

        if (id === 'threshold') {
          return `(threshold.criticalBottom|threshold.criticalTop|threshold.cautionBottom|threshold.cautionTop)@=${value}`
        }

        if (id === 'smrDate') {
          const formattedDate = value.split('T')[0]
          return `${id}@=${formattedDate}`
        }

        if (id === 'lastUpdated') {
          const filterDate = format(value, 'yyyy-MM-dd')
          const startDate = new Date(value)
          const nextDate = add(startDate, {days: 1})
          const formattedNextDate = format(nextDate, 'yyyy-MM-dd')

          return `${id}>=${filterDate},${id}<${formattedNextDate}`
        }

        if (
          id === 'healthScore_equipmentScore' ||
          id === 'healthScore_telemetryScore' ||
          id === 'healthScore_oilAnalysisScore' ||
          id === 'healthScore_backlogScore'
        ) {
          return `${transformSortId(id)}String@=${value}`
        }

        if (
          id === 'average' ||
          id === 'lastValue' ||
          id === 'aging' ||
          id === 'priority' ||
          id === 'lastSmr'
        ) {
          return `${id}==${value}`
        }

        if (!operator) {
          return `${id}@=${value}`
        }

        return `${id}${filterOperators[operator]}${value}`
      },
    )
    .join(',')
}
