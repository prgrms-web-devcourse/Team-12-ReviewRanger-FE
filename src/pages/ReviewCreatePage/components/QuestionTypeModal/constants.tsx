import {
  DropdownIcon,
  HexagonIcon,
  MultipleChoiceIcon,
  SingleChoiceIcon,
  StarRatingIcon,
  SubjectiveIcon,
} from '@/assets/icons'

export const QUESTION_TYPES = [
  {
    label: '객관식 (단일 선택)',
    value: 'SINGLE_CHOICE',
    Icon: <SingleChoiceIcon />,
    iconStyle: 'stroke',
  },
  {
    label: '객관식 (다중 선택)',
    value: 'MULTIPLE_CHOICE',
    Icon: <MultipleChoiceIcon />,
    iconStyle: 'stroke',
  },
  {
    label: '드롭다운',
    value: 'DROPDOWN',
    Icon: <DropdownIcon />,
    iconStyle: 'fill',
  },
  {
    label: '주관식',
    value: 'SUBJECTIVE',
    Icon: <SubjectiveIcon />,
    iconStyle: 'fill',
  },
  {
    label: '별점',
    value: 'RATING',
    Icon: <StarRatingIcon />,
    iconStyle: 'stroke',
  },
  {
    label: '육각형 스탯',
    value: 'HEXASTAT',
    Icon: <HexagonIcon />,
    iconStyle: 'stroke',
  },
] as const
