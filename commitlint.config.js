module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
        'content', // For mythological content additions
        'ui', // For UI/UX improvements
        'story', // For story-related features
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        'app',
        'theme',
        'typography',
        'navigation',
        'stories',
        'ramayana',
        'mahabharata',
        'characters',
        'audio',
        'images',
        'config',
        'utils',
        'types',
        'components',
        'screens',
        'hooks',
        'services',
        'constants',
      ],
    ],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
  },
};
