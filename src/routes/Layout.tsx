import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { ApiErrorBoundary } from '@/components'
import { scrollToTop } from '@/utils'

const Layout = () => {
  useEffect(() => {
    scrollToTop()
  }, [])

  return (
    <>
      <div className="bg-white dark:bg-black">
        <div className="border-x-1 mx-auto min-h-screen border-black bg-main-ivory dark:border-white dark:bg-main-red-100">
          <ApiErrorBoundary>
            <Outlet />
          </ApiErrorBoundary>
        </div>
      </div>
    </>
  )
}

export default Layout
