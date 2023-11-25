import { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import {
  CreatedReviewManagePage,
  ErrorPage,
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
import { loginLoader, unLoginLoader } from './loader'

const router = createBrowserRouter([
  {
    path: PATH.MAIN,
    element: <Layout />,
    children: [
      {
        path: PATH.MAIN,
        element: <MainPage />,
        loader: loginLoader,
      },
      {
        path: PATH.SIGN_UP,
        element: <SignUpPage />,
        loader: unLoginLoader,
      },
      {
        path: PATH.LOGIN,
        element: <LoginPage />,
        loader: unLoginLoader,
      },
      {
        path: PATH.REVIEW_CREATION,
        element: (
          <Suspense>
            <ReviewCreatePage />
          </Suspense>
        ),
        loader: loginLoader,
      },
      {
        path: PATH.REVIEW_MANAGEMENT,
        element: (
          <Suspense>
            <CreatedReviewManagePage />
          </Suspense>
        ),
        loader: loginLoader,
      },
      {
        path: PATH.REVIEW_RESPONSE,
        element: (
          <Suspense>
            <ReviewReplyPage />
          </Suspense>
        ),
        loader: loginLoader,
      },
      {
        path: PATH.REVIEW_RESULT,
        element: <ReviewResultPage />,
        loader: loginLoader,
      },
      {
        path: PATH.PROFILE,
        element: <MyPage />,
        loader: loginLoader,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
])

export default router
