import { useState } from 'react'
import { SubmitHandler, useFieldArray, useFormContext } from 'react-hook-form'
import { useToast } from '@/hooks'
import { SearchBar } from '@/components'
import { Review, User } from '../../types'
import ResponserList from './ResponserList'

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
    setFilterState(false)
  }

  const handleResponsers = {
    selectAll: (responsers: User[]) => {
      replaceResponser([])
      appendNonResponser(responsers)
    },
    select: (responser: User, index: number) => {
      appendNonResponser(responser)
      removeResponser(index)
    },
  }

  const handleNonResponsers = {
    selectAll: (nonResponsers: User[]) => {
      replaceNonResponser([])
      appendResponser(nonResponsers)
      clearErrors('responserIdList')
    },
    select: (nonResponser: User, index: number) => {
      appendResponser(nonResponser)
      removeNonResponser(index)
      clearErrors('responserIdList')
    },
  }

  const handleFilteredResponsers = {
    selectAll: (filteredResponsers: User[]) => {
      const removeIndexList = filteredResponsers.map((filteredResponser) =>
        responsers.findIndex(
          (responser) => responser.receiverId === filteredResponser.receiverId,
        ),
      )
      removeResponser(removeIndexList)
      appendNonResponser(filteredResponsers)
      replaceFilteredResponser([])
      appendFilteredNonResponser(filteredResponsers)
    },
    select: (filteredResponser: User, index: number) => {
      removeFilteredResponser(index)
      removeResponser(
        responsers.findIndex(
          (responser) => responser.receiverId === filteredResponser.receiverId,
        ),
      )
      appendFilteredNonResponser(filteredResponser)
      appendNonResponser(filteredResponser)
    },
  }

  const handleFilteredNonResponsers = {
    selectAll: (filteredNonResponsers: User[]) => {
      const removeIndexList = filteredNonResponsers.map(
        (filteredNonResponser) =>
          nonResponsers.findIndex(
            (nonResponser) =>
              nonResponser.receiverId === filteredNonResponser.receiverId,
          ),
      )
      removeNonResponser(removeIndexList)
      appendResponser(filteredNonResponsers)
      replaceFilteredNonResponser([])
      appendFilteredResponser(filteredNonResponsers)
      clearErrors('responserIdList')
    },
    select: (filteredNonResponser: User, index: number) => {
      removeFilteredNonResponser(index)
      removeNonResponser(
        nonResponsers.findIndex(
          (nonResponser) =>
            nonResponser.receiverId === filteredNonResponser.receiverId,
        ),
      )
      appendFilteredResponser(filteredNonResponser)
      appendResponser(filteredNonResponser)
      clearErrors('responserIdList')
    },
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
                <ResponserList
                  responserList={filteredResponsers}
                  handleSelectAllResponsers={handleFilteredResponsers.selectAll}
                  handleSelectResponser={handleFilteredResponsers.select}
                  selected={true}
                />

                <ResponserList
                  responserList={filteredNonResponsers}
                  handleSelectAllResponsers={
                    handleFilteredNonResponsers.selectAll
                  }
                  handleSelectResponser={handleFilteredNonResponsers.select}
                />
              </>
            ) : (
              <>
                <ResponserList
                  handleSelectAllResponsers={handleResponsers.selectAll}
                  handleSelectResponser={handleResponsers.select}
                  responserList={responsers}
                  selected={true}
                />

                <ResponserList
                  handleSelectAllResponsers={handleNonResponsers.selectAll}
                  handleSelectResponser={handleNonResponsers.select}
                  responserList={nonResponsers}
                />
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
