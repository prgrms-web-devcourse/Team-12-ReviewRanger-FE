import {
  SingleChoiceIcon,
  DropdownIcon,
  TextIcon,
  StarRatingIcon,
  HexagonIcon,
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
  SINGLE_CHOICE: (
    <SingleChoiceIcon className="fill-dark stroke-black dark:fill-white dark:stroke-white" />
  ),
  MULTIPLE_CHOICE: (
    <MultipleChoiceIcon className="fill-dark stroke-black dark:fill-white dark:stroke-white" />
  ),
  DROPDOWN: (
    <DropdownIcon className="fill-dark stroke-black dark:fill-white dark:stroke-white" />
  ),
  SUBJECTIVE: (
    <TextIcon className="fill-dark stroke-black dark:fill-white dark:stroke-white" />
  ),
  RATING: (
    <StarRatingIcon className="fill-dark stroke-black dark:fill-white dark:stroke-white" />
  ),
  HEXASTAT: (
    <HexagonIcon className="fill-dark stroke-black dark:fill-white dark:stroke-white" />
  ),
}

export const DEFAULT_VALUE = {
  TEXT: '',
  VALUE: 0,
}
