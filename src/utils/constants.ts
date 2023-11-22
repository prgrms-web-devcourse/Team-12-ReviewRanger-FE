export const AUTH_VALIDATION = {
  MESSAGE: {
    VALID: '',
    INVALID: {
      EMAIL: '유효한 이메일 형식이 아닙니다.',
      NAME: '2 ~ 14자의 문자 또는 숫자로 만들어주세요.',
      PASSWORD: '8 ~ 25자로 문자와 숫자를 포함해야 합니다.',
      PASSWORD_CONFIRM: '비밀번호가 일치하지 않습니다.',
    },
  },
  EMAIL_REGEXP: /[a-z0-9]+@[a-z]+\.[a-z]{2,8}$/,
  PASSWORD_REGEXP: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/,
  NAME_REGEXP: /^[a-zA-Z0-9가-힣/[\]-]+$/,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 14,
}
