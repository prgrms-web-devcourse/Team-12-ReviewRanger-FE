import { Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useSignUp,
  useCheckDuplicatedEmail,
  useCheckDuplicatedName,
} from '@/apis/hooks'

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
        const { data: emailData } = await checkDuplicatedEmail({ email })
        if (!emailData.success) {
          setEmailFailMessage('이미 존재하는 이메일이라구.')

          return
        }

        const { data: nameData } = await checkDuplicatedName({ name })
        if (!nameData.success) {
          setNameFailMessage('이미 존재하는 이름이라구.')

          return
        }

        await signUp({ email, name, password })
        navigate('/login')
      } catch (e) {
        console.error('axios 통신 오류', e)
      }
    }
  }

  return { handleSignUpButtonClick }
}

export default useSignUpCheck
