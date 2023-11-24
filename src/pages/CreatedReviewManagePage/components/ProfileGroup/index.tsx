import { BasicProfileIcon } from '@/assets/icons'

interface ProfileGroupProps {
  name: string
  responserSize?: number
  type: 'responser' | 'receiver'
}

const ProfileGroup = ({ name, responserSize, type }: ProfileGroupProps) => {
  return (
    <div className="flex">
      <BasicProfileIcon className="avatar h-[2.8125rem] w-[2.8125rem] border dark:bg-white dark:fill-white md:h-[3.5rem] md:w-[3.5rem]" />

      <div className="ml-[0.63rem] flex flex-col md:ml-[1.44rem]">
        {type === 'receiver' ? (
          <p className="mb-[0.62rem] text-[0.875rem] md:text-xl">
            {name}님에 대한 리뷰
          </p>
        ) : (
          <p className="mb-[0.62rem] text-[0.875rem] md:text-xl">
            {name}님이 작성한 리뷰
          </p>
        )}
        {type === 'receiver' ? (
          <p className="text-[0.875rem] md:text-xl">
            <span className="inline cursor-pointer  rounded-md border-[1px] border-sub-green bg-white pb-[0.19rem] pl-[0.31rem] pr-[0.31rem] pt-[0.19rem] text-[0.75rem]  text-sub-green dark:border-sub-yellow dark:bg-main-red-200 dark:text-sub-yellow md:text-base">
              {responserSize}명의 피어
            </span>
            <span className="ml-[0.25rem] text-[0.75rem] md:text-base ">
              들이 리뷰를 남겼어요!
            </span>
          </p>
        ) : (
          <p className="text-[0.875rem] md:text-xl">
            <span className="inline cursor-pointer  rounded-md border-[1px] border-sub-green bg-white pb-[0.19rem] pl-[0.31rem] pr-[0.31rem] pt-[0.19rem] text-[0.75rem]  text-sub-green dark:border-sub-yellow dark:bg-main-red-200 dark:text-sub-yellow md:text-base">
              {responserSize}명의 피어
            </span>
            <span className="ml-[0.25rem] text-[0.75rem] md:text-base ">
              에게 리뷰를 남겼어요!
            </span>
          </p>
        )}
      </div>
    </div>
  )
}

export default ProfileGroup
