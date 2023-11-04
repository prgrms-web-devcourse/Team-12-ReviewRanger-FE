import { Dispatch, SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  useSignUp,
  useCheckDuplicatedEmail,
  useCheckDuplicatedName,
} from '@/apis/hooks'

interface useSignUpCheckProps {
  email: string
  emailFailMsg: string
  setEmailFailMsg: Dispatch<SetStateAction<string>>
  nameFailMsg: string
  setNameFailMsg: Dispatch<SetStateAction<string>>
  name: string
  password: string
  passwordFailMsg: string
  passwordConfirmFailMsg: string
}

const useSignUpCheck = ({
  email,
  emailFailMsg,
  setEmailFailMsg,
  nameFailMsg,
  setNameFailMsg,
  name,
  password,
  passwordFailMsg,
  passwordConfirmFailMsg,
}: useSignUpCheckProps) => {
  const navigate = useNavigate()
  const { mutateAsync: signUp } = useSignUp()
  const { mutateAsync: checkDuplicatedEmail } = useCheckDuplicatedEmail()
  const { mutateAsync: checkDuplicatedName } = useCheckDuplicatedName()

  const handleSignUpButtonClick = async () => {
    if (
      !emailFailMsg &&
      !nameFailMsg &&
      !passwordFailMsg &&
      !passwordConfirmFailMsg
    ) {
      try {
        const { data: emailData } = await checkDuplicatedEmail({ email })
        if (!emailData.success) {
          setEmailFailMsg('이미 존재하는 이메일이라구.')

          return
        }

        const { data: nameData } = await checkDuplicatedName({ name })
        if (!nameData.success) {
          setNameFailMsg('이미 존재하는 이름이라구.')

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
