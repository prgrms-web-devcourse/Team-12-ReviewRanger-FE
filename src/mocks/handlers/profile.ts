import { rest } from 'msw'

export const profileHandlers = [
  rest.put('/members/profile', async (req, res, ctx) => {
    const { name } = await req.json()
    console.log('이름이 ', name, '으로 변경되었습니다.')

    return res(ctx.status(200), ctx.json({ success: true }))
  }),

  rest.get('/members/logout', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }))
  }),
]
