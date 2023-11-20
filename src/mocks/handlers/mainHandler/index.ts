import { rest } from 'msw'
import {
  CREATED_REVIEWS,
  INVITED_REVIEWS,
  RECEIVED_REVIEWS,
  REVIEW_QUESTION,
  REVIEW_RESULT,
  REVIEW_RESULT_QNA,
} from './mockData'

export const mainHandlers = [
  rest.get('/invited-surveys', async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(INVITED_REVIEWS))
  }),
  rest.get('/created-surveys', async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(CREATED_REVIEWS))
  }),
  rest.get('/received-reviews', async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(RECEIVED_REVIEWS))
  }),
  rest.get('/invited-surveys/:surveyResultId', async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(REVIEW_QUESTION))
  }),
  rest.get('/final-results/:finalReviewId', async (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: REVIEW_RESULT,
      }),
    )
  }),
  rest.get('/final-results/:finalReviewId/qna', async (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: REVIEW_RESULT_QNA,
      }),
    )
  }),
]
