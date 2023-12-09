import { useState } from 'react'

interface Receiver {
  id: string
  name: string
  responserCount?: number
  isAnswered?: boolean
  submitAt?: string
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

  const [sortState, setSortState] = useState(false)

  const sortByName = () => {
    if (sortState) {
      setFilteredUsers(
        () => [...filteredUsers]?.sort((a, b) => a.name.localeCompare(b.name)),
      )
    } else {
      setFilteredUsers(
        () => [...filteredUsers]?.sort((a, b) => b.name.localeCompare(a.name)),
      )
    }
    setSortState((prevState) => !prevState)
  }

  const sortByResponse = () => {
    setFilteredUsers(
      () =>
        [...filteredUsers]?.sort(
          (a, b) => Number(a.isAnswered) - Number(b.isAnswered),
        ),
    )
  }

  const sortByNoResponse = () => {
    setFilteredUsers(
      () =>
        [...filteredUsers]?.sort(
          (a, b) => Number(b.isAnswered) - Number(a.isAnswered),
        ),
    )
  }

  const [filteredUsers, setFilteredUsers] = useState(
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
    setFilteredUsers,
    findUserBySearchKeyword,
    selectedUser,
    handleChangeKeyword,
    setSelectedUser,
    sortByName,
    sortByNoResponse,
    sortByResponse,
  }
}

export default useResponseByReviewUser
