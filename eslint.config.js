import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['sourse/js/**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        $: 'readonly',
        jQuery: 'readonly',
        Swiper: 'readonly',
        Fancybox: 'readonly',
        Plyr: 'readonly',
        Inputmask: 'readonly',
        ionRangeSlider: 'readonly',
        hcSticky: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'no-console': 'warn',
      'no-duplicate-case': 'error',
      'no-unreachable': 'error',
      eqeqeq: ['warn', 'smart'],
    },
  },
  {
    ignores: ['public/**/*.js', 'node_modules/**'],
  },
];
