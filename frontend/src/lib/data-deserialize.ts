import Jsona from 'jsona'
import type {TJsonApiBody} from 'jsona/lib/JsonaTypes'

const dataFormatter = new Jsona()

export default function dataDeserialize({
  rowData,
  infinite = false,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
}: {rowData: any | TJsonApiBody; infinite?: boolean}) {
  if (infinite) {
    return (
      rowData.pages
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        .flatMap((page: any) => {
          return {data: dataFormatter.deserialize(page), meta: page.meta}
        })
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        .flatMap((page: any) => {
          return page.data
        })
    )
  }

  const data = dataFormatter.deserialize(rowData)
  return {
    data,
    meta: rowData?.meta,
  }
}
