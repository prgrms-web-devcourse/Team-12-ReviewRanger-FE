import { PropsWithChildren } from 'react'
import { CloseIcon } from '@/assets/icons'

interface ModalProps {
  content: string
  label: string
  handleClickLabel: () => void
  handleCloseModal?: () => void
}

const Modal = ({
  children,
  content,
  label,
  handleClickLabel,
  handleCloseModal,
}: PropsWithChildren<ModalProps>) => {
  return (
    <>
      {children}
      <input className="modal-state" id="modal-1" type="checkbox" />
      <div className="modal">
        <label className="modal-overlay" htmlFor="modal-1"></label>
        <div className="modal-content flex w-80 flex-col items-center gap-8 rounded-md bg-white p-5 dark:bg-main-gray">
          <label
            htmlFor="modal-1"
            className="btn h-fit w-fit justify-center self-end bg-transparent p-0"
            onClick={(e) => e.stopPropagation()}
          >
            <CloseIcon className="dark:fill-white" />
          </label>
          <span className="text-center text-base dark:text-white md:text-xl">
            {content}
          </span>
          <div className="flex w-full gap-6">
            <label
              htmlFor="modal-1"
              className="btn w-full rounded-md border border-gray-300 bg-transparent px-8 text-base dark:border-gray-100 dark:text-white"
              onClick={handleCloseModal}
            >
              취소
            </label>
            <button
              className="btn w-full rounded-md bg-active-orange px-8 text-base text-white dark:text-black md:text-lg"
              onClick={handleClickLabel}
            >
              {label}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
