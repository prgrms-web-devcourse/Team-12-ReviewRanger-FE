export const AUTH_VALIDATION = {
  MESSAGE: {
    VALID: '',
    INVALID: {
      EMAIL: '유효한 이메일 주소가 아니야!',
      NAME: '2 ~ 14자의 문자 또는 숫자로만 만들라구!',
      PASSWORD: '6 ~ 16자로 문자와 숫자를 포함해야 만들라구!',
      PASSWORD_CONFIRM: '비밀번호가 일치하지 않는군!',
    },
  },
  EMAIL_REGEXP: /[a-z0-9]+@[a-z]+\.[a-z]{2,8}$/,
  PASSWORD_REGEXP: /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,16}$/,
  NAME_REGEXP: /^[a-zA-Z0-9가-힣/[\]-]+$/,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 14,
}
