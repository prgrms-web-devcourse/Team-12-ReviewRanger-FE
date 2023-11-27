import { Header } from '@/components'

const ResultSkeleton = () => {
  return (
    <div className="h-full">
      <Header />

      <div className="mx-auto flex max-w-[37.5rem] flex-col px-5 py-7">
        <div className="flex flex-col gap-5">
          <div className="justify-between md:flex">
            <div className="skeleton h-5 w-32"></div>
            <div className="skeleton h-5 w-[18rem]"></div>
          </div>

          <div className="flex justify-between">
            <div className="skeleton h-6"></div>
          </div>
          <div className="skeleton h-5"></div>
        </div>
        <div className="skeleton mt-8 h-80"></div>
      </div>
    </div>
  )
}

export default ResultSkeleton
