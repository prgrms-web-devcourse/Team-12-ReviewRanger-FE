import { useEffect, useState } from 'react'
import {
  LogoRowIcon,
  LogoShortIcon,
  ArrowLeftIcon,
  BasicProfileIcon,
} from '@/assets/icons'
import { rangerHead } from '@/assets/images'

const Header = ({ goBack = true }: { goBack: boolean }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const path = window.location.pathname

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="sticky top-0 z-10 flex h-12 justify-center bg-main-red-300 py-4 md:h-20">
      <div className="flex w-full items-center justify-between px-6">
        <div>
          <ArrowLeftIcon className={`md:hidden" ${!goBack && 'hidden'}`} />
        </div>
        <div className="flex items-center gap-1">
          <img
            src={rangerHead}
            alt="ranger-header"
            className="h-8 w-8 md:h-11 md:w-10"
          />

          {windowWidth < 768 ? (
            <LogoShortIcon className="h-7 w-8" />
          ) : (
            <LogoRowIcon className="h-11 w-60" />
          )}
        </div>
        <div className={``}>
          <div
            className={`${path === '/sign-up' && 'hidden'} ${
              path === '/login' && 'hidden'
            } avatar avatar-sm flex items-center justify-center overflow-hidden border border-gray-200 bg-white md:avatar-md dark:bg-black`}
          >
            <BasicProfileIcon className="h-7 w-7 md:h-9 md:w-9" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
