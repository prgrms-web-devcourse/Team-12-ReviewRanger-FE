import {
  ChangeEvent,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
} from 'react'
import { SubmitHandler, useFieldArray, useFormContext } from 'react-hook-form'
import { useToast } from '@/hooks'
import { Modal, SearchBar } from '@/components'
import { useUser } from '@/apis/hooks'
import { Question } from '@/types'
import { ReviewReplyStartType, User } from '../../types'
import ReceiverList from './ReceiverList'

interface ReceiverSelectProps {
  setReviewStep: Dispatch<SetStateAction<number>>
  questions: Question[]
}

const ReceiverSelect = ({ setReviewStep, questions }: ReceiverSelectProps) => {
  const [name, setName] = useState<string>('')
  const [filteredReceivers, setFilteredReceivers] = useState<User[]>([])
  const [filteredNonReceivers, setFilteredNonReceivers] = useState<User[]>([])
  const modalLabelRef = useRef<HTMLLabelElement>(null)
  const { data: user } = useUser()
  const { addToast } = useToast()

  const { control, setValue, handleSubmit } =
    useFormContext<ReviewReplyStartType>()

  const {
    fields: receivers,
    append: appendReceiver,
    remove: removeReceiver,
    replace: replaceReceiver,
  } = useFieldArray({ control, name: 'receiverList' })

  const {
    fields: nonReceivers,
    append: appendNonReceiver,
    remove: removeNonReceiver,
    replace: replaceNonReceiver,
  } = useFieldArray({ control, name: 'nonReceiverList' })

  const { append: appendReplyTarget } = useFieldArray({
    control,
    name: 'replyTargets',
  })

  useEffect(() => {
    setFilteredReceivers(
      receivers.filter((receiver) => receiver.name.includes(name)),
    )
    setFilteredNonReceivers(
      nonReceivers.filter((nonReceiver) => nonReceiver.name.includes(name)),
    )
  }, [name, receivers, nonReceivers])

  const handleInputFocus = () => {
    setValue(
      'nonReceiverList',
      nonReceivers.sort((a, b) => a.receiverId - b.receiverId),
    )
  }

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value)
  }

  const handleResetName = () => {
    setName('')
  }

  const handleReceiver = {
    selectAll: (receivers: User[]) => {
      replaceReceiver([])
      appendNonReceiver(receivers)
    },
    select: (receiver: User) => {
      const receiverIndex = receivers.findIndex((target) => target === receiver)
      appendNonReceiver(receiver)
      removeReceiver(receiverIndex)
    },
  }

  const handleNonReceiver = {
    selectAll: (nonReceivers: User[]) => {
      replaceNonReceiver([])
      appendReceiver(nonReceivers)
    },
    select: (nonReceiver: User) => {
      const nonReceiverIndex = nonReceivers.findIndex(
        (target) => target === nonReceiver,
      )
      appendReceiver(nonReceiver)
      removeNonReceiver(nonReceiverIndex)
    },
  }

  const completeReceiverSelect = () => {
    receivers.forEach(({ receiverId }) => {
      const replyTarget = {
        receiverId: receiverId,
        responserId: user?.id as number,
        replies: questions
          .map(({ id, type, isRequired, questionOptions }) => {
            const reply = {
              questionId: id,
              isRequired,
              answerText: type === 'SUBJECTIVE' ? '' : null,
              answerChoice: [
                'SINGLE_CHOICE',
                'MULTIPLE_CHOICE',
                'DROPDOWN',
              ].includes(type)
                ? 0
                : null,
              answerRating: type === 'RATING' ? 0 : null,
              answerHexa: type === 'HEXASTAT' ? 0 : null,
            }
            if (type === 'HEXASTAT') {
              return Array.from({ length: 6 }, (_, index) =>
                structuredClone({
                  ...reply,
                  answerChoice: questionOptions[index].optionId,
                }),
              )
            }

            return [reply]
          })
          .flat(),
      }
      appendReplyTarget(replyTarget)
    })

    setValue(
      'replyComplete',
      receivers.map(({ receiverId }) => {
        return {
          receiverId,
          complete: Array(questions.length).fill(false),
        }
      }),
    )

    setReviewStep(2)
  }

  const onSubmit: SubmitHandler<ReviewReplyStartType> = () => {
    if (!receivers.length) {
      addToast({ message: '수신자를 한 명 이상 선택하세요.', type: 'error' })

      return
    }

    if (modalLabelRef.current) {
      modalLabelRef.current.click()
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full flex-col justify-between gap-3 pt-2.5"
      >
        <div className="mt-4 flex flex-col gap-3 text-sm md:text-lg">
          <div className="w-fit rounded-md border border-sub-orange bg-white px-2 py-0.5 dark:border-sub-yellow dark:bg-main-red-200">
            <h1 className="text-sm text-sub-orange dark:text-sub-yellow md:text-base">
              수신자 선택
            </h1>
          </div>
          <SearchBar
            keyword={name}
            placeholder="수신자 이름을 입력해주세요."
            onFocus={handleInputFocus}
            handleChangeKeyword={handleChangeName}
            handleResetKeyword={handleResetName}
            tabIndex={0}
          />
          <ReceiverList
            receiverList={filteredReceivers}
            selected={true}
            handleSelectAllReceivers={handleReceiver.selectAll}
            handleSelectReceiver={handleReceiver.select}
          />
          <ReceiverList
            receiverList={filteredNonReceivers}
            handleSelectAllReceivers={handleNonReceiver.selectAll}
            handleSelectReceiver={handleNonReceiver.select}
          />
        </div>

        <div className="mt-2 flex justify-center md:justify-end">
          <button className="mb-5 h-10 w-full rounded-md bg-active-orange text-lg text-white hover:border hover:border-black disabled:bg-opacity-50 dark:text-black md:w-52 md:text-xl">
            리뷰 시작하기
          </button>
        </div>
      </form>
      <label htmlFor="select-receiver" ref={modalLabelRef}></label>
      <Modal
        modalId="select-receiver"
        content={`선택하신 수신자는 이후 변경할 수 없습니다.\n\n리뷰 대상자를 총 ${receivers.length}명 고르셨습니다.`}
        label="확인"
        handleClickLabel={completeReceiverSelect}
      />
    </>
  )
}

export default ReceiverSelect
