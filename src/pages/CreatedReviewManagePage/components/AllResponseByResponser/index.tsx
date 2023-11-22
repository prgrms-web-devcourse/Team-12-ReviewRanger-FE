//NOTE - 작성자별 탭
import { useState, Suspense } from 'react'
import { UserList, SearchBar } from '@/components'
import { useGetAllResponseByResponser } from '@/apis/hooks'
import {
  SortDropDown,
  NotFoundSearchUser,
  ReviewDetailAccordion,
} from '../../components'

const AllResponseReviewByResponser = ({ surveyId }: { surveyId: string }) => {
  const { data: responseByResponser } = useGetAllResponseByResponser({
    surveyId,
  }).data || { data: [] }
  const [keyword, setKeyword] = useState('')
  const [filteredUsers, setFilteredUsers] = useState(
    responseByResponser.sort((a, b) => a.user.name.localeCompare(b.user.name)),
  )
  //TODO - 기본 user의 ID가 필요함 빈 문자열로 설정 시 에러
  const [selectedUser, setSelectedUser] = useState<{
    id: string
    name: string
  }>({
    id: '',
    name: '',
  })

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const sortByName = () => {
    setFilteredUsers(
      () =>
        [...filteredUsers]?.sort((a, b) =>
          a.user.name.localeCompare(b.user.name),
        ),
    )
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

  const findUserBySearchKeyword = filteredUsers
    ?.map((value) => value.user)
    ?.filter((user) => user.name.trim().includes(keyword))

  return (
    <div className="flex flex-col gap-5">
      <SearchBar
        handleChangeKeyword={handleChangeKeyword}
        className="flex w-full"
      />

      <div className="rounded-md border border-gray-200 bg-main-yellow text-black dark:border-gray-100 dark:bg-main-red-200 dark:text-white md:max-h-[24rem]">
        {findUserBySearchKeyword?.length ? (
          <>
            <header className="flex items-center whitespace-pre-wrap rounded-t-md border-b border-b-gray-100 bg-main-yellow p-3 text-xs dark:border-b-gray-200 dark:bg-main-red-200 md:text-sm">
              <span>응답완료: </span>
              <span className="text-sub-blue dark:text-sub-skyblue">
                {
                  responseByResponser?.filter(
                    (value) => value.isAnswered === true,
                  ).length
                }
                /{responseByResponser?.length}명
              </span>
              <SortDropDown
                sortByName={sortByName}
                sortByNoResponse={sortByNoResponse}
                sortByResponse={sortByResponse}
              />
            </header>
            <div className="max-h-80 overflow-auto">
              <input
                type="checkbox"
                className="drawer-toggle"
                id="drawer-bottom"
              />
              <UserList
                hasDrawer
                users={findUserBySearchKeyword}
                submitAt={filteredUsers?.map((value) => value.submitAt)}
                onClickUser={({ id, name }) => setSelectedUser({ id, name })}
              />
              <Suspense fallback={<div className="spinner" />}>
                {selectedUser.id && (
                  <ReviewDetailAccordion
                    reviewId={surveyId}
                    receiverId={selectedUser.id}
                    receiverName={selectedUser.name}
                  />
                )}
              </Suspense>
            </div>
          </>
        ) : (
          <NotFoundSearchUser />
        )}
      </div>
    </div>
  )
}

export default AllResponseReviewByResponser
