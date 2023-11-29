import { memo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDarkMode, useToast } from '@/hooks'
import { useUser, useLogout } from '@/apis/hooks'
import {
  LogoRowIcon,
  LogoShortIcon,
  ArrowLeftIcon,
  BasicProfileIcon,
  SunIcon,
  MoonIcon,
} from '@/assets/icons'
import { rangerCleanHead } from '@/assets/images'
import { Modal } from '..'
import Dropdown from '../Dropdown'

interface HeaderProps {
  handleGoBack?: () => void
}

const Header = memo(({ handleGoBack }: HeaderProps) => {
  const { data: user } = useUser()
  const { mutate: logout } = useLogout()

  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { addToast } = useToast()
  const { toggle, darkMode } = useDarkMode()

  const avatarVisible = pathname !== '/sign-up' && pathname !== '/login'
  const goBackVisible = pathname !== '/login' && pathname !== '/'

  const handleLogout = () => {
    logout(undefined, {
      onSuccess() {
        addToast({ message: '로그아웃 되었습니다.', type: 'success' })
        navigate('/login')
      },
    })
  }

  return (
    <div className="sticky top-0 z-30 flex h-12 w-full shrink-0 justify-center bg-main-red-300 py-4 md:h-20">
      <div className="relative flex w-[55rem] items-center justify-between px-6">
        <div
          className="cursor-pointer"
          onClick={handleGoBack ?? (() => navigate(-1))}
        >
          <ArrowLeftIcon className={`${!goBackVisible && 'hidden'}`} />
        </div>
        <div
          className="absolute left-1/2 flex -translate-x-1/2 cursor-pointer items-center gap-1"
          onClick={() => navigate('/')}
        >
          <img
            src={rangerCleanHead}
            alt="ranger-header"
            className="h-6 w-6 md:h-8 md:w-8"
          />
          <LogoShortIcon className="ml-1 h-7 w-8 md:hidden" />
          <LogoRowIcon className="hidden h-11 w-60 md:block" />
        </div>
        <div className="flex items-center gap-x-3 md:gap-x-5">
          <div
            className="flex cursor-pointer items-center justify-center md:h-8 md:w-8"
            onClick={toggle}
          >
            {darkMode ? (
              <MoonIcon className="animate h-full w-full" />
            ) : (
              <SunIcon className="h-full w-full" />
            )}
          </div>
          {avatarVisible && user && (
            <>
              <Dropdown>
                <Dropdown.Toggle className="avatar avatar-sm flex cursor-pointer items-center justify-center overflow-hidden border border-gray-200 bg-white md:avatar-md dark:bg-black">
                  {user?.path ? (
                    <div className="flex h-7 w-7 p-0.5 md:h-9 md:w-9">
                      <img src={user.path} alt="my" />
                    </div>
                  ) : (
                    <BasicProfileIcon className="h-7 w-7 md:h-9 md:w-9" />
                  )}
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-40 rounded-sm">
                  <Dropdown.Item enabled={false}>
                    <p className="text-xl">{user.name}</p>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => navigate('/profile')}>
                    마이페이지
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      addToast({
                        message: '아직 준비중인 기능이에요 😥',
                        type: 'info',
                      })
                    }
                  >
                    슬랙 알림 보기
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <label htmlFor="logout" className="cursor-pointer">
                      로그아웃
                    </label>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Modal
                modalId="logout"
                content="로그아웃 하시겠습니까?"
                label="로그아웃"
                handleClickLabel={handleLogout}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
})

export default Header
