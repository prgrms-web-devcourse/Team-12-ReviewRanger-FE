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
          {responserSize}명의 피어들이 리뷰를 남겼군
        </p>
      </div>
    </div>
  )
}

export default ProfileGroup
