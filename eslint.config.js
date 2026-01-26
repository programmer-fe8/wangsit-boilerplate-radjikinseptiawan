import config from '@fewangsit/eslint-config-vue-code-standard';

export default [
  ...config,
  {
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
  },
];
