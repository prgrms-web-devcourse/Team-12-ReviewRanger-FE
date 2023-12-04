import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const useCheckHeaderRoute = () => {
  const location = useLocation()
  const [logoButtonClicked, setLogoButtonClicked] = useState<boolean>(false)
  const [prevButtonClicked, setPrevButtonClicked] = useState<boolean>(false)
  const [myPageButtonClicked, setMyPageButtonClicked] = useState<boolean>(false)

  useEffect(() => {
    if (
      location.pathname === '/review-creation' ||
      location.pathname.includes('/review-response')
    ) {
      setLogoButtonClicked(true)
      setPrevButtonClicked(true)
      setMyPageButtonClicked(true)
    } else {
      setLogoButtonClicked(false)
      setPrevButtonClicked(false)
      setMyPageButtonClicked(false)
    }

    return () => {
      setLogoButtonClicked(false)
      setMyPageButtonClicked(false)
      setPrevButtonClicked(false)
    }
  }, [])

  return { logoButtonClicked, prevButtonClicked, myPageButtonClicked }
}

export default useCheckHeaderRoute
