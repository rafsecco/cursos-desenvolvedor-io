/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,

    environment: 'jsdom',

    setupFiles: ['src/test-setup.ts'],

    include: ['src/**/*.spec.ts'],

    reporters: ['default'],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
});
