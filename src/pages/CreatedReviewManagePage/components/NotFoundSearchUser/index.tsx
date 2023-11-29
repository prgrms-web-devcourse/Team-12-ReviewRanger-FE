import { AlertIcon } from '@/assets/icons'

const NotFoundUser = () => {
  return (
    <div className="flex h-[9.375rem] flex-col items-center justify-center border-gray-200">
      <AlertIcon className="fill-black dark:fill-white" />
      <p>검색 결과가 없다!</p>
    </div>
  )
}
export default NotFoundUser
