import { useSignUp } from '@/apis/hooks'

interface useSignUpCheckProps {
  email: string
  name: string
  password: string
}

const useSignUpCheck = ({ email, name, password }: useSignUpCheckProps) => {
  const { mutate: signUp } = useSignUp()

  const handleSignUpButtonClick = () => {
    signUp({ email, name, password })
  }

  return { handleSignUpButtonClick }
}

export default useSignUpCheck
