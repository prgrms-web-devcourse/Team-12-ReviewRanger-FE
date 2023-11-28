import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorPage } from '@/pages'

const ApiErrorBoundary = ({ children }: PropsWithChildren) => {
  const { reset } = useQueryErrorResetBoundary()

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <ErrorPage error={error} resetErrorBoundary={resetErrorBoundary} />
      )}
    >
      {children}
    </ErrorBoundary>
  )
}

export default ApiErrorBoundary
