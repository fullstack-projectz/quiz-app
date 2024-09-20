// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-case': [2, 'always', 'lower-case'],

    'subject-max-length': [2, 'always', 72],
    'type-enum': [
      2,
      'always',
      [
        'auth',
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
  },
};
