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
      <p className="ml-5 text-sm md:text-lg">{value?.userName}</p>
    </h3>
    <p className="ml-10 mt-2 text-base leading-5 md:mt-2.5 md:text-xl">
      {value?.value}
    </p>

    {isLastAnswer && role !== 'responser' && reviewStatus !== 'PROCEEDING' && (
      <RenderRefinedSubjective {...rest} />
    )}
  </>
)

export default RenderSubjectiveAnswer
