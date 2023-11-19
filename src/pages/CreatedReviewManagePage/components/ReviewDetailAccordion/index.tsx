import { useGetReviewQuestion, useGetResponseByReceiver } from '@/apis/hooks'
import { CloseDropDownIcon } from '@/assets/icons'
import { ProfileGroup, QuestionGroup } from '../../components'
import { getAnswer } from '../../utils'

interface ReviewDetailAccordionProps {
  receiverId: string
  receiverName: string
  reviewId: string
}

const ReviewDetailAccordion = ({
  receiverId,
  reviewId,
  receiverName,
}: ReviewDetailAccordionProps) => {
  //NOTE - 하나라도 응답 실패했을 떄 처리
  const { data: getReviewQuestion } = useGetReviewQuestion({
    id: reviewId,
  }).data

  const { data: responseByReceiver } = useGetResponseByReceiver({
    receiverId,
  }).data

  //NOTE - 전체 몇 명이 응답했는지 여부
  const responserCount = new Set(
    responseByReceiver?.map((data) => data?.responser?.id.toString()),
  )

  //NOTE - 저장시 POST로 넘길 데이터!. 이곳에 위치시키는 게 맞을까.....
  const saveFinalReviewResult = {
    userId: receiverId,
    userName: receiverName,
    reviewId,
    reviewTitle: getReviewQuestion?.title,
    reviewDescription: getReviewQuestion?.description,
    replies: getReviewQuestion?.questions?.map((question) => {
      return {
        questionId: question.id,
        questionTitle: question.title,
        questionType: question.type,
        answers: [
          question.type !== 'HEXASTAT'
            ? getAnswer(question?.type, question?.id, responseByReceiver)?.map(
                (value) => value.value,
              )
            : getAnswer(question?.type, question?.id, responseByReceiver)?.map(
                (value) => {
                  if ('name' in value)
                    return {
                      statName: value?.name,
                      statScore: value.value,
                    }
                },
              ),
        ],
      }
    }),
  }

  console.log(saveFinalReviewResult)

  return (
    <>
      <label htmlFor="drawer" className="overlay"></label>
      <div className="drawer drawer-bottom m-0 flex h-4/5 w-full  flex-col items-center gap-10 overflow-auto bg-main-ivory dark:bg-main-red-100 md:h-[32rem]">
        <div className="sticky top-0 z-50 flex h-[30px] w-full shrink-0 flex-col items-center justify-center bg-main-yellow dark:bg-main-red-200 sm:h-[40px]">
          <label htmlFor="drawer-bottom">
            <CloseDropDownIcon className="cursor-pointer fill-black stroke-black text-black dark:fill-white dark:stroke-white dark:text-white" />
          </label>
        </div>
        <div className="accordion-group m-0 mb-[10px] flex w-[21.875rem] max-w-[550px] flex-col gap-10 md:w-[34.375rem]">
          <ProfileGroup
            name={receiverName}
            responserSize={responserCount?.size}
          />
          {getReviewQuestion?.questions?.map((question) => (
            <QuestionGroup
              questionType={question?.type}
              questionTitle={question?.title}
              key={question?.id}
              answers={getAnswer(
                question?.type,
                question?.id,
                responseByReceiver,
              )}
            />
          ))}
          <div className="flex h-auto justify-end">
            <button className="btn h-[40px] w-[100px] rounded-md bg-active-orange p-0 text-lg text-white dark:text-black">
              미리 보기
            </button>
            <button className="btn h-[40px] w-[100px] rounded-md bg-active-orange p-0 text-lg text-white dark:text-black">
              저장 하기
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReviewDetailAccordion
