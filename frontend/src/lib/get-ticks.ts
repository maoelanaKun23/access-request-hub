export const getTicks = (step: number, maxValue: number) => {
  return Array.from(
    {length: Math.ceil(maxValue / step) + 1},
    (_, i) => i * step,
  )
}
