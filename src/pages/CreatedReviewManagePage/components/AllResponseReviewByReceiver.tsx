//NOTE - 수신자 탭
import { UserList } from '@/components'
import { AllReceiverResponse } from '@/apis/hooks/useGetAllRespnse'

const AllResponseReviewByResponser = ({
  recipientList,
}: AllReceiverResponse) => {
  return <UserList users={recipientList ?? []} />
}

export default AllResponseReviewByResponser
