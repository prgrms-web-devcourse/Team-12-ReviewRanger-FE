import { rest } from 'msw'

export const responseHandlers = [
  rest.post('/participation', async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }))
  }),

  rest.put('/invited-surveys', async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }))
  }),
]
