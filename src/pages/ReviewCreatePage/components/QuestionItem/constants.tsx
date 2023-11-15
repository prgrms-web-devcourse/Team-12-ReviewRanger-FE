import {
  DropdownIcon,
  HexagonICon,
  MultipleChoiceIcon,
  SingleChoiceIcon,
  StarRatingIcon,
  SubjectiveIcon,
} from '@/assets/icons'

export const QUESTION_TYPES = {
  SINGLE_CHOICE: {
    label: '객관식 (단일 선택)',
    Icon: <SingleChoiceIcon />,
    iconStyle: 'stroke',
  },
  MULTIPLE_CHOICE: {
    label: '객관식 (다중 선택)',
    Icon: <MultipleChoiceIcon />,
    iconStyle: 'stroke',
  },
  DROPDOWN: {
    label: '드롭다운',
    Icon: <DropdownIcon />,
    iconStyle: 'fill',
  },
  SUBJECTIVE: {
    label: '주관식',
    Icon: <SubjectiveIcon />,
    iconStyle: 'fill',
  },
  STAR_RATING: {
    label: '별점',
    Icon: <StarRatingIcon />,
    iconStyle: 'stroke',
  },
  HEXASTAT: {
    label: '육각형 스탯',
    Icon: <HexagonICon />,
    iconStyle: 'stroke',
  },
}
