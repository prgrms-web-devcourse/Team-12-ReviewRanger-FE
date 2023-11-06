import { Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useSignUp,
  useCheckDuplicatedEmail,
  useCheckDuplicatedName,
} from '@/apis/hooks'
import { DUPLICATED_MESSAGE } from './constants'

interface useSignUpCheckProps {
  email: string
  emailFailMessage: string
  setEmailFailMessage: Dispatch<SetStateAction<string>>
  nameFailMessage: string
  setNameFailMessage: Dispatch<SetStateAction<string>>
  name: string
  password: string
  passwordFailMessage: string
  passwordConfirmFailMessage: string
}

const useSignUpCheck = ({
  email,
  emailFailMessage,
  setEmailFailMessage,
  nameFailMessage,
  setNameFailMessage,
  name,
  password,
  passwordFailMessage,
  passwordConfirmFailMessage,
}: useSignUpCheckProps) => {
  const navigate = useNavigate()
  const { mutateAsync: signUp } = useSignUp()
  const { mutateAsync: checkDuplicatedEmail } = useCheckDuplicatedEmail()
  const { mutateAsync: checkDuplicatedName } = useCheckDuplicatedName()

  const handleSignUpButtonClick = async () => {
    if (
      !emailFailMessage &&
      !nameFailMessage &&
      !passwordFailMessage &&
      !passwordConfirmFailMessage
    ) {
      try {
        const [{ data: emailData }, { data: nameData }] = await Promise.all([
          checkDuplicatedEmail({ email }),
          checkDuplicatedName({ name }),
        ])

        if (!emailData.success) {
          setEmailFailMessage(DUPLICATED_MESSAGE.EMAIL)
        }
        if (!nameData.success) {
          setNameFailMessage(DUPLICATED_MESSAGE.NAME)
        }

        if (emailData.success && nameData.success) {
          await signUp({ email, name, password })
          navigate('/login')
        }
      } catch (e) {
        console.error('axios 통신 오류', e)
      }
    }
  }

  return { handleSignUpButtonClick }
}

export default useSignUpCheck
