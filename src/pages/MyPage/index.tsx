import { ChangeEvent, useRef } from 'react'
import { useNameCheck, usePasswordCheck, useToast } from '@/hooks'
import { Header, Input, Modal } from '@/components'
import { useEditImage, useUser } from '@/apis/hooks'
import { CheckIcon, EditIcon, ImageIcon } from '@/assets/icons'
import { BasicProfile } from '@/assets/images'
import { useEditNameCheck, useEditPasswordCheck } from './hooks'

const MyPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { data: user, refetch } = useUser()
  const { mutate: editImage } = useEditImage()
  const { addToast } = useToast()

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
    nameRef,
    editNameButton,
    handleEditNameStartingClick,
    handleEditNameEndingClick,
    handleChangeNameComplete,
  } = useEditNameCheck({
    currentName: user?.name || '',
    name,
    setName,
    nameFailMessage,
    setNameFailMessage,
  })

  const {
    passwordRef,
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
          onSuccess: () => {
            refetch()
            addToast({
              message: '이미지 변경이 완료되었습니다.',
              type: 'success',
            })
          },
        },
      )
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex h-full flex-col items-center gap-6 bg-main-ivory pt-28 dark:bg-main-red-100 md:gap-8 md:pt-48">
        <div className="relative flex">
          <div
            className="flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-full border bg-white dark:bg-black md:h-32 md:w-32"
            onClick={handleClickImageButton}
          >
            {user?.path ? (
              <img
                src={user?.path}
                alt="profile-image"
                className="h-full w-full"
              />
            ) : (
              <img src={BasicProfile} className="h-20 w-20" />
            )}
          </div>
          <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border bg-white dark:bg-main-red-200 md:h-7 md:w-7">
            <ImageIcon
              className="z-10 h-4 w-4 cursor-pointer dark:fill-white md:h-5 md:w-5"
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
                <label htmlFor="edit-name" className="hidden" ref={nameRef} />
              </div>
            </div>
          ) : (
            <div className="relative flex items-center">
              <div className="text-xl text-black dark:text-white md:text-3xl">
                {user?.name}
              </div>
              <div className="absolute -right-8 flex h-6 w-6 items-center justify-center rounded-full border bg-white dark:bg-main-red-200 md:-right-9 md:h-7 md:w-7">
                <EditIcon
                  className="h-4 w-4 cursor-pointer dark:fill-white md:h-5 md:w-5"
                  onClick={handleEditNameStartingClick}
                />
              </div>
            </div>
          )}
          <div className="text-sm text-gray-300 dark:text-white md:text-lg">
            {user?.email}
          </div>
        </div>
        {editPasswordButton ? (
          <form className="flex flex-col items-center justify-center gap-5">
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
              type="button"
              className="z-10 h-10 w-64 max-w-xs rounded-md bg-active-orange text-lg text-white hover:border hover:border-black disabled:bg-opacity-50 dark:text-black md:text-xl"
            >
              {!(passwordFailMessage || passwordConfirmFailMessage) ? (
                <label
                  ref={passwordRef}
                  htmlFor="edit-password"
                  className="flex h-full w-full items-center justify-center"
                >
                  변경 완료
                </label>
              ) : (
                <p>변경 완료</p>
              )}
            </button>
          </form>
        ) : (
          <button
            className="h-10 w-64 max-w-xs rounded-md bg-active-orange text-lg text-white hover:border hover:border-black disabled:bg-opacity-50 dark:text-black md:text-xl"
            onClick={handleEditPasswordStartingClick}
          >
            비밀번호 변경
          </button>
        )}
      </div>
      <Modal
        modalId="edit-name"
        content={`'${name}'로 이름을 변경하시겠습니까?`}
        label="변경"
        handleClickLabel={handleChangeNameComplete}
      />
      <Modal
        modalId="edit-password"
        content={`비밀번호를 변경하시겠습니까?`}
        label="변경"
        handleClickLabel={handleEditPasswordEndingClick}
      />
    </div>
  )
}

export default MyPage
