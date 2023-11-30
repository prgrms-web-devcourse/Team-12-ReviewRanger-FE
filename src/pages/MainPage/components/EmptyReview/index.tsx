import { AlertIcon } from '@/assets/icons'

const EmptyReview = ({ message }: { message: string }) => {
  return (
    <div className="mx-auto mt-24 flex w-80 flex-col items-center justify-center gap-4">
      <AlertIcon className="dark:fill-white md:h-8 md:w-8" />
      <p className="text-base dark:text-white md:text-xl">{message}</p>
    </div>
  )
}

export default EmptyReview
