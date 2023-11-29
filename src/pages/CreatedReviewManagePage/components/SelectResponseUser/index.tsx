import { nanoid } from 'nanoid'
import { Profile } from '@/components'

interface SelectResponserUser {
  allUser: string[]
  selectedName: string
  setSelectedName: React.Dispatch<React.SetStateAction<string>>
}

const SelectResponseUser = ({
  allUser,
  selectedName,
  setSelectedName,
}: SelectResponserUser) => {
  return (
    <ul className=" flex gap-2.5 overflow-x-auto">
      {allUser.map((name) => (
        <li
          value={name}
          onClick={() => setSelectedName(name)}
          key={nanoid()}
          className={`flex h-fit shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md border px-2 py-1.5 
          ${
            name === selectedName
              ? 'border-black bg-main-yellow dark:border-white dark:bg-main-red-300'
              : 'border-gray-100 bg-white dark:border-gray-300 dark:bg-main-red-200'
          }`}
        >
          <Profile
            name={name}
            className={`${
              selectedName === name
                ? 'text-black dark:text-white'
                : 'text-gray-300 dark:text-gray-100'
            }`}
          />
        </li>
      ))}
    </ul>
  )
}

export default SelectResponseUser
