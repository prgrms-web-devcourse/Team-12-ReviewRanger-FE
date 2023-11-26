import type { FallbackProps } from 'react-error-boundary'
import { useNavigate } from 'react-router-dom'
import { errorImg, errorLightImg, sansDark, sansLight } from '@/assets/images'

const ErrorPage = ({ error, resetErrorBoundary }: Partial<FallbackProps>) => {
  console.log('하잉')
  console.log(error)
  const navigate = useNavigate()

  return (
    <div className="mx-auto flex h-screen flex-col items-center justify-center gap-8 px-5 text-center">
      <img src={errorImg} alt="에러 메시지" className="mx-auto dark:hidden" />
      <img
        src={errorLightImg}
        alt="에러 메시지"
        className="hidden dark:block"
      />
      <div className="mx-auto h-40 w-40">
        <img src={sansDark} alt="샌즈 캐릭터" className="dark:hidden" />
        <img src={sansLight} alt="샌즈 캐릭터" className="hidden dark:block" />
      </div>
      <p className="whitespace-pre-line text-xl dark:text-white md:text-2xl">
        잘못된 접근입니다.
      </p>
      <button
        className="btn w-full max-w-[15.625rem] rounded-md bg-active-orange text-lg text-white dark:text-black md:text-xl"
        onClick={() => navigate('/')}
      >
        홈으로
      </button>
    </div>
  )
}

export default ErrorPage
