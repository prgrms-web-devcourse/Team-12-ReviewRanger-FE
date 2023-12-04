import {
  SingleChoiceIcon,
  DropdownIcon,
  StarRatingIcon,
  HexagonIcon,
  MultipleChoiceIcon,
  SubjectiveIcon,
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
  SINGLE_CHOICE: <SingleChoiceIcon className="dark:stroke-white" />,
  MULTIPLE_CHOICE: (
    <MultipleChoiceIcon className="stroke-black dark:stroke-white" />
  ),
  DROPDOWN: <DropdownIcon className="dark:fill-white" />,
  SUBJECTIVE: <SubjectiveIcon className="dark:fill-white" />,
  RATING: <StarRatingIcon className="dark:stroke-white" />,
  HEXASTAT: <HexagonIcon className="dark:stroke-white" />,
}

export const DEFAULT_VALUE = {
  TEXT: '',
  VALUE: 0,
}
