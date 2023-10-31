import { BasicProfileIcon } from '@/assets/icons'

interface ProfileProps {
  image?: string | JSX.Element
  name: string
}

const Profile = ({ image = <BasicProfileIcon />, name }: ProfileProps) => {
  return (
    <>
      <div className="flex flex-row items-center gap-2">
        <div className="flex h-[30px] w-[30px]">
          {typeof image === 'string' ? <img src={image} /> : image}
        </div>
        <div>{name}</div>
      </div>
    </>
  )
}

export default Profile
