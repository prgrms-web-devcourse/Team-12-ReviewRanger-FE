import { ChangeEvent, useRef } from 'react'
import { useNameCheck, usePasswordCheck } from '@/hooks'
import { Header, Input } from '@/components'
import { useEditImage, useUser } from '@/apis/hooks'
import {
  BasicProfileIcon,
  CheckIcon,
  EditIcon,
  ImageIcon,
} from '@/assets/icons'
import { useEditNameCheck, useEditPasswordCheck } from './hooks'

const MyPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { data: user } = useUser()
  const { mutate: editImage } = useEditImage()

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
    currentName: user?.name || '',
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

  const handleClickImageButton = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const formData = new FormData()
      formData.append('image', e.currentTarget.files[0])
      editImage(
        { image: formData },
        {
          onSuccess: ({ data }) => console.log(data),
        },
      )
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex h-full flex-col items-center gap-6 bg-main-ivory pt-28 dark:bg-main-red-100 md:pt-48">
        <div className="relative flex">
          <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border bg-white dark:bg-black">
            <BasicProfileIcon className="h-20 w-20" />
          </div>
          <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border bg-white dark:bg-main-red-200">
            <ImageIcon
              className="z-10 h-4 w-4 cursor-pointer dark:stroke-white"
              onClick={handleClickImageButton}
            />
            <input
              type="file"
              ref={fileInputRef}
              accept="image/png, image/jpeg, image/jpg"
              className="hidden"
              onChange={handleChangeImage}
            />
          </div>
        </div>
        <div className="mb-4 flex flex-col items-center gap-2">
          {editNameButton ? (
            <div className="relative flex items-center">
              <Input
                className="!w-64"
                type="name"
                placeholder="변경할 이름을 입력하세요."
                onChange={handleNameChange}
                message={nameFailMessage}
                value={name}
              />
              <div className="absolute -right-8 flex h-6 w-6 items-center justify-center rounded-full border bg-white dark:bg-main-red-200">
                <CheckIcon
                  className="h-4 w-4 cursor-pointer fill-sub-green"
                  onClick={handleEditNameEndingClick}
                />
              </div>
            </div>
          ) : (
            <div className="relative flex items-center">
              <div className="text-xl text-black dark:text-white">
                {user?.name}
              </div>
              <div className="absolute -right-8 flex h-6 w-6 items-center justify-center rounded-full border bg-white dark:bg-main-red-200">
                <EditIcon
                  className="h-4 w-4 cursor-pointer dark:stroke-white"
                  onClick={handleEditNameStartingClick}
                />
              </div>
            </div>
          )}
          <div className="text-sm text-gray-300 dark:text-white">
            {user?.email}
          </div>
        </div>

        {editPasswordButton ? (
          <div className="flex flex-col items-center justify-center gap-5">
            <Input
              className="!w-64"
              type="password"
              onChange={handlePasswordChange}
              message={passwordFailMessage}
            />
            <Input
              className="!w-64"
              type="passwordConfirm"
              onChange={handlePasswordConfirmChange}
              message={passwordConfirmFailMessage}
            />
            <button
              className="h-10 w-64 max-w-xs rounded-md bg-active-orange text-lg text-white hover:border hover:border-black disabled:bg-opacity-50 dark:text-black md:text-xl"
              onClick={handleEditPasswordEndingClick}
            >
              변경 완료
            </button>
          </div>
        ) : (
          <button
            className="h-10 w-64 max-w-xs rounded-md bg-active-orange text-lg text-white hover:border hover:border-black disabled:bg-opacity-50 dark:text-black md:text-xl"
            onClick={handleEditPasswordStartingClick}
          >
            비밀번호 변경
          </button>
        )}
      </div>
    </div>
  )
}

export default MyPage
