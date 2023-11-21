import { rest } from 'msw'

const ALL_USERS = [
  {
    id: 1,
    name: '김아무개',
  },
  {
    id: 2,
    name: '김잼민',
  },
  {
    id: 3,
    name: '김빡빡',
  },
]

export const createHandlers = [
  rest.post('/surveys', async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }))
  }),

  rest.get('/members', async (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        data: ALL_USERS,
      }),
    )
  }),
]
