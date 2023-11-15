import { useState, MouseEvent } from 'react'
import { QuestionOption } from '@/apis/hooks/useGetReviewFirst'
import { CheckIcon } from '@/assets/icons'

interface ReplyChoiceProps {
  options: QuestionOption[]
  type?: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE'
}

const ReplyChoice = ({ options, type = 'SINGLE_CHOICE' }: ReplyChoiceProps) => {
  const [selectedOptions, setSelectedOptions] = useState<QuestionOption[]>([])

  const handleClickOption = (e: MouseEvent<HTMLLIElement>) => {
    const selectedTarget = options.find(
      (option) => option.optionId === e.currentTarget.value,
    )

    if (!selectedTarget) {
      return
    }

    if (type === 'SINGLE_CHOICE') {
      setSelectedOptions([selectedTarget])
    } else {
      if (selectedOptions.includes(selectedTarget)) {
        setSelectedOptions(
          selectedOptions.filter(
            (selectedOption) => selectedOption !== selectedTarget,
          ),
        )
      } else {
        setSelectedOptions([...selectedOptions, selectedTarget])
      }
    }
  }

  return (
    <ul className="flex flex-col gap-5">
      {options.map((option) => (
        <li
          key={option.optionId}
          value={option.optionId}
          onClick={handleClickOption}
          className={`flex items-center justify-center gap-4 rounded-md border p-2.5 text-lg ${
            selectedOptions.includes(option)
              ? 'border-sub-green bg-[#F1FFE7] text-black dark:bg-[rgba(81,156,23,0.20)] dark:text-white'
              : 'border-gray-100 bg-white text-gray-200 dark:border-gray-200 dark:bg-main-red-200 dark:text-gray-100'
          }`}
        >
          <p>{option.optionName}</p>
          <div className="h-4 w-4 shrink-0">
            {selectedOptions.includes(option) && (
              <CheckIcon className="h-4 w-4 fill-sub-green" />
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ReplyChoice
