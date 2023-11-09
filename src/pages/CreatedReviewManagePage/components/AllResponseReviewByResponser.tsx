//NOTE - 작성자별 탭
import { useState } from 'react'
import { UserList, SearchBar } from '@/components'
import { Response } from '@/apis/hooks/useGetAllResponseByResponser'

const AllResponseReviewByResponser = ({ data }: Response) => {
  const { responserCount, responsers } = data
  const [keyword, setKeyword] = useState('')

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const filteredUsers = responsers?.filter((user) => {
    return user.name.includes(keyword)
  })

  return (
    <>
      <div>responsers : {responserCount}</div>
      <SearchBar handleChangeKeyword={handleChangeKeyword} />
      <UserList users={filteredUsers ?? []} />
    </>
  )
}

export default AllResponseReviewByResponser
