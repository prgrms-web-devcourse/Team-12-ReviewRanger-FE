interface PageIntroProps {
  imageSrc?: string
  description: string
  colorTheme: string
}

const PageIntro = ({ imageSrc, description, colorTheme }: PageIntroProps) => {
  const boxDefaultStyle = `border-2 p-4 whitespace-pre-line border-${colorTheme}-500`
  const textDefaultStyle = `text-${colorTheme}-900 text-sm sm:text-base`

  return imageSrc ? (
    <div className={`flex items-center gap-x-8 ${boxDefaultStyle}`}>
      <img
        className="max-w-20 max-h-20 object-cover"
        src={imageSrc}
        alt="페이지를 소개하는 npc 아이콘"
      />
      <p className={`${textDefaultStyle}`}>{description}</p>
    </div>
  ) : (
    <div className={`${boxDefaultStyle}`}>
      <p className={`${textDefaultStyle}`}>{description}</p>
    </div>
  )
}

export default PageIntro
