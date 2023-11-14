import { Dispatch, SetStateAction } from 'react'
import {
  CloseIcon,
  DropdownIcon,
  HexagonICon,
  MultipleChoiceIcon,
  SingleChoiceIcon,
  StarRatingIcon,
  SubjectiveIcon,
} from '@/assets/icons'
import { Question } from '../../types'

interface QuestionTypeSelectProps {
  setQuestions: Dispatch<SetStateAction<Question[]>>
}

const QuestionTypeSelect = ({ setQuestions }: QuestionTypeSelectProps) => {
  return (
    <div className="modal">
      <label className="modal-overlay" htmlFor="modal-2"></label>
      <div className="modal-content flex w-5/6 max-w-[550px] flex-col rounded-md bg-white p-[0.63rem] dark:bg-main-gray">
        <div className="flex items-center justify-between border-b border-b-gray-200 dark:border-b-gray-100">
          <p className="text-lg text-black dark:text-white">질문 형식 선택</p>
          <label htmlFor="modal-2" className="btn p-0">
            <CloseIcon className="fill-black dark:fill-white" />
          </label>
        </div>

        <nav className="menu bg-white dark:bg-main-gray">
          <section className="menu-section">
            <div className="menu-items text-lg">
              <label
                htmlFor="modal-2"
                className="btn-block menu-item relative cursor-pointer py-4 text-black dark:text-white"
                onClick={() =>
                  setQuestions((prevQuestions) => {
                    return [
                      ...prevQuestions,
                      {
                        title: '',
                        type: 'SINGLE_CHOICE',
                        isRequired: true,
                        questionOptions: [{ optionName: '' }],
                      },
                    ]
                  })
                }
              >
                <SingleChoiceIcon className="absolute left-0 stroke-black dark:stroke-white" />
                <p className="grow text-center">객관식 (단일 선택)</p>
              </label>
              <label
                htmlFor="modal-2"
                className="menu-item relative cursor-pointer py-4 text-black dark:text-white"
                onClick={() =>
                  setQuestions((prevQuestions) => {
                    return [
                      ...prevQuestions,
                      {
                        title: '',
                        type: 'MULTIPLE_CHOICE',
                        isRequired: true,
                        questionOptions: [{ optionName: '' }],
                      },
                    ]
                  })
                }
              >
                <MultipleChoiceIcon className="absolute left-0 stroke-black dark:stroke-white" />
                <p className="grow text-center">객관식 (다중 선택)</p>
              </label>
              <label
                htmlFor="modal-2"
                className="menu-item relative cursor-pointer py-4 text-black dark:text-white"
                onClick={() =>
                  setQuestions((prevQuestions) => {
                    return [
                      ...prevQuestions,
                      {
                        title: '',
                        type: 'DROPDOWN',
                        isRequired: true,
                        questionOptions: [{ optionName: '' }],
                      },
                    ]
                  })
                }
              >
                <DropdownIcon className="absolute left-0 fill-black dark:fill-white" />
                <p className="grow text-center">드롭다운</p>
              </label>
              <label
                htmlFor="modal-2"
                className="menu-item relative cursor-pointer py-4 text-black dark:text-white"
                onClick={() =>
                  setQuestions((prevQuestions) => {
                    return [
                      ...prevQuestions,
                      {
                        title: '',
                        type: 'SUBJECTIVE',
                        isRequired: true,
                        questionOptions: [{ optionName: '' }],
                      },
                    ]
                  })
                }
              >
                <SubjectiveIcon className="absolute left-0 fill-black dark:fill-white" />
                <p className="grow text-center">주관식</p>
              </label>
              <label
                htmlFor="modal-2"
                className="menu-item relative cursor-pointer py-4 text-black dark:text-white"
                onClick={() =>
                  setQuestions((prevQuestions) => {
                    return [
                      ...prevQuestions,
                      {
                        title: '',
                        type: 'STAR_RATING',
                        isRequired: true,
                        questionOptions: [{ optionName: '' }],
                      },
                    ]
                  })
                }
              >
                <StarRatingIcon className="absolute left-0 stroke-black dark:stroke-white" />
                <p className="grow text-center">별점</p>
              </label>
              <label
                htmlFor="modal-2"
                className="menu-item relative cursor-pointer py-4 text-black dark:text-white"
                onClick={() =>
                  setQuestions((prevQuestions) => {
                    return [
                      ...prevQuestions,
                      {
                        title: '',
                        type: 'HEXASTAT',
                        isRequired: true,
                        questionOptions: [{ optionName: '' }],
                      },
                    ]
                  })
                }
              >
                <HexagonICon className="absolute left-0 stroke-black dark:stroke-white" />
                <p className="grow text-center">육각형 스택</p>
              </label>
            </div>
          </section>
        </nav>
      </div>
    </div>
  )
}

export default QuestionTypeSelect
