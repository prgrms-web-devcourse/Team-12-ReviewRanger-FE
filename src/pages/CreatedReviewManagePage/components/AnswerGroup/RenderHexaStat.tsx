import { nanoid } from 'nanoid'
import { BasicProfile } from '@/assets/images'
import { Answer } from '.'

const RenderHexaStat = ({
  value,
  answers,
}: {
  value: Answer
  answers: Answer[]
}) => {
  const filteredAnswers = answers.filter((answer) => answer.name === value.name)

  return (
    <>
      <div>
        <h2 className="mb-4 flex h-fit w-fit items-center justify-center bg-gray-300 px-2 text-sm text-white md:text-base">
          {value?.name}
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-4 md:gap-6">
        {filteredAnswers.map((value) => (
          <div className="flex justify-between gap-2" key={nanoid()}>
            <div className="flex gap-2">
              <img
                src={BasicProfile}
                className="avatar h-5 w-5 border dark:bg-white dark:fill-white"
              />

              <p className="text-sm md:text-lg">{value?.userName}</p>
            </div>
            <p className="shrink-0 text-sm text-sub-wine md:text-lg">
              {value?.value}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}

export default RenderHexaStat
