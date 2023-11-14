import { BasicProfileIcon } from '@/assets/icons'

interface ProfileProps {
  image?: string | JSX.Element
  name: string
}

const Profile = ({
  image = <BasicProfileIcon className="h-4 w-4" />,
  name,
}: ProfileProps) => {
  return (
    <>
      <div className="flex flex-row items-center gap-2">
        <div className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-full border">
          {typeof image === 'string' ? <img src={image} /> : image}
        </div>
        <p className="text-sm dark:text-white">{name}</p>
      </div>
    </>
  )
}

export default Profile
