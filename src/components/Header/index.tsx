import { memo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUser, useLogout } from '@/apis/hooks'
import {
  LogoRowIcon,
  LogoShortIcon,
  ArrowLeftIcon,
  BasicProfileIcon,
} from '@/assets/icons'
import { rangerHead } from '@/assets/images'
import Dropdown from '../Dropdown'

interface HeaderProps {
  handleGoBack?: () => void
}

const Header = memo(({ handleGoBack }: HeaderProps) => {
  const { data: user } = useUser()
  const { mutate: logout } = useLogout()

  const { pathname } = useLocation()
  const navigate = useNavigate()

  const avatarVisible = pathname !== '/sign-up' && pathname !== '/login'
  const goBackVisible = pathname !== '/login' && pathname !== '/'

  const handleLogout = () => {
    logout(undefined, {
      onSuccess() {
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
            src={rangerHead}
            alt="ranger-header"
            className="h-8 w-8 md:h-11 md:w-10"
          />
          <LogoShortIcon className="h-7 w-8 md:hidden" />
          <LogoRowIcon className="hidden h-11 w-60 md:block" />
        </div>
        <div>
          {avatarVisible && user && (
            <Dropdown>
              <Dropdown.Toggle className="avatar avatar-sm flex cursor-pointer items-center justify-center overflow-hidden border border-gray-200 bg-white md:avatar-md dark:bg-black">
                {user?.path ? (
                  <div className="h-7 w-7 p-1 md:h-9 md:w-9">
                    <img src={user.path} alt="my" />
                  </div>
                ) : (
                  <BasicProfileIcon className="h-7 w-7 md:h-9 md:w-9" />
                )}
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-40 rounded-sm">
                <Dropdown.Item defaultClose={false}>
                  <p className="text-xl">{user.name}</p>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => navigate('/profile')}>
                  마이페이지
                </Dropdown.Item>
                <Dropdown.Item>슬랙 알림 보기</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  )
})

export default Header
