import { Profile } from '@/components'

interface ProfileGroupProps {
  name: string
  responserSize: number
}

const ProfileGroup = ({ name, responserSize }: ProfileGroupProps) => {
  return (
    <div className="mb-0 ml-6 mt-0 flex flex-col">
      <Profile name={name} />
      <div>{responserSize}명이 답변함</div>
    </div>
  )
}

export default ProfileGroup
