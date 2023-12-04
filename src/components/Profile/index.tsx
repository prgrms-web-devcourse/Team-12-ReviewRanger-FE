import { BasicProfile } from '@/assets/images'

interface ProfileProps {
  image?: string
  name: string
  className?: string
}

const Profile = ({ image, name, className }: ProfileProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <img
        src={image || BasicProfile}
        className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-full border bg-white dark:bg-black"
      />
      <p className={`${className} text-sm dark:text-white md:text-lg`}>
        {name}
      </p>
    </div>
  )
}

export default Profile
