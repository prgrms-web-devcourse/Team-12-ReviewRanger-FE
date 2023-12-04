//NOTE - 수신자별 탭

import { Suspense } from 'react'
import { UserList, SearchBar } from '@/components'
import { useGetAllResponseByReceiver } from '@/apis/hooks'
import { NotFoundSearchUser, ReceiverTabReviewDetail } from '../../components'
import { useResponseReviewByUser } from '../../hooks'

interface AllResponseReviewByResponseProps {
  reviewId: string
  ResponserList?: number[]
  questionOption?: 'PROCEEDING' | 'DEADLINE' | 'END'
}
const AllResponseReviewByResponser = ({
  reviewId,
  ResponserList,
  questionOption,
}: AllResponseReviewByResponseProps) => {
  const { data: responseByReceiver } = useGetAllResponseByReceiver({
    reviewId,
  }).data

  const {
    selectedUser,
    setSelectedUser,
    findUserBySearchKeyword,
    handleChangeKeyword,
  } = useResponseReviewByUser({
    users: responseByReceiver?.map((data) => {
      return {
        id: data.receiverId,
        name: data.receiverName,
        responserCount: data.responserCount,
      }
    }),
  })

  const shouldDisplayUserList =
    findUserBySearchKeyword?.length !== 0 || responseByReceiver?.length !== 0

  return (
    <div className="flex flex-col gap-5">
      <SearchBar handleChangeKeyword={handleChangeKeyword} />
      <div className="rounded-md border border-gray-200 bg-main-yellow text-black dark:border-gray-100 dark:bg-main-red-200 dark:text-white md:max-h-[24rem]">
        <header className="flex items-center whitespace-pre-wrap rounded-t-md border-b border-b-gray-100 bg-main-yellow p-3 text-xs dark:border-b-gray-200 dark:bg-main-red-200 md:text-base">
          <span>수신자: </span>
          <span className="text-sub-blue dark:text-sub-skyblue">
            {responseByReceiver?.length || 0}
          </span>
          <span>명</span>
        </header>

        {shouldDisplayUserList ? (
          <div className="max-h-80 overflow-auto">
            <input
              type="checkbox"
              className="drawer-toggle"
              id="drawer-bottom"
            />
            <UserList
              hasDrawer
              users={findUserBySearchKeyword}
              onClickUser={({ id, name }) => setSelectedUser({ id, name })}
              responserCount={responseByReceiver?.map(
                (value) => value.responserCount,
              )}
              ResponserList={ResponserList}
              questionType={questionOption}
            />
            <Suspense fallback={<div className="spinner"></div>}>
              {selectedUser.id && (
                <ReceiverTabReviewDetail
                  reviewId={reviewId}
                  receiverId={selectedUser.id}
                  receiverName={selectedUser.name}
                />
              )}
            </Suspense>
          </div>
        ) : (
          <NotFoundSearchUser />
        )}
      </div>
    </div>
  )
}

export default AllResponseReviewByResponser
