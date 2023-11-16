import {
  ChangeEvent,
  useEffect,
  useState,
  MouseEvent,
  Dispatch,
  SetStateAction,
} from 'react'
import { Profile, SearchBar } from '@/components'
import { Data, Receiver } from '@/apis/hooks/useGetReviewFirst'
import { CloseIcon } from '@/assets/icons'

interface ReceiverSelectProps {
  setReviewStep: Dispatch<SetStateAction<number>>
  reviewData: Data
  selectedReceivers: Receiver[]
  setSelectedReceivers: Dispatch<SetStateAction<Receiver[]>>
}

const ReceiverSelect = ({
  setReviewStep,
  reviewData,
  selectedReceivers,
  setSelectedReceivers,
}: ReceiverSelectProps) => {
  const [receiverList, setReceiverList] = useState<Receiver[]>([])
  const [focus, setFocus] = useState<boolean>(false)
  const [name, setName] = useState<string>('')

  const { receivers, description } = reviewData

  useEffect(() => {
    setReceiverList(receivers)
  }, [receivers])

  const handleInputFocus = () => {
    setFocus(true)
  }

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }

  const handleResetName = () => {
    setName('')
  }

  const handleClickSelectReceiver = (e: MouseEvent<HTMLLIElement>) => {
    const selectedTarget = receivers.find(
      (receiver) => receiver.name === e.currentTarget.innerText,
    )

    if (!selectedTarget) {
      return
    }

    setSelectedReceivers([...selectedReceivers, selectedTarget])
    setReceiverList(
      receiverList.filter((receiver) => receiver.name !== selectedTarget.name),
    )
    setName('')
    setFocus(false)
  }

  const handleClickSelectCancel = (e: MouseEvent<SVGSVGElement>) => {
    const canceledReceiverName = e.currentTarget.parentElement?.innerText
    const canceledReceiver = selectedReceivers.find(
      (selectedReceiver) => selectedReceiver.name === canceledReceiverName,
    )

    if (!canceledReceiver) {
      return
    }

    setReceiverList(
      [...receiverList, canceledReceiver].sort((a, b) => a.id - b.id),
    )
    setSelectedReceivers(
      selectedReceivers.filter(
        (selectedReceiver) => selectedReceiver != canceledReceiver,
      ),
    )
  }

  const handleClickReviewStart = () => {
    setReviewStep(2)
  }

  return (
    <div className="flex h-full flex-col justify-between pt-2.5">
      <div className="flex flex-col gap-5">
        <p className="text-sm dark:text-white md:text-lg">{description}</p>
        <div className="dropdown relative w-full">
          <SearchBar
            keyword={name}
            placeholder="응답자 이름을 입력해주세요."
            onFocus={handleInputFocus}
            handleChangeKeyword={handleChangeName}
            handleResetKeyword={handleResetName}
            tabIndex={0}
          />
          {focus && (
            <ul className="dropdown-menu absolute flex max-h-[252px] w-full flex-col overflow-y-auto rounded-none border border-t-0 bg-white p-0 dark:bg-main-gray md:max-h-[258px]">
              {receiverList.length > 0 ? (
                receiverList
                  .filter((receiver) => receiver.name.includes(name))
                  .map(({ id, name }, index) => (
                    <li
                      onClick={handleClickSelectReceiver}
                      key={id}
                      className={`${index !== 0 && 'border-t'} ${
                        index != receiverList.length - 1 && 'border-b'
                      } border-gray-400 px-2.5 py-2.5 hover:bg-main-ivory dark:border-gray-300 dark:hover:bg-gray-300`}
                    >
                      <Profile name={name} />
                    </li>
                  ))
              ) : (
                <p className="text-md flex h-[252px] items-center justify-center">
                  더 이상 선택할 수 있는 유저가 없습니다.
                </p>
              )}
            </ul>
          )}
        </div>
        <div className="h-80 overflow-auto rounded-md border bg-main-yellow p-2.5 dark:bg-main-red-200">
          <ul className="flex flex-wrap justify-start gap-2.5">
            {selectedReceivers.map(({ id, name }) => (
              <li
                key={id}
                className="flex h-fit w-fit items-center justify-center gap-2 rounded-md border bg-white px-2 py-1.5 dark:bg-main-gray"
              >
                <Profile name={name} />
                <CloseIcon
                  onClick={handleClickSelectCancel}
                  className="h-4 w-4 cursor-pointer dark:fill-white"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-center md:justify-end">
        <button
          onClick={handleClickReviewStart}
          className="mb-5 h-10 w-full rounded-md bg-active-orange text-lg text-white hover:border hover:border-black disabled:bg-opacity-50 dark:text-black md:w-52 md:text-xl"
        >
          리뷰 시작하기
        </button>
      </div>
    </div>
  )
}

export default ReceiverSelect
