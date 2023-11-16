import { UseFieldArrayAppend, useFormContext } from 'react-hook-form'
import { CloseIcon } from '@/assets/icons'
import { Question, QuestionType, Review } from '../../types'
import { QUESTION_TYPES } from './constants'

interface QuestionTypeModalProps {
  append: UseFieldArrayAppend<Review, 'questions'>
}

const QuestionTypeModal = ({ append }: QuestionTypeModalProps) => {
  const { clearErrors } = useFormContext<Review>()

  const createOptions = (type: QuestionType): Question['questionOptions'] => {
    switch (type) {
      case 'SUBJECTIVE':
      case 'RATING':
        return []
      case 'HEXASTAT':
        return Array(6).fill({ optionName: '' })
      default:
        return Array(2).fill({ optionName: '' })
    }
  }

  const handleClickType = (type: QuestionType) => {
    const questionOptions = createOptions(type)

    append({
      title: '',
      type,
      isRequired: true,
      questionOptions,
    })

    clearErrors('questions')
  }

  return (
    <div className="modal">
      <label className="modal-overlay" htmlFor="modal-2"></label>
      <div className="modal-content flex w-11/12 max-w-[400px] flex-col rounded-md bg-white p-0 pb-2 dark:bg-main-gray">
        <div className="flex items-center justify-between border-b border-b-gray-400 p-[0.63rem] dark:border-b-gray-100">
          <p className="text-lg text-black dark:text-white md:text-xl">
            질문 형식 선택
          </p>
          <label htmlFor="modal-2" className="btn p-0">
            <CloseIcon className="fill-black dark:fill-white" />
          </label>
        </div>

        <nav className="menu bg-white dark:bg-main-gray">
          <section className="menu-section">
            <a className="menu-items text-lg">
              {QUESTION_TYPES.map(({ label, value, Icon, iconStyle }) => (
                <label
                  key={value}
                  htmlFor="modal-2"
                  className="menu-item relative cursor-pointer p-4 text-black hover:bg-main-ivory dark:text-white dark:hover:bg-gray-300"
                  onClick={() => handleClickType(value)}
                >
                  <i
                    className={`absolute left-4 ${
                      iconStyle === 'fill'
                        ? 'fill-black dark:fill-white'
                        : 'stroke-black dark:stroke-white'
                    }`}
                  >
                    {Icon}
                  </i>
                  <p className="grow text-center text-lg md:text-xl">{label}</p>
                </label>
              ))}
            </a>
          </section>
        </nav>
      </div>
    </div>
  )
}

export default QuestionTypeModal
