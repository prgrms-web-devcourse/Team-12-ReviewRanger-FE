import { z } from 'zod'

export type loginSchmaType = z.infer<typeof loginSchema>

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: '이메일을 입력해주세요',
    })
    .email('이메일 형식을 입력해주세요'),
  password: z
    .string()
    .min(1, {
      message: '비밀번호를 입력해주세요',
    })
    .regex(
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
      '영문+숫자+특수문자(! @ # $ % & * ?) 조합 8~15자리를 입력해주세요.',
    ),
})
