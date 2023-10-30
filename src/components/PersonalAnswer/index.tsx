import { ReactNode } from 'react'
import { Profile } from '..'

interface PersonalAnswerProps {
  image?: string | ReactNode
  name: string
  answer?: ReactNode
}

const PersonalAnswer = ({ image, name, answer }: PersonalAnswerProps) => {
  return (
    <>
      <div className="flex w-80 flex-col gap-1.5 border border-black p-2">
        <Profile image={image} name={name} />
        <div className="px-6">{answer}</div>
      </div>
    </>
  )
}

export default PersonalAnswer
