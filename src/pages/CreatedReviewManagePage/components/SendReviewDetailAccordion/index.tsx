import { useGetReviewQuestion, useGetResponseByResponser } from '@/apis/hooks'

//NOTE - 작성자별에서 들어갔을 떄

interface SendReviewDetailAccordionProps {
  reviewId: string
  id: string
}
const SendReviewDetailAccordion = ({
  reviewId,
  id,
}: SendReviewDetailAccordionProps) => {
  const { data: getReviewQuestion } = useGetReviewQuestion({
    id: reviewId,
  }).data
  const { data: getResponseByResponser } = useGetResponseByResponser({
    id,
  }).data

  //NOTE - 작성자별 상세 보기에서 나오는 부분 구현 필요
  console.log(getResponseByResponser, getReviewQuestion)
}

export default SendReviewDetailAccordion
