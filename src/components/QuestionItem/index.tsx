import { PropsWithChildren } from 'react'
import { MenuIcon } from '@/assets/icons'

interface QuestionBoxProps {
  questionId: number
  questionTitle: '객관식' | '주관식' | '별점' | '드롭다운' | '육각형 스탯'
}

const QuestionBox = ({
  questionId,
  questionTitle,
  children,
}: PropsWithChildren<QuestionBoxProps>) => {
  const handleClickClone = () => {
    // TODO: 질문 복제 기능 구현
  }

  const handleClickDelete = () => {
    // TODO: 질문 삭제 기능 구현
    console.log(questionId)
  }

  return (
    <div className="flex flex-col gap-y-4 border border-gray-300 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold sm:text-lg">{questionTitle}</h2>
        <div className="dropdown">
          <MenuIcon className="cursor-pointer" tabIndex={0} />
          <div className="dropdown-menu">
            <a className="dropdown-item text-sm" onClick={handleClickClone}>
              질문 복제
            </a>
            <a className="dropdown-item text-sm" onClick={handleClickDelete}>
              질문 삭제
            </a>
          </div>
        </div>
      </div>
      <input
        className="border border-gray-300 p-2 text-xs outline-none sm:text-sm"
        placeholder="질문 제목을 입력해주세요."
      />
      {children}
    </div>
  )
}

export default QuestionBox
