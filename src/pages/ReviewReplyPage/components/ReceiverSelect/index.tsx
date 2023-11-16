import { ChangeEvent, useState, Dispatch, SetStateAction } from 'react'
import { SubmitHandler, useFieldArray, useFormContext } from 'react-hook-form'
import { Profile, SearchBar } from '@/components'
import { Question } from '@/apis/hooks/useGetReviewFirst'
import { CloseIcon } from '@/assets/icons'
import { ReviewReplyType } from '../../types'

interface ReceiverSelectProps {
  setReviewStep: Dispatch<SetStateAction<number>>
  questions: Question[]
}

// TODO: 지울 예정
const userId = 812

const ReceiverSelect = ({ setReviewStep, questions }: ReceiverSelectProps) => {
  const [focus, setFocus] = useState<boolean>(false)
  const [name, setName] = useState<string>('')

  const {
    control,
    setError,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useFormContext<ReviewReplyType>()

  const {
    fields: receivers,
    append: appendReceiver,
    remove: removeReceiver,
  } = useFieldArray({ control, name: 'receiverList' })

  const {
    fields: nonReceivers,
    append: appendNonReceiver,
    remove: removeNonReceiver,
  } = useFieldArray({ control, name: 'nonReceiverList' })

  const { append: appendReplyTarget } = useFieldArray({
    control,
    name: 'replyTargets',
  })

  const onSubmit: SubmitHandler<ReviewReplyType> = () => {
    if (!receivers.length) {
      setError('receiverList', {
        type: 'required',
        message: '대상자를 선택해주세요.',
      })

      return
    }

    receivers.map(({ receiverId }) => {
      const replyTarget = {
        receiverId: receiverId,
        responserId: userId,
        replies: questions.map(({ id, type }) => {
          return {
            questionId: id,
            answerText: type === 'SUBJECTIVE' ? '' : null,
            answerChoice: [
              'MULTIPLE_CHOICE',
              'SINGLE_CHOICE',
              'DROPDOWN',
            ].includes(type)
              ? 0
              : null,
            answerRating: type === 'RATING' ? 0 : null,
            answerHexa: type === 'HEXASTAT' ? 0 : null,
          }
        }),
      }
      appendReplyTarget(replyTarget)
    })

    setReviewStep(2)
  }

  const handleInputFocus = () => {
    setValue(
      'nonReceiverList',
      nonReceivers.sort((a, b) => a.receiverId - b.receiverId),
    )
    setFocus(true)
  }

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }

  const handleResetName = () => {
    setName('')
  }

  return (
    <div className="flex h-full flex-col justify-between pt-2.5">
      <div className="flex flex-col gap-5">
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
              {nonReceivers.length > 0 ? (
                nonReceivers
                  .filter((nonReceiver) => nonReceiver.name.includes(name))
                  .map((nonReceiver, index) => (
                    <li
                      onClick={() => {
                        appendReceiver(nonReceiver)
                        removeNonReceiver(index)
                        clearErrors('receiverList')
                      }}
                      key={nonReceiver.id}
                      className={`${index !== 0 && 'border-t'} ${
                        index != nonReceivers.length - 1 && 'border-b'
                      } border-gray-400 px-2.5 py-2.5 hover:bg-main-ivory dark:border-gray-300 dark:hover:bg-gray-300`}
                    >
                      <Profile name={nonReceiver.name} />
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

        <div className="relative h-80 overflow-auto rounded-md border bg-main-yellow p-2.5 dark:bg-main-red-200">
          <ul className="flex flex-wrap justify-start gap-2.5">
            {receivers.map((receiver, index) => (
              <li
                key={receiver.id}
                className="flex h-fit w-fit items-center justify-center gap-2 rounded-md border bg-white px-2 py-1.5 dark:bg-main-gray"
              >
                <Profile name={receiver.name} />
                <CloseIcon
                  onClick={() => {
                    appendNonReceiver(receiver)
                    removeReceiver(index)
                  }}
                  className="h-4 w-4 cursor-pointer dark:fill-white"
                />
              </li>
            ))}
          </ul>
          {errors.receiverList && (
            <p className="absolute bottom-5 right-5 text-xs text-sub-red-200 dark:text-sub-yellow md:text-sm">
              {errors.receiverList.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-center md:justify-end">
        <button
          onClick={handleSubmit(onSubmit)}
          className="mb-5 h-10 w-full rounded-md bg-active-orange text-lg text-white hover:border hover:border-black disabled:bg-opacity-50 dark:text-black md:w-52 md:text-xl"
        >
          리뷰 시작하기
        </button>
      </div>
    </div>
  )
}

export default ReceiverSelect
