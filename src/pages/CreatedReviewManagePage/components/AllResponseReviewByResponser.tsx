//NOTE - 작성자별 탭
import { useState } from 'react'
import { UserList, SearchBar } from '@/components'

import { AllResponserResponse } from '@/apis/hooks/useGetAllRespnse'

const AllResponseReviewByResponser = ({
  responserCount,
  responsers,
}: Partial<AllResponserResponse>) => {
  const [keyword, setKeyword] = useState('')

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const filteredUsers = responsers?.filter((user) => {
    return user.responserName.includes(keyword)
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
