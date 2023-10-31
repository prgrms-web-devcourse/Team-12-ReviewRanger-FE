import { PropsWithChildren } from 'react'
import { Profile } from '..'

interface PersonalAnswerProps {
  image?: string | JSX.Element
  name: string
  type?: 'basic' | 'hexagon'
}

const PersonalAnswer = ({
  image,
  name,
  children,
  type = 'basic',
}: PropsWithChildren<PersonalAnswerProps>) => {
  return (
    <>
      <div
        className={`flex ${
          type === 'basic'
            ? 'w-80 flex-col border border-black'
            : 'flew-row w-fit items-center'
        } flex-row gap-1.5 p-2`}
      >
        <Profile image={image} name={name} />
        <div className={`${type === 'basic' ? 'px-6' : 'px-1'}`}>
          {children}
        </div>
      </div>
    </>
  )
}

export default PersonalAnswer
