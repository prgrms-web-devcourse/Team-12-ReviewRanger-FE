import { BasicProfileIcon } from '@/assets/icons'

interface ProfileGroupProps {
  name: string
  responserSize: number
}

const ProfileGroup = ({ name, responserSize }: ProfileGroupProps) => {
  return (
    <div className="flex">
      <BasicProfileIcon className="avatar h-[2.8125rem] w-[2.8125rem] border dark:bg-white dark:fill-white md:h-[3.5rem] md:w-[3.5rem]" />

      <div className="ml-[0.63rem] flex flex-col md:ml-[1.44rem]">
        <p className="text-[0.875rem] md:text-xl">{name}님에 대한 리뷰</p>
        <p className="text-[0.875rem] md:text-xl">
          <span className="p-b-[0.19rem] p-l-[0.31rem] p-r-[0.31rem] p-t-[0.19rem] inline cursor-pointer rounded-md border-[1px] border-sub-green text-sub-green dark:border-sub-yellow dark:text-sub-yellow">
            {responserSize}명의 피어
          </span>
          <span>들이 리뷰를 남겼군</span>
        </p>
      </div>
    </div>
  )
}

export default ProfileGroup
