//NOTE - 작성자별 탭
import { Suspense } from 'react'
import { UserList, SearchBar } from '@/components'
import { useGetAllResponseByResponser } from '@/apis/hooks'
import {
  SortDropDown,
  NotFoundSearchUser,
  ResponserTabReviewDetail,
} from '../../components'
import { useResponseReviewByUser } from '../../hooks'

interface AllResponseReviewByResponser {
  reviewId: string
}

const AllResponseReviewByResponser = ({
  reviewId,
}: AllResponseReviewByResponser) => {
  const { data: responseByResponser } = useGetAllResponseByResponser({
    reviewId,
  }).data || { data: [] }
  const {
    filteredUsers,
    selectedUser,
    setSelectedUser,
    findUserBySearchKeyword,
    handleChangeKeyword,
    sortByName,
    sortByNoResponse,
    sortByResponse,
  } = useResponseReviewByUser({
    users: responseByResponser?.map((data) => {
      return {
        id: data.id,
        name: data.user.name,
        isAnswered: data.isAnswered,
        submitAt: data.submitAt,
      }
    }),
  })

  return (
    <div className="flex flex-col gap-5">
      <SearchBar
        handleChangeKeyword={handleChangeKeyword}
        className="flex w-full"
      />

      <div className="rounded-md border border-gray-200 bg-main-yellow text-black dark:border-gray-100 dark:bg-main-red-200 dark:text-white md:max-h-[24rem]">
        {findUserBySearchKeyword?.length ? (
          <>
            <header className="flex items-center whitespace-pre-wrap rounded-t-md border-b border-b-gray-100 bg-main-yellow p-3 text-xs dark:border-b-gray-200 dark:bg-main-red-200 md:text-base">
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
                submitAt={filteredUsers?.map((value) => value?.submitAt ?? '')}
                onClickUser={({ id, name }) => setSelectedUser({ id, name })}
              />
              <Suspense fallback={<div className="spinner" />}>
                {selectedUser.id && (
                  <ResponserTabReviewDetail
                    reviewId={reviewId}
                    responserId={selectedUser.id}
                    responserName={selectedUser.name}
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
