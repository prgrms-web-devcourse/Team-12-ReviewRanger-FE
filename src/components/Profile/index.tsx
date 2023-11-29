import { BasicProfile } from '@/assets/images'

interface ProfileProps {
  image?: string | JSX.Element
  name: string
  className?: string
}

const Profile = ({ image = BasicProfile, name, className }: ProfileProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <div className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-full border">
        {typeof image === 'string' ? <img src={image} /> : image}
      </div>
      <p className={`${className} text-sm dark:text-white md:text-lg`}>
        {name}
      </p>
    </div>
  )
}

export default Profile
