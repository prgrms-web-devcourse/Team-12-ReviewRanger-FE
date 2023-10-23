// eslint-disable-next-line no-undef
module.exports = {
  plugins: ['commitlint-plugin-function-rules'],
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],

    'function-rules/scope-enum': [
      2,
      'always',
      ({ header }) => {
        const regex = /(feat|style|fix|refactor|docs|chore)+: .+/;
        if (regex.test(header)) {
          return [true];
        }
        return [
          false,
          '커밋 형식은 (feat,style..etc): 메시지의 형태여야 합니다.',
        ];
      },
    ],
  },
};
