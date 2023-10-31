interface PageIntroProps {
  imageSrc?: string
  description: string
  className?: string
}

const PageIntro = ({
  imageSrc,
  description,
  className = '',
}: PageIntroProps) => {
  return (
    <div
      className={`flex items-center gap-x-8 whitespace-pre-line border-2 p-4 ${className}`}
    >
      {imageSrc && (
        <img
          className="max-w-20 max-h-20 object-cover"
          src={imageSrc}
          alt="페이지를 소개하는 npc 아이콘"
        />
      )}
      <p className={`text-sm sm:text-base`}>{description}</p>
    </div>
  )
}

export default PageIntro
