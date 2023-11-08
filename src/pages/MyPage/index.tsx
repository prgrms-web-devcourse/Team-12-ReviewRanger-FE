import { useNameCheck, usePasswordCheck } from '@/hooks'
import { Header, Input } from '@/components'
import { BasicProfileIcon, CheckInTheCircleIcon, Edit } from '@/assets/icons'
import { useEditNameCheck, useEditPasswordCheck } from './hooks'

const user = {
  name: '[프롱이/4기]김주하',
  email: 'email@naver.com',
  password: 'imsy password',
}

const MyPage = () => {
  const {
    name,
    nameFailMessage,
    setNameFailMessage,
    handleNameChange,
    setName,
  } = useNameCheck()

  const {
    password,
    passwordConfirm,
    passwordFailMessage,
    passwordConfirmFailMessage,
    handlePasswordChange,
    handlePasswordConfirmChange,
  } = usePasswordCheck()

  const {
    editNameButton,
    handleEditNameStartingClick,
    handleEditNameEndingClick,
  } = useEditNameCheck({
    currentName: user.name,
    name,
    setName,
    nameFailMessage,
    setNameFailMessage,
  })

  const {
    editPasswordButton,
    handleEditPasswordStartingClick,
    handleEditPasswordEndingClick,
  } = useEditPasswordCheck({
    password,
    passwordConfirm,
    passwordFailMessage,
    passwordConfirmFailMessage,
  })

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <div
          className={`avatar avatar-ring-success avatar-xl flex items-center justify-center overflow-hidden border border-gray-200 bg-white md:avatar-md dark:bg-black`}
        >
          <BasicProfileIcon className="h-20 w-20 md:h-9 md:w-9" />
        </div>
        <div className="flex gap-2">
          {editNameButton ? (
            <div className="flex items-center gap-2">
              <Input
                type="name"
                placeholder="변경할 이름을 입력하라구!"
                handleInputChange={handleNameChange}
                message={nameFailMessage}
                value={name}
              />
              <CheckInTheCircleIcon
                className="h-8 w-8 cursor-pointer"
                fill="green"
                onClick={handleEditNameEndingClick}
              />
            </div>
          ) : (
            <>
              <div className="font-bold text-black">{user.name}</div>
              <Edit
                className="cursor-pointer"
                onClick={handleEditNameStartingClick}
              />
            </>
          )}
        </div>
        <div className="text-sm text-black">{user.email}</div>

        {editPasswordButton ? (
          <div className="flex flex-col gap-2">
            <Input
              type="password"
              handleInputChange={handlePasswordChange}
              message={passwordFailMessage}
            />
            <Input
              type="passwordConfirm"
              handleInputChange={handlePasswordConfirmChange}
              message={passwordConfirmFailMessage}
            />
            <button className="btn" onClick={handleEditPasswordEndingClick}>
              비밀번호 변경 완료
            </button>
          </div>
        ) : (
          <button className="btn" onClick={handleEditPasswordStartingClick}>
            비밀번호 변경
          </button>
        )}
      </div>
    </div>
  )
}

export default MyPage
