import { useEditProfile } from '@/apis/hooks'

const MyPage = () => {
  const { mutate: editProfile } = useEditProfile()
  const name = 'juha'

  const handleButtonClick = () => {
    editProfile(
      { name },
      {
        onSuccess: ({ data }) => {
          console.log(data)
        },
      },
    )
  }

  return (
    <div>
      <div>마이페이지</div>
      <button className="btn" onClick={handleButtonClick}>
        테스트 버튼
      </button>
    </div>
  )
}

export default MyPage
