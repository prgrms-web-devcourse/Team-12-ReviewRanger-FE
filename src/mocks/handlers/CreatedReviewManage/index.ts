import { rest } from 'msw'


 const createdReviewManagehandlers = [
  rest.get('/surveys/:surveyId/responser', async(req, res, ctx) => {
    const data = {
      surveyId: `${Math.random().toString(36).substring(2, 10)}${Date.now()}`,
      title: '데브코스 1차 피어리뷰',
      responserCount: 5,
      surveyType: '피어리뷰',
      responsers: Array(5)
        .fill(0)
        .map((_, index) => ({
          surveyResultId: `${Math.random()
            .toString(36)
            .substring(2, 10)}${Date.now()}`,
          responserId: `${Math.random()
            .toString(36)
            .substring(2, 10)}${Date.now()}`,
          responserName: `김효중${index}`,
          updatedAt: new Date().toUTCString(),
        })),
    }

    return res(ctx.status(200), ctx.json(data))
  }),

  rest.get('/surveys/:surveyId/recipient', async(req, res, ctx) => {
    const data = {
      recipientList: Array(5)
        .fill(0)
        .map((_, index) => ({
          surveyResultId: `${Math.random()
            .toString(36)
            .substring(2, 10)}${Date.now()}`,
          recipientId: `${Math.random()
            .toString(36)
            .substring(2, 10)}${Date.now()}`,
          recipientName: `김효중${index}`,
          updatedAt: new Date().toUTCString(),
          responserCount: index,
        })),
    }

    return res(ctx.status(200), ctx.json(data))
  }),
]
export default createdReviewManagehandlers