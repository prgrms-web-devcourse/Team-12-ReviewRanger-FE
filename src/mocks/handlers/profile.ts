import { rest } from 'msw'

const users = [
  { name: '김주하', id: 1, email: 'email@naver.com', password: '1234aa' },
  { name: '하야', id: 2, email: 'email123@naver.com', password: '1234aa' },
]

export const profileHandlers = [
  rest.patch('/members/profile-name', async (req, res, ctx) => {
    const { name } = await req.json()

    if (!name.trim()) {
      return res(
        ctx.status(200),
        ctx.json({
          status: 'BAD_REQUEST',
          errorCode: 'BAD_REQUEST',
          message: '이름은 빈 값일 수 없습니다.',
        }),
      )
    }

    if (users.find((user) => user.name === name)) {
      return res(
        ctx.status(200),
        ctx.json({
          status: 'CONFLICT',
          errorCode: 'EXIST_SAME_NAME',
          message: '이미 사용중인 이름입니다.',
        }),
      )
    }

    console.log('이름이 ', name, '으로 변경되었습니다.')

    return res(ctx.status(200), ctx.json({ success: true }))
  }),

  rest.patch('/members/profile-password', async (req, res, ctx) => {
    const password = await req.json()
    if (!password.trim) {
      return res(
        ctx.status(200),
        ctx.json({
          status: 'BAD_REQUEST',
          errorCode: 'BAD_REQUEST',
          message: '비밀번호는 빈 값일 수 없습니다.',
        }),
      )
    }

    console.log('비밀번호가 변경되었습니다.')

    return res(ctx.status(200), ctx.json({ success: true }))
  }),

  rest.get('/members/logout', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }))
  }),
]
