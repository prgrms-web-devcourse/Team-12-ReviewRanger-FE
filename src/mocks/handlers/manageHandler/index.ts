import { rest } from 'msw'
import {
  SINGLE_RESPONSER,
  RECIPIENT,
  RESPONSE,
  SINGLE_RECIPIENT_QUESTION,
} from './mockData'

export const manageHandlers = [
  rest.get('/reviews/:reviewId', async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(SINGLE_RECIPIENT_QUESTION))
  }),
  rest.get(
    '/surveys/:surveyResultId/reonponser/:responserId',
    async (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(SINGLE_RESPONSER))
    },
  ),
  rest.get('/reviews/:surveyId/responser', async (_, res, ctx) => {
    return res(ctx.status(201), ctx.json(RESPONSE))
  }),

  rest.get('/reviews/:surveyId/receiver', async (_, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(200), ctx.json(RECIPIENT))
  }),
]
