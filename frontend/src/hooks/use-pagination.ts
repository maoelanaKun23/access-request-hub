import type {ReactEventHandler} from 'react'

export interface UsePaginationProps {
  /**
   * Number of always visible pages at the beginning and end.
   * @default 1
   */
  boundaryCount?: number
  /**
   * The total number of pages.
   * @default 1
   */
  count?: number
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean
  /**
   * If `true`, hide the next-page button.
   * @default false
   */
  hideNextButton?: boolean
  /**
   * If `true`, hide the previous-page button.
   * @default false
   */
  hidePrevButton?: boolean
  /**
   * The current page. Unlike `TablePagination`, which starts numbering from `0`, this pagination starts from `1`.
   */
  page?: number
  /**
   * If `true`, show the first-page button.
   * @default false
   */
  showFirstButton?: boolean
  /**
   * If `true`, show the last-page button.
   * @default false
   */
  showLastButton?: boolean
  /**
   * Number of always visible pages before and after the current page.
   * @default 1
   */
  siblingCount?: number
}

export interface PaginationItem {
  onClick: ReactEventHandler
  type:
    | 'page'
    | 'first'
    | 'last'
    | 'next'
    | 'previous'
    | 'start-ellipsis'
    | 'end-ellipsis'
  page: number | null
  selected: boolean
  disabled: boolean
}

export function usePagination({
  boundaryCount = 1,
  count = 1,
  disabled = false,
  hideNextButton = false,
  hidePrevButton = false,
  page = 1,
  showFirstButton = false,
  showLastButton = false,
  siblingCount = 1,
  ...other
}: UsePaginationProps = {}) {
  const range = (start: number, end: number) => {
    const length = end - start + 1
    return Array.from({length}, (_, i) => start + i)
  }

  const startPages = range(1, Math.min(boundaryCount, count))
  const endPages = range(
    Math.max(count - boundaryCount + 1, boundaryCount + 1),
    count,
  )

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      page - siblingCount,
      // Lower boundary when page is high
      count - boundaryCount - siblingCount * 2 - 1,
    ),
    // Greater than startPages
    boundaryCount + 2,
  )

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      page + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2,
    ),
    // Less than endPages
    count - boundaryCount - 1,
  )

  // Basic list of items to render
  // for example itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
  const itemList = [
    ...(showFirstButton ? ['first' as const] : []),
    ...(hidePrevButton ? [] : ['previous' as const]),
    ...startPages,

    // Start ellipsis

    ...(siblingsStart > boundaryCount + 2
      ? ['start-ellipsis' as const]
      : boundaryCount + 1 < count - boundaryCount
        ? [boundaryCount + 1]
        : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis

    ...(siblingsEnd < count - boundaryCount - 1
      ? ['end-ellipsis' as const]
      : count - boundaryCount > boundaryCount
        ? [count - boundaryCount]
        : []),

    ...endPages,
    ...(hideNextButton ? [] : ['next' as const]),
    ...(showLastButton ? ['last' as const] : []),
  ]

  // Map the button type to its page number
  const buttonPage = (type: PaginationItem['type']) => {
    switch (type) {
      case 'first':
        return 1
      case 'previous':
        return page - 1
      case 'next':
        return page + 1
      case 'last':
        return count
      default:
        return null
    }
  }

  // Convert the basic item list to PaginationItem props objects
  const items = itemList.map(item => {
    return typeof item === 'number'
      ? {
          type: 'page' as const,
          page: item,
          selected: item === page,
          disabled,
          'aria-current': item === page ? 'true' : undefined,
        }
      : {
          type: item,
          page: buttonPage(item),
          selected: false,
          disabled:
            disabled ||
            (!item.includes('ellipsis') &&
              (item === 'next' || item === 'last' ? page >= count : page <= 1)),
        }
  })

  return {items, ...other}
}
