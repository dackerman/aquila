import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['test/**/*.{test,spec}.{js,ts}'],
    environment: 'node',
  },
});