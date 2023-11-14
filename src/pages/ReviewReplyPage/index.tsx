import { ChangeEvent, useEffect, useState, MouseEvent } from 'react'
import { Header, Profile, SearchBar } from '@/components'
import { useGetReviewFirst } from '@/apis/hooks'
import { Receiver } from '@/apis/hooks/useGetReviewFirst'
import { CloseIcon } from '@/assets/icons'

const reviewId = 812

const ReviewReplyPage = () => {
  const [receivers, setReceivers] = useState<Receiver[]>([])
  const [focus, setFocus] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [selectedReceivers, setSelectedReceivers] = useState<Receiver[]>([])

  const { data, isSuccess } = useGetReviewFirst({ id: reviewId })
  const reviewData = data?.data

  useEffect(() => {
    reviewData && setReceivers(reviewData.receivers)
    console.log(reviewData)
  }, [reviewData])

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
    setReceivers(
      receivers.filter((receiver) => receiver.name !== selectedTarget.name),
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

    setReceivers([...receivers, canceledReceiver].sort((a, b) => a.id - b.id))
    setSelectedReceivers(
      selectedReceivers.filter(
        (selectedReceiver) => selectedReceiver != canceledReceiver,
      ),
    )
  }

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex h-full flex-col justify-between bg-main-ivory p-5 text-black dark:bg-main-red-100">
        {isSuccess && reviewData && (
          <div className="flex flex-col gap-5">
            <h1 className="text-lg dark:text-white">{reviewData.title}</h1>
            <p className="text-sm dark:text-white">{reviewData.description}</p>
            <div className="dropdown relative w-full">
              <SearchBar
                keyword={name}
                placeholder="응답자 이름을 입력해주세요."
                onFocus={handleInputFocus}
                handleChangeKeyword={handleChangeName}
                handleResetKeyword={handleResetName}
                className="rounded-b-none"
                tabIndex={0}
              />
              {focus && (
                <ul className="dropdown-menu absolute flex max-h-[252px] w-full flex-col overflow-y-auto rounded-none border border-t-0 bg-white p-0 dark:bg-main-gray">
                  {receivers.length > 0 ? (
                    receivers
                      .filter((receiver) => receiver.name.includes(name))
                      .map((receiver, index) => (
                        <li
                          onClick={handleClickSelectReceiver}
                          key={index}
                          className={`${index !== 0 && 'border-t'} ${
                            index != receivers.length - 1 && 'border-b'
                          } border-gray-400 px-2.5 py-2 hover:bg-main-ivory dark:border-gray-300 dark:hover:bg-gray-300`}
                        >
                          <Profile name={receiver.name} />
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
            <div className="h-80 rounded-md border bg-main-yellow p-2.5 dark:bg-main-red-200">
              <ul className="flex flex-wrap justify-start gap-2.5">
                {selectedReceivers.map(({ id, name }) => (
                  <li
                    key={id}
                    className="flex h-fit w-fit items-center justify-center gap-2 rounded-md border bg-white p-2 dark:bg-main-gray"
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
        )}
        <button className="mb-5 h-10 w-full rounded-md bg-active-orange text-lg text-white hover:border hover:border-black disabled:bg-opacity-50 dark:text-black md:text-xl">
          리뷰 시작하기
        </button>
      </div>
    </div>
  )
}

export default ReviewReplyPage
