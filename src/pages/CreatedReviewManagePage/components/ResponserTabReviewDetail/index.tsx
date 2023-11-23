import { useGetReviewQuestion, useGetResponseByResponser } from '@/apis/hooks'
import { CloseDropDownIcon } from '@/assets/icons'
import { SelectResponseUser, ProfileGroup } from '..'

interface ReviewDetailAccordionProps {
  reviewId: string
  responserName: string
  responserId: string
}

const ReceiverReviewDetail = ({
  responserName,
  reviewId,
  responserId,
}: ReviewDetailAccordionProps) => {
  //NOTE - 하나라도 응답 실패했을 떄 처리
  const { data: getReviewQuestion } = useGetReviewQuestion({
    id: reviewId,
  }).data
  console.log(getReviewQuestion)

  const { data: responseByReceiver } = useGetResponseByResponser({
    responserId,
    reviewId,
  }).data

  const getAllReceiverName = responseByReceiver?.map(
    (data) => data.receiver.name,
  )

  return (
    <>
      <label htmlFor="drawer" className="overlay"></label>
      <div className="drawer drawer-bottom m-0 flex h-4/5 w-full  flex-col items-center gap-10 overflow-auto bg-main-ivory dark:bg-main-red-100 md:h-[32rem]">
        <div className="sticky top-0 z-50 flex h-[30px] w-full shrink-0 flex-col items-center justify-center bg-main-yellow dark:bg-main-red-200 sm:h-[40px]">
          <label htmlFor="drawer-bottom">
            <CloseDropDownIcon className="h-[1rem] w-[1rem] cursor-pointer fill-black stroke-black text-black dark:fill-white dark:stroke-white dark:text-white md:h-[1.25rem] md:w-[1.25rem]" />
          </label>
        </div>
        <div className="accordion-group m-0 mb-[10px] flex w-[21.875rem] max-w-[550px] flex-col gap-10 md:w-[34.375rem]">
          <ProfileGroup name={responserName} type="responser" />
        </div>
        <SelectResponseUser allUser={getAllReceiverName} />
      </div>
    </>
  )
}

export default ReceiverReviewDetail
