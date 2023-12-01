import { BasicProfile } from '@/assets/images'
import RenderRefinedSubjective from './RenderRefinedSubjective'
import { Answer } from './'

interface RenderSubjeciveAnswerProps {
  reviewStatus?: 'END' | 'DEADLINE' | 'PROCEEDING'
  role?: 'responser' | 'receiver'
  value: Answer
  isLastAnswer: boolean
  text: string
  questionId: number
  reviewId: number
  userId: string
}

const RenderSubjectiveAnswer = ({
  reviewStatus,
  role,
  value,
  isLastAnswer,
  ...rest
}: RenderSubjeciveAnswerProps) => (
  <>
    <h3 className="flex items-center ">
      <img
        src={BasicProfile}
        className="avatar h-[1.25rem] w-[1.25rem] border dark:bg-white dark:fill-white"
      />
      <p className="ml-[1.31rem] text-sm">{value?.userName}</p>
    </h3>
    <p className="ml-[42.96px] mt-[0.5rem] break-all  text-base leading-5 md:mt-[0.62rem]">
      {value?.value}
    </p>

    {isLastAnswer && role !== 'responser' && reviewStatus !== 'PROCEEDING' && (
      <RenderRefinedSubjective {...rest} />
    )}
  </>
)

export default RenderSubjectiveAnswer
