import { rest } from 'msw'

const jwt = [
  'k8rM79Uw5_OQhy5WyFShNLWlROQlUfLs0vrmwxrdExE',
  '17mZ3Zs8v6s52gyyTF6MQvCMGBm5N55fKw1rbRmgn1U',
  '0y75qDcAFQphieDk4A4LP0FFLL_HV1fYeYXj_3J7GuA',
  'q3Xb6fKcmjUbNMRgQc5RmPtFftnLwWMqqsv_8c4z2aM',
  'jtfXXPvyyLZzDsp8n2rZ9P-lv8eNKIeOLu8-7HzqJn4',
  'UaYubrDzEeQlzQdm76M7JLZyIm-sFURg_j7W7ERcHqM',
  'tlySO3Stf6E-sr8KgMKGLO3_N0rDL6PWzBlyFET65uQ',
  'SQhV9NbwK-oSd-SWnRJm3kFGlPklgUL7Zr_voPw2bQI',
  'D_rAjYzQGOIOWH09wIKm3xPR2Y24TZbXWsjsjMxwYVQ',
  'jFRvyc-xFLdWmE1TJl-6Qtv2aZyUaa-U_8nmQwru_kA',
]

export const loginHandlers = [
  rest.post('/login', async (_, res, ctx) => {
    const rand = Math.floor(Math.random() * 10)

    return res(
      ctx.status(200),
      ctx.json({
        accessToken: jwt[rand],
        name: '효중',
        email: '1232@naver.com',
      }),
    )
  }),
]
