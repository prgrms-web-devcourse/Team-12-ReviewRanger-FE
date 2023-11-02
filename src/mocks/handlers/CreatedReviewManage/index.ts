import { rest } from 'msw'
import {
  SINGLE_RECIPIENT,
  SINGLE_RESPONSER,
  RECIPIENT,
  RESPONSE,
} from './mockData'

export const createdReviewManageHandlers = [
  rest.get(
    '/surveys/:surveyResultId/recipient/:recipientId',
    async (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(SINGLE_RECIPIENT))
    },
  ),
  rest.get(
    '/surveys/:surveyResultId/reonponser/:responserId',
    async (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(SINGLE_RESPONSER))
    },
  ),
  rest.get('/surveys/:surveyId/responser', async (_, res, ctx) => {
    return res(ctx.status(201), ctx.json(RESPONSE))
  }),

  rest.get('/surveys/:surveyId/recipient', async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(RECIPIENT))
  }),
]
