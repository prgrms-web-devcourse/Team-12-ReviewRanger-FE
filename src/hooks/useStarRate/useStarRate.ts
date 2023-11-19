import { useState } from 'react'
import { STAR_CONSTANT } from '@/hooks/useStarRate/constants'

export const useStarRate = (initRate?: number, fixed?: boolean) => {
  const { FIRST, END } = STAR_CONSTANT
  const [rates, setRates] = useState<boolean[]>(Array(initRate).fill(false))

  const changeStar = (index: number) => {
    const newRateArr = [...rates]
    for (let i = FIRST; i < END; i++) {
      newRateArr[i] = i <= index
    }
    if (fixed) {
      return
    }
    setRates(newRateArr)
  }

  return {
    changeStar,
    setRates,
    score: rates.filter((value) => value).length,
    rates,
  }
}
