import { useState, MouseEvent } from 'react'
import { Receiver } from '@/types'

interface UseHandleReceiverProps {
  receivers: Receiver[]
}

const useHandleReceiver = ({ receivers }: UseHandleReceiverProps) => {
  const [selectedReceiver, setSelectedReceiver] = useState<Receiver>(
    receivers[0],
  )
  const [selectedReceiverIndex, setSelectedReceiverIndex] = useState<number>(0)

  const handleClickReceiver = (e: MouseEvent<HTMLLIElement>) => {
    receivers.forEach((receiver, index) => {
      if (receiver.receiverId === e.currentTarget.value) {
        setSelectedReceiver(receiver)
        setSelectedReceiverIndex(index)
      }
    })
  }

  return {
    selectedReceiver,
    setSelectedReceiver,
    selectedReceiverIndex,
    setSelectedReceiverIndex,
    handleClickReceiver,
  }
}

export default useHandleReceiver
