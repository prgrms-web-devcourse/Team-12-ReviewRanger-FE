//NOTE - 수신자 탭
import { useState } from 'react'
import { UserList, SearchBar } from '@/components'
import { ResponseByReceiver } from '@/apis/hooks/useGetAllResponseByReceiver'

const AllResponseReviewByResponser = ({ data }: ResponseByReceiver) => {
  const [keyword, setKeyword] = useState('')

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const filteredUsers = data.receiverResponses.filter((user) => {
    return user.receiverName.includes(keyword)
  })

  return (
    <>
      <SearchBar handleChangeKeyword={handleChangeKeyword} />
      <UserList users={filteredUsers} />
    </>
  )
}

export default AllResponseReviewByResponser
