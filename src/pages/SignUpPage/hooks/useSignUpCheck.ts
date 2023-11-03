import { Dispatch, SetStateAction } from 'react'
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
  const { mutate: signUp } = useSignUp()
  const { mutate: checkDuplicatedEmail } = useCheckDuplicatedEmail()
  const { mutate: checkDuplicatedName } = useCheckDuplicatedName()

  const handleSignUpButtonClick = () => {
    !(
      emailFailMsg ||
      nameFailMsg ||
      passwordFailMsg ||
      passwordConfirmFailMsg
    ) &&
      checkDuplicatedEmail(
        { email },
        {
          onSuccess: ({ data }) => {
            if (data.success) {
              checkDuplicatedName(
                { name },
                {
                  onSuccess: ({ data }) => {
                    if (data.success) {
                      console.log('회원가입 환료!')
                      signUp({ email, name, password })
                    } else {
                      setNameFailMsg('이미 존재하는 이름이라구.')
                    }
                  },
                },
              )
            } else {
              setEmailFailMsg('이미 존재하는 이메일이라구.')
            }
          },
        },
      )
  }

  return { handleSignUpButtonClick }
}

export default useSignUpCheck
