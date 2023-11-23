import { useState } from 'react'
import { SubmitHandler, useFieldArray, useFormContext } from 'react-hook-form'
import { useToast } from '@/hooks'
import { Profile, SearchBar } from '@/components'
import { CheckInTheCircleIcon } from '@/assets/icons'
import { Review } from '../../types'

interface ResponserSelectProps {
  handleClickButton: () => void
}

const ResponserSelect = ({ handleClickButton }: ResponserSelectProps) => {
  const [filterState, setFilterState] = useState(false)
  const { addToast } = useToast()

  const {
    control,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useFormContext<Review>()

  const {
    fields: responsers,
    append: appendResponser,
    remove: removeResponser,
    replace: replaceResponser,
  } = useFieldArray({
    control,
    name: 'responserIdList',
  })

  const {
    fields: nonResponsers,
    append: appendNonResponser,
    remove: removeNonResponser,
    replace: replaceNonResponser,
  } = useFieldArray({
    control,
    name: 'nonResponserIdList',
  })

  const {
    fields: filteredResponsers,
    append: appendFilteredResponser,
    remove: removeFilteredResponser,
    replace: replaceFilteredResponser,
  } = useFieldArray({
    control,
    name: 'filteredResponserIdList',
  })

  const {
    fields: filteredNonResponsers,
    append: appendFilteredNonResponser,
    remove: removeFilteredNonResponser,
    replace: replaceFilteredNonResponser,
  } = useFieldArray({
    control,
    name: 'filteredNonResponserIdList',
  })

  const onSubmit: SubmitHandler<Review> = () => {
    if (responsers.length <= 1) {
      addToast({ message: '응답자를 2명 이상 선택해주세요.', type: 'error' })

      setError('responserIdList', {
        type: 'required',
        message: '응답자를 2명 이상 선택해주세요.',
      })
      // 토스트도 띄워주기 ,,?

      return
    }

    handleClickButton()
  }

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      handleResetKeyword()
      setFilterState(false)

      return
    }
    if (!filterState) {
      setFilterState(true)
    }

    replaceFilteredResponser(
      responsers.filter((responser) => responser.name.includes(e.target.value)),
    )
    replaceFilteredNonResponser(
      nonResponsers.filter((nonResponser) =>
        nonResponser.name.includes(e.target.value),
      ),
    )
  }

  const handleResetKeyword = () => {
    replaceFilteredResponser([])
    replaceFilteredNonResponser([])
    setFilterState(false)
  }

  return (
    <>
      <form
        className="mx-auto flex h-full w-full max-w-[37.5rem] grow flex-col justify-between px-5 pb-10 pt-[1.87rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <h1 className="text-lg dark:text-white md:text-xl">응답자 선택</h1>

          <SearchBar
            className="mt-5"
            handleChangeKeyword={handleChangeKeyword}
            handleResetKeyword={handleResetKeyword}
          />

          <div className="flex flex-col gap-4 text-sm md:text-lg">
            {filterState ? (
              <>
                <div className="mt-7">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="dark:text-white">
                      <span>선택한 인원: </span>
                      <span className="text-sub-blue dark:text-sub-skyblue">
                        {filteredResponsers.length}
                      </span>
                      <span> 명</span>
                    </div>
                    <button
                      type="button"
                      className="btn h-6 rounded-md border border-gray-200 bg-main-yellow px-2 text-xs dark:border-gray-100 dark:bg-main-red-200 dark:text-white md:h-8 md:text-sm"
                      onClick={() => {
                        filteredResponsers.map((filteredResponser) => {
                          removeResponser(
                            responsers.findIndex(
                              (responser) =>
                                responser.receiverId ===
                                filteredResponser.receiverId,
                            ),
                          )
                          appendNonResponser(filteredResponser)
                        })
                        replaceFilteredResponser([])
                        appendFilteredNonResponser(filteredResponsers)
                      }}
                    >
                      전체 해제
                    </button>
                  </div>

                  <ul className="flex flex-col gap-2">
                    {filteredResponsers.map((filteredResponser, index) => (
                      <li
                        key={filteredResponser.id}
                        className="flex items-center justify-between border-b border-gray-400 py-2"
                      >
                        <Profile name={filteredResponser.name} />
                        <CheckInTheCircleIcon
                          className="cursor-pointer fill-sub-green"
                          onClick={() => {
                            removeFilteredResponser(index)
                            removeResponser(
                              responsers.findIndex(
                                (responser) =>
                                  responser.receiverId ===
                                  filteredResponser.receiverId,
                              ),
                            )
                            appendFilteredNonResponser(filteredResponser)
                            appendNonResponser(filteredResponser)
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="dark:text-white">
                      <span>선택하지 않은 인원: </span>
                      <span className="text-sub-blue dark:text-sub-skyblue">
                        {filteredNonResponsers.length}
                      </span>
                      <span> 명</span>
                    </div>
                    <button
                      type="button"
                      className="btn h-6 rounded-md border border-gray-200 bg-main-yellow px-2 text-xs dark:border-gray-100 dark:bg-main-red-200 dark:text-white md:h-8 md:text-sm"
                      onClick={() => {
                        filteredNonResponsers.map((filteredNonResponser) => {
                          removeNonResponser(
                            nonResponsers.findIndex(
                              (nonResponser) =>
                                nonResponser.receiverId ===
                                filteredNonResponser.receiverId,
                            ),
                          )
                          appendResponser(filteredNonResponser)
                        })
                        replaceFilteredNonResponser([])
                        appendFilteredResponser(filteredNonResponsers)
                        clearErrors('responserIdList')
                      }}
                    >
                      전체 선택
                    </button>
                  </div>

                  <ul className="flex flex-col gap-2">
                    {filteredNonResponsers.map(
                      (filteredNonResponser, index) => (
                        <li
                          key={filteredNonResponser.id}
                          className="flex items-center justify-between border-b border-gray-400 py-2"
                        >
                          <Profile name={filteredNonResponser.name} />
                          <CheckInTheCircleIcon
                            className="cursor-pointer fill-gray-100"
                            onClick={() => {
                              removeFilteredNonResponser(index)
                              removeNonResponser(
                                nonResponsers.findIndex(
                                  (nonResponser) =>
                                    nonResponser.receiverId ===
                                    filteredNonResponser.receiverId,
                                ),
                              )
                              appendFilteredResponser(filteredNonResponser)
                              appendResponser(filteredNonResponser)
                              clearErrors('responserIdList')
                            }}
                          />
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="mt-7">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="dark:text-white">
                      <span>선택한 인원: </span>
                      <span className="text-sub-blue dark:text-sub-skyblue">
                        {responsers.length}
                      </span>
                      <span> 명</span>
                    </div>
                    <button
                      type="button"
                      className="btn h-6 rounded-md border border-gray-200 bg-main-yellow px-2 text-xs dark:border-gray-100 dark:bg-main-red-200 dark:text-white md:h-8 md:text-sm"
                      onClick={() => {
                        replaceResponser([])
                        appendNonResponser(responsers)
                      }}
                    >
                      전체 해제
                    </button>
                  </div>

                  <ul className="flex flex-col gap-2">
                    {responsers.map((responser, index) => (
                      <li
                        key={responser.id}
                        className="flex items-center justify-between border-b border-gray-400 py-2"
                      >
                        <Profile name={responser.name} />
                        <CheckInTheCircleIcon
                          className="cursor-pointer fill-sub-green"
                          onClick={() => {
                            appendNonResponser(responser)
                            removeResponser(index)
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="dark:text-white">
                      <span>선택하지 않은 인원: </span>
                      <span className="text-sub-blue dark:text-sub-skyblue">
                        {nonResponsers.length}
                      </span>
                      <span> 명</span>
                    </div>
                    <button
                      className="btn h-6 rounded-md border border-gray-200 bg-main-yellow px-2 text-xs dark:border-gray-100 dark:bg-main-red-200 dark:text-white md:h-8 md:text-sm"
                      type="button"
                      onClick={() => {
                        replaceNonResponser([])
                        appendResponser(nonResponsers)
                        clearErrors('responserIdList')
                      }}
                    >
                      전체 선택
                    </button>
                  </div>

                  <ul className="flex flex-col gap-2">
                    {nonResponsers.map((nonResponser, index) => (
                      <li
                        key={nonResponser.id}
                        className="flex items-center justify-between border-b border-gray-400 py-2"
                      >
                        <Profile name={nonResponser.name} />
                        <CheckInTheCircleIcon
                          className="cursor-pointer fill-gray-100"
                          onClick={() => {
                            appendResponser(nonResponser)
                            removeNonResponser(index)
                            clearErrors('responserIdList')
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {errors.responserIdList && (
              <p className="mt-1 text-xs text-sub-red-200 dark:text-sub-yellow md:text-sm">
                {errors.responserIdList.message}
              </p>
            )}
          </div>
        </div>

        <button className="btn sticky bottom-10 w-full self-end rounded-md bg-active-orange text-lg text-white dark:text-black md:w-fit md:px-8">
          리뷰 생성하기
        </button>
      </form>
    </>
  )
}

export default ResponserSelect
