//NOTE - 수신자 탭
import { useState } from 'react'
import { UserList, SearchBar } from '@/components'

import { AllReceiverResponse } from '@/apis/hooks/useGetAllRespnse'

const AllResponseReviewByResponser = ({
  recipientList,
}: AllReceiverResponse) => {
  const [keyword, setKeyword] = useState('')

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const filteredUsers = recipientList.filter((user) => {
    return user.recipientName.includes(keyword)
  })

  return (
    <>
      <SearchBar handleChangeKeyword={handleChangeKeyword} />
      <UserList users={filteredUsers} />
    </>
  )
}

export default AllResponseReviewByResponser
