import {
  useState,
  useEffect,
  MouseEvent,
  ReactNode,
  useCallback,
  useMemo,
} from 'react'
import { useFormContext } from 'react-hook-form'
import { Profile } from '@/components'
import { Data, Receiver } from '@/apis/hooks/useGetReviewFirst'
import { CheckInTheCircleIcon } from '@/assets/icons'
import { ReviewReplyType } from '../../types'
import Questions from '../Questions'

interface ReviewReplyProps {
  reviewData: Data
  handleSubmit: () => void
}

const ReviewReply = ({ reviewData, handleSubmit }: ReviewReplyProps) => {
  const { getValues, setValue } = useFormContext<ReviewReplyType>()
  const receivers = useMemo(() => getValues('receiverList'), [getValues])
  const questions = reviewData.questions

  // NOTE: 현재 선택한 수신자 상태값을 관리
  const [selectedReceiver, setSelectedReceiver] = useState<Receiver>(
    receivers[0],
  )
  // NOTE: 현재 선택한 수신자의 인덱스 상태값을 관리
  const [selectedReceiverIndex, setSelectedReceiverIndex] = useState<number>(0)
  // NOTE: 현재 선택한 질문의 인덱스 상태값을 관리
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number>(0)
  // NOTE: 수신자별로 답변완료를 체크하는 상태값을 관리
  const [individualReplyCompletes, setIndividualReplyCompletes] = useState<
    boolean[]
  >(Array(receivers.length).fill(false))
  const [allReplyComplete, setAllReplyComplete] = useState<boolean>(false)

  // NOTE: 질문 컴포넌트들을 배열로 생성
  const questionArray = questions.map((question, index) => (
    <Questions
      question={question}
      questionIndex={index}
      receiverIndex={selectedReceiverIndex}
    />
  ))

  // NOTE: 개별 답변 완료 여부를 체크하는 함수
  const checkReplyComplete = useCallback(async () => {
    const checkIndividualReplyComplete = getValues(
      `replyComplete.${selectedReceiverIndex}.complete`,
    ).every((value) => value)

    setIndividualReplyCompletes((individualReplyCompletes) =>
      individualReplyCompletes.map((status, index) =>
        index === selectedReceiverIndex ? checkIndividualReplyComplete : status,
      ),
    )
  }, [selectedReceiverIndex, getValues])

  // NOTE: 모든 수신자들의 답변을 완료했는지 여부를 체크
  useEffect(() => {
    setAllReplyComplete(individualReplyCompletes.every((value) => value))
  }, [individualReplyCompletes])

  // NOTE: 수신자를 클릭했을 때 이벤트 핸들러
  const handleClickReceiver = (e: MouseEvent<HTMLLIElement>) => {
    receivers.forEach((receiver, index) => {
      if (receiver.receiverId === e.currentTarget.value) {
        setSelectedReceiver(receiver)
        setSelectedReceiverIndex(index)
        checkReplyComplete()
      }
    })
  }

  // NOTE: 질문을 클릭했을 때 이벤트 핸들러
  const handleClickQuestion = (e: MouseEvent<HTMLLIElement>) => {
    const selectedTarget = questions.findIndex(
      (question) => question.id === e.currentTarget.value,
    )

    // NOTE: 필수 질문이 아닐 때는 답변 완료처리하기.
    if (!questions[selectedTarget].isRequired) {
      setValue(
        `replyComplete.${selectedReceiverIndex}.complete.${selectedTarget}`,
        true,
      )
    }

    setSelectedQuestionIndex(selectedTarget)
    checkReplyComplete()
  }

  // NOTE: 다음 버튼을 클릭할 때 이벤트 핸들러
  const handleClickNextButton = () => {
    checkReplyComplete()

    // NOTE: 현재 질문이 마지막 질문이 아닐 경우, 다음 질문으로 이동.
    if (selectedQuestionIndex < questions.length - 1) {
      setSelectedQuestionIndex((prevQuestion) => prevQuestion + 1)

      return
    }

    // NOTE: 현재 수신자가 마지막 수신자가 아닐 경우, 다음 수신자로 이동.
    if (selectedReceiverIndex < receivers.length - 1) {
      const nextReceiver = receivers.find(
        (_, index) => index === selectedReceiverIndex + 1,
      )

      if (!nextReceiver) {
        return
      }

      setSelectedReceiver(nextReceiver)
      setSelectedReceiverIndex((prevReceiver) => prevReceiver + 1)
    } else {
      // NOTE: 마지막 수신자일 경우 첫 번째 수신자로 이동.
      const firstReceiver = receivers[0]

      setSelectedReceiver(firstReceiver)
      setSelectedReceiverIndex(0)
    }
    // NOTE: 첫 번째 질문으로 이동.
    setSelectedQuestionIndex(0)
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex flex-col gap-8 pt-2.5">
        <h3 className="text-sm text-gray-300 dark:text-gray-400">{`응답자: ${selectedReceiver.name}`}</h3>
        <div className="flex flex-col gap-5">
          <ul className="flex gap-2.5 overflow-x-auto">
            {receivers.map(({ receiverId, name }, index) => (
              <li
                value={receiverId}
                key={receiverId}
                onClick={handleClickReceiver}
                className={`flex h-fit shrink-0 items-center justify-center gap-2 rounded-md border px-2 
              py-1.5
              ${
                selectedReceiver.receiverId === receiverId
                  ? 'border-black bg-main-yellow dark:border-white dark:bg-main-red-300'
                  : 'border-gray-100 bg-white dark:border-gray-300 dark:bg-main-red-200'
              } ${individualReplyCompletes[index] && 'border-sub-green'}`}
              >
                <Profile
                  name={name}
                  className={`${
                    selectedReceiver.name === name
                      ? 'text-black dark:text-white'
                      : 'text-gray-300 dark:text-gray-100'
                  }`}
                />
                <div className="h-4 w-4">
                  {individualReplyCompletes[index] && (
                    <CheckInTheCircleIcon className="h-4 w-4 fill-sub-green" />
                  )}
                </div>
              </li>
            ))}
          </ul>
          <ul className="flex gap-5 overflow-x-auto">
            {questions.map((question, index) => {
              const complete = getValues(
                `replyComplete.${selectedReceiverIndex}.complete.${index}`,
              )

              return (
                <li
                  value={question.id}
                  onClick={handleClickQuestion}
                  key={question.id}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm ${
                    index === selectedQuestionIndex
                      ? 'border-black bg-main-hover-yellow text-black dark:border-white dark:bg-main-red-300 dark:text-white'
                      : 'border-gray-100 bg-white text-gray-300 dark:border-gray-300 dark:bg-main-red-200 dark:text-gray-100'
                  } ${complete && 'border-sub-green dark:border-sub-green'}`}
                >
                  {index + 1}
                </li>
              )
            })}
          </ul>
        </div>
        {questionArray[selectedQuestionIndex] as ReactNode}
      </div>
      <div className="flex justify-center md:justify-end">
        {allReplyComplete ? (
          <button
            onClick={handleSubmit}
            className="mb-5 h-10 w-full rounded-md bg-active-orange text-lg text-white hover:border hover:border-black disabled:bg-opacity-50 dark:text-black md:w-52 md:text-xl"
          >
            답변 제출하기
          </button>
        ) : (
          <button
            onClick={handleClickNextButton}
            className="mb-5 h-10 w-full rounded-md bg-active-orange text-lg text-white hover:border hover:border-black disabled:bg-opacity-50 dark:text-black md:w-52 md:text-xl"
          >
            다음
          </button>
        )}
      </div>
    </div>
  )
}

export default ReviewReply
