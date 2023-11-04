import { PropsWithChildren } from 'react'

interface PageIntroProps {
  imageSrc?: string
  className?: string
}

const PageIntro = ({
  imageSrc,
  className = '',
  children,
}: PropsWithChildren<PageIntroProps>) => {
  return (
    <div
      className={`flex items-center whitespace-pre-line border border-black dark:border-white ${className}`}
    >
      {imageSrc && (
        <img
          className="max-h-12 object-cover md:max-h-20"
          src={imageSrc}
          alt="페이지를 소개하는 npc 아이콘"
        />
      )}
      {children}
    </div>
  )
}

export default PageIntro
