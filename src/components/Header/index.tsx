import { useLocation, useNavigate } from 'react-router-dom'
import { useUser, useLogout } from '@/apis/hooks'

import {
  LogoRowIcon,
  LogoShortIcon,
  ArrowLeftIcon,
  BasicProfileIcon,
} from '@/assets/icons'
import { rangerHead } from '@/assets/images'

const Header = () => {
  const { data } = useUser()
  const { mutate } = useLogout()

  const path = useLocation().pathname

  const navigate = useNavigate()

  const avatarVisible = path !== '/sign-up' && path !== '/login'
  const goBackVisible = path !== '/login' && path !== '/'

  const handleOnClickLogoArea = () => {
    if (data && data.success) {
      navigate('/')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="sticky top-0 z-10 flex h-12 shrink-0 justify-center bg-main-red-300 py-4 md:h-20">
      <div className="flex w-full items-center justify-between px-6">
        <div>
          <ArrowLeftIcon
            className={`md:hidden" ${
              !goBackVisible && 'hidden'
            } cursor-pointer`}
            onClick={() => navigate(-1)}
          />
        </div>
        <div
          onClick={handleOnClickLogoArea}
          className="fixed left-1/2 flex -translate-x-1/2 transform cursor-pointer items-center gap-1"
        >
          <img
            src={rangerHead}
            alt="ranger-header"
            className="h-8 w-8 md:h-11 md:w-10"
          />
          <LogoShortIcon className="h-7 w-8 md:hidden" />
          <LogoRowIcon className="hidden h-11 w-60 md:block" />
        </div>
        <div>
          {avatarVisible && data && data?.success && (
            <div className="dropdown-hover relative">
              <div
                className={`avatar avatar-sm flex items-center justify-center overflow-hidden border border-gray-200 bg-white md:avatar-md dark:bg-black `}
              >
                <BasicProfileIcon className="h-7 w-7 md:h-9 md:w-9" />
              </div>
              <div className="dropdown-menu dropdown-menu-left-bottom w-[10rem] border-[1px] bg-[#fbfbfd] p-0 text-[0.875rem] text-[#313131] dark:border-white dark:bg-[#202020] dark:text-white">
                <a className="dropdown-item flex items-center justify-center rounded-none border-b-[1px] border-gray-200 text-sm  dark:border-black">
                  {data.data.name}님
                </a>
                <a
                  tabIndex={0}
                  className="dropdown-item flex items-center justify-center rounded-none border-b-[1px] border-gray-200 text-sm  dark:border-black"
                  href="/review-creation"
                >
                  설문만들기
                </a>
                <a
                  tabIndex={1}
                  className="dropdown-item flex items-center justify-center rounded-none border-b-[1px] border-gray-200 text-sm  dark:border-black"
                  href="/profile"
                >
                  마이페이지
                </a>
                <a
                  tabIndex={2}
                  className="dropdown-item flex items-center justify-center rounded-none border-b-[1px] border-gray-200 text-sm  dark:border-black"
                  onClick={() => mutate()}
                >
                  로그아웃
                </a>
                <a
                  tabIndex={3}
                  className="dropdown-item flex items-center justify-center border-[#37485D] text-sm dark:border-black"
                >
                  도움말
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
