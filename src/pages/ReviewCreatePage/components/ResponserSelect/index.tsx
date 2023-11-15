import { SubmitHandler, useFieldArray, useFormContext } from 'react-hook-form'
import { Profile } from '@/components'
import { CheckInTheCircleIcon } from '@/assets/icons'
import { Review } from '../../types'
import { useNavigate } from 'react-router-dom'

interface ResponserSelectProps {
  handleClickButton: () => void
}

const ResponserSelect = ({ handleClickButton }: ResponserSelectProps) => {
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

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<Review> = () => {
    if (!responsers.length) {
      setError('responserIdList', {
        type: 'required',
        message: '응답자를 선택해주세요.',
      })

      return
    }

    handleClickButton()
    navigate('/')
  }

  return (
    <>
      <form
        className="mx-auto flex h-full w-full max-w-[880px] grow flex-col justify-between px-5 pb-10 pt-[1.87rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <h1 className="text-lg md:text-xl">응답자 선택</h1>
          <div className="flex flex-col gap-4 text-sm md:text-lg">
            {responsers.length > 0 && (
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
                          clearErrors('responserIdList')
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {nonResponsers.length > 0 && (
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
                    onClick={() => {
                      replaceNonResponser([])
                      appendResponser(nonResponsers)
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
            )}

            {errors.responserIdList && (
              <p className="mt-1 text-xs text-sub-red-200 dark:text-sub-yellow md:text-sm">
                {errors.responserIdList.message}
              </p>
            )}
          </div>
        </div>

        <button className="font-lg btn sticky bottom-10 w-full self-end rounded-md bg-active-orange text-white dark:text-black md:w-fit md:px-8">
          리뷰 생성하기
        </button>
      </form>
    </>
  )
}

export default ResponserSelect
