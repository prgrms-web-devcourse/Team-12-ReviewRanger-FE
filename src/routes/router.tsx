import { createBrowserRouter } from 'react-router-dom'
import {
  CreatedReviewManagePage,
  LoginPage,
  MainPage,
  MyPage,
  ReviewCreatePage,
  ReviewReplyPage,
  ReviewResultPage,
  SignUpPage,
} from '@/pages'
import Layout from './Layout'
import { PATH } from './constants'

const router = createBrowserRouter([
  {
    path: PATH.MAIN,
    element: <Layout />,
    children: [
      {
        path: PATH.MAIN,
        element: <MainPage />,
      },
      {
        path: PATH.SIGN_UP,
        element: <SignUpPage />,
      },
      {
        path: PATH.LOGIN,
        element: <LoginPage />,
      },
      {
        path: PATH.REVIEW_CREATION,
        element: <ReviewCreatePage />,
      },
      {
        path: PATH.REVIEW_MANAGEMENT,
        element: <CreatedReviewManagePage />,
      },
      {
        path: PATH.REVIEW_RESPONSE,
        element: <ReviewReplyPage />,
      },
      {
        path: PATH.REVIEW_RESULT,
        element: <ReviewResultPage />,
      },
      {
        path: PATH.PROFILE,
        element: <MyPage />,
      },
    ],
  },
])

export default router
