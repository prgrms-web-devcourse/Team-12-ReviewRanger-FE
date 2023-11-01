import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="mx-auto h-screen max-w-[767px] border border-black md:max-w-[880px]">
      <Outlet />
    </div>
  )
}

export default Layout
