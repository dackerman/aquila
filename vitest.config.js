import { defineConfig } from 'vitest/config';
export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: ['packages/**/*.{test,spec}.{js,ts}'],
        exclude: ['**/node_modules/**', '**/dist/**', '**/build/**'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: ['**/node_modules/**', '**/dist/**', '**/build/**'],
        },
    },
});
//# sourceMappingURL=vitest.config.js.map