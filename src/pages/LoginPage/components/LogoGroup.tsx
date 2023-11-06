import { Review, Ranger, RangersIcon } from '@/assets/logos'

const LogoGroup = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Review />
      <Ranger />
      <RangersIcon className="md:h-40 md:w-40" />
    </div>
  )
}

export default LogoGroup
