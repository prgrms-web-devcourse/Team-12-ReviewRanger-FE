import { useState } from 'react'
import { STAR_CONSTANT } from '@/hooks/useStarRate/constants'

export const useStarRate = () => {
  const { FIRST, END } = STAR_CONSTANT
  const [rates, setRates] = useState<boolean[]>(Array(END).fill(false))

  const handleClickStar = (index: number) => {
    const newRateArr = [...rates]
    for (let i = FIRST; i < END; i++) {
      newRateArr[i] = i <= index
    }
    setRates(newRateArr)
  }

  return {
    handleClickStar,
    score: rates.filter((value) => value).length,
    rates,
  }
}
