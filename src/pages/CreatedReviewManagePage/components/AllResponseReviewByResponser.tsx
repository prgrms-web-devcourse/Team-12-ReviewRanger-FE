//NOTE - 작성자별 탭
import { UserList } from '@/components'
import { AllResponserResponse } from '@/apis/hooks/useGetAllRespnse'

const AllResponseReviewByResponser = ({
  responserCount,
  responsers,
}: Partial<AllResponserResponse>) => {
  return (
    <>
      <div>responsers : {responserCount}</div>
      <UserList users={responsers ?? []} />
    </>
  )
}

export default AllResponseReviewByResponser
