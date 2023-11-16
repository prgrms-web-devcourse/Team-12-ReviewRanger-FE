import {
  SingleChoiceIcon,
  DropdownIcon,
  TextIcon,
  StarRatingIcon,
  HexagonICon,
  MultipleChoiceIcon,
} from '@/assets/icons'

export const PATH = {
  REVIEW_MANAGEMENT: '/review-management/',
}

export const REVIEW_MANAGE_TAB_MENU_STYLE = {
  responser: 'after:translate-x-[-25%]',
  receiver: 'after:translate-x-[25%]',
}

export const REVIEW_MANAGE_TAB_TITLE = {
  responser: '작성자별',
  receiver: '수신자별',
}

export const QUESTION_TYPE = {
  SINGLE_CHOICE: <SingleChoiceIcon className="fill-dark dark:fill-white" />,
  MULTIPLE_CHOICE: <MultipleChoiceIcon className="fill-dark dark:fill-white" />,
  DROPDOWN: <DropdownIcon className="fill-dark dark:fill-white" />,
  SUBJECTIVE: <TextIcon className="fill-dark dark:fill-white" />,
  STAR_RATING: <StarRatingIcon className="fill-dark dark:fill-white" />,
  HEXASTAT: <HexagonICon className="fill-dark dark:fill-white" />,
}
