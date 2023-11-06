import { LogoColIcon } from '@/assets/icons'
import { rangers } from '@/assets/images'

const LogoGroup = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="md:hidden">
        <LogoColIcon className="h-[4rem] w-[5.8rem]" />
      </div>
      <img
        className="h-24 w-24 md:h-40 md:w-40"
        src={rangers}
        alt="리뷰레인저 모음집"
      />
    </div>
  )
}

export default LogoGroup
