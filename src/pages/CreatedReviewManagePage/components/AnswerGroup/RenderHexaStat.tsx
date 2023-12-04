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
        <h2 className="mb-[0.81rem] flex h-[1.375rem] w-fit items-center justify-center bg-gray-300 p-2 text-sm text-white">
          {value?.name}
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {filteredAnswers.map((value) => (
          <div className="flex gap-[0.31rem]" key={nanoid()}>
            <img
              src={BasicProfile}
              className="avatar h-[1.25rem] w-[1.25rem] border dark:bg-white dark:fill-white"
            />

            <p className="text-sm">{value?.userName}</p>
            <p className="text-sm text-sub-wine">{value?.value}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default RenderHexaStat
