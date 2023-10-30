import { ReactNode } from 'react'
import { BasicProfileIcon } from '@/assets/icons'

interface ProfileProps {
  image?: string | ReactNode
  name: string
}

const Profile = ({ image = <BasicProfileIcon />, name }: ProfileProps) => {
  return (
    <>
      <div className="flex flex-row items-center gap-2">
        <div className="flex h-[30px] w-[30px]">
          {typeof image === 'string' ? (
            <img src={image} className="object-cover" />
          ) : (
            image
          )}
        </div>
        <div className="font-medium text-black">{name}</div>
      </div>
    </>
  )
}

export default Profile
