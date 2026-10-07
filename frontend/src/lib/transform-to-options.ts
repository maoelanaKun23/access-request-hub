type TransformDataToOptions = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  data: any[]
  labelKey: string
  valueKey: string
}

interface Options {
  label: string
  value: string
}

export const transformDataToOptions = ({
  data,
  labelKey,
  valueKey,
}: TransformDataToOptions): Options[] => {
  return data.map(item => {
    return {
      label: String(item[labelKey]),
      value: String(item[valueKey]),
    }
  })
}
