//생성한 리뷰 관리 페이지
import { useSendReview } from '@/apis/hooks'

const CreatedReviewManagePage = () => {
  const { mutate: sendReview } = useSendReview()

  const handleButtonClick = () => {
    sendReview(
      { surveyId: 1, subjectIdList: [1, 2, 3] },
      {
        onSuccess: ({ data }) => {
          console.log(data)
        },
      },
    )
  }

  return (
    <>
      <h1>생성한 리뷰 관리 페이지</h1>
      <button className="btn" onClick={handleButtonClick} />
    </>
  )
}
export default CreatedReviewManagePage
