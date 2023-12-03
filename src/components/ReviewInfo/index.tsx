interface ReviewInfoProps {
  title: string
  description: string
}

const ReviewInfo = ({ title, description }: ReviewInfoProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-black dark:text-white md:text-4xl">
        {title}
      </h1>
      <p className="mt-[0.63rem] whitespace-pre-line text-base text-black dark:text-white md:text-xl">
        {description}
      </p>
    </div>
  )
}

export default ReviewInfo
