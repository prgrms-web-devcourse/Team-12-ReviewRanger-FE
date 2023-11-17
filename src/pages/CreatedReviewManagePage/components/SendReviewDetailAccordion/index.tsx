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
}

export default SendReviewDetailAccordion
