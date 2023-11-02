import { rest } from 'msw'
import { ALL_USERS } from './dummyData'

export const createHandlers = [
  rest.post('/surveys', async (req, res, ctx) => {
    const survey = await req.json()
    console.log(survey)

    return res(ctx.status(200), ctx.json({ success: true }))
  }),

  rest.get('/members', async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(ALL_USERS))
  }),
]
