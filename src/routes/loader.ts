import { redirect } from 'react-router-dom'
import { TOKEN_KEY } from '@/constants'

const loginLoader = async () => {
  const token = localStorage.getItem(TOKEN_KEY)

  if (!token) {
    return redirect('/login')
  }

  return null
}

const unLoginLoader = async () => {
  const token = localStorage.getItem(TOKEN_KEY)

  if (token) {
    return redirect('/')
  }

  return null
}

export { loginLoader, unLoginLoader }
