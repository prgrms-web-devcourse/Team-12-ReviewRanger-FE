import { useState } from 'react'

interface Receiver {
  id: string
  name: string
  responserCount: number
}

const useResponseByReviewUser = ({ users }: { users: Receiver[] }) => {
  const [userSearchKeyword, setUserSearchKeyword] = useState<string>('')
  const [selectedUser, setSelectedUser] = useState<{
    id: string
    name: string
  }>({
    id: '',
    name: '',
  })

  const [filteredUsers] = useState(
    users?.sort((a, b) => a?.name?.localeCompare(b?.name)),
  )

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserSearchKeyword(e.target.value)
  }

  const findUserBySearchKeyword = filteredUsers
    ?.map((value) => value)
    ?.filter((user) => user.name?.trim().includes(userSearchKeyword))

  return {
    filteredUsers,
    findUserBySearchKeyword,
    selectedUser,
    handleChangeKeyword,
    setSelectedUser,
  }
}

export default useResponseByReviewUser
