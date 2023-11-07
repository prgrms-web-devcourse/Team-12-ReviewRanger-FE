/* eslint-disable @typescript-eslint/no-explicit-any */
type DebounceUtil = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
) => (...args: any) => void

export const debounce: DebounceUtil = (func, delay) => {
  let timeOutId: NodeJS.Timeout | null = null

  return (...args) => {
    if (timeOutId) {
      clearTimeout(timeOutId)
    }
    timeOutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}
