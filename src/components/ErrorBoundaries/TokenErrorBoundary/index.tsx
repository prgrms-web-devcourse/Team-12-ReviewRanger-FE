import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { PropsWithChildren } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks'
import { TOKEN_KEY } from '@/constants'

const TokenErrorBoundary = ({ children }: PropsWithChildren) => {
  const { reset } = useQueryErrorResetBoundary()
  const { addToast } = useToast()
  const navigate = useNavigate()

  return (
    <ErrorBoundary
      onReset={reset}
      onError={(error) => {
        if (isAxiosError(error) && error.response?.status === 401) {
          addToast({
            message: '토큰이 만료되었습니다. 다시 로그인해주세요.',
            type: 'error',
          })
          localStorage.removeItem(TOKEN_KEY)
          navigate('/login')
        } else {
          throw error
        }
      }}
      fallbackRender={() => <></>}
    >
      {children}
    </ErrorBoundary>
  )
}

export default TokenErrorBoundary
