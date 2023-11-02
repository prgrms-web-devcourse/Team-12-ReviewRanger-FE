import { rest } from 'msw'

interface userType {
  email: string
  name: string
  password: string
}

const users: userType[] = []

export const signUpHandlers = [
  rest.post('/sign-up', async (req, res, ctx) => {
    users.push(await req.json())
    console.log(users)

    return res(ctx.status(201))
  }),

  rest.post('members/check-email', async (req, res, ctx) => {
    const email = await req.json().then((email) => email.email)
    const emailDuplicated =
      users.find((user) => user.email === email)?.email === email

    return res(ctx.status(200), ctx.json({ success: !emailDuplicated }))
  }),

  rest.post('members/check-name', async (req, res, ctx) => {
    const name = await req.json().then((name) => name.name)
    const nameDuplicated =
      users.find((user) => user.name === name)?.name === name

    return res(ctx.status(200), ctx.json({ success: !nameDuplicated }))
  }),
]
