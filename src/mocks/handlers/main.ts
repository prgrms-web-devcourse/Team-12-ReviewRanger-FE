import { rest } from 'msw'
import {
  CREATED_REVIEWS,
  INVITED_REVIEWS,
  RECEIVED_REVIEWS,
  REVIEW_QUESTION,
  REVIEW_RESULT,
} from './dummyData'

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
  rest.get('/received-reviews/:afterResultId', async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(REVIEW_RESULT))
  }),
  rest.put('/invited-surveys', async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }))
  }),
]
