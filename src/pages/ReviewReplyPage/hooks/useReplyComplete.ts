import { useState, useEffect, useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { Receiver } from '@/types'
import { ReviewReplyEditType } from '../types'

interface UseReplyCompleteProps {
  receivers: Receiver[]
  selectedReceiverIndex: number
  editPage?: boolean
}

const useReplyComplete = ({
  receivers,
  selectedReceiverIndex,
  editPage = false,
}: UseReplyCompleteProps) => {
  const [individualReplyCompletes, setIndividualReplyCompletes] = useState<
    boolean[]
  >(Array(receivers.length).fill(editPage))
  const [allReplyComplete, setAllReplyComplete] = useState<boolean>(editPage)
  const { getValues } = useFormContext<ReviewReplyEditType>()

  const checkReplyComplete = useCallback(() => {
    const checkIndividualReplyComplete = getValues(
      `replyComplete.${selectedReceiverIndex}.complete`,
    ).every((value) => value)

    setIndividualReplyCompletes((individualReplyCompletes) =>
      individualReplyCompletes.map((status, index) =>
        index === selectedReceiverIndex ? checkIndividualReplyComplete : status,
      ),
    )
  }, [getValues, selectedReceiverIndex])

  useEffect(() => {
    setAllReplyComplete(individualReplyCompletes.every((value) => value))
  }, [individualReplyCompletes])

  return {
    individualReplyCompletes,
    allReplyComplete,
    checkReplyComplete,
  }
}

export default useReplyComplete
