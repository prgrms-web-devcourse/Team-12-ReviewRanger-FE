import { rest } from 'msw'

export const responseHandlers = [
  rest.post('/participation', async (req, res, ctx) => {
    const answer = await req.json()
    console.log(answer)

    return res(ctx.status(200), ctx.json({ success: true }))
  }),

  rest.put('/invited-surveys', async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }))
  }),
]
