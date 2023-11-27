import { Outlet } from 'react-router-dom'
import { useDarkMode } from '@/hooks'
import { ApiErrorBoundary, TokenErrorBoundary } from '@/components'

const Layout = () => {
  const { toggle } = useDarkMode()

  return (
    <ApiErrorBoundary>
      <TokenErrorBoundary>
        <div className="bg-white dark:bg-black">
          <div className="border-x-1 mx-auto min-h-screen border-black bg-main-ivory dark:border-white dark:bg-main-red-100">
            <Outlet />
          </div>
        </div>
        <button
          className="btn fixed bottom-10 right-20 bg-pink-800 text-white"
          onClick={toggle}
        >
          토글
        </button>
      </TokenErrorBoundary>
    </ApiErrorBoundary>
  )
}

export default Layout
