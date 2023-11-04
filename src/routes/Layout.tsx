import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="border-x-1 mx-auto min-h-screen max-w-[1000px] border-black bg-main-yellow dark:border-white dark:bg-main-red-100">
      <button
        className="btn fixed right-40 top-4 bg-pink-800 text-white"
        onClick={() => {
          document.documentElement.classList.toggle('dark')
        }}
      >
        토글
      </button>
      <Outlet />
    </div>
  )
}

export default Layout
