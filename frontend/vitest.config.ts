import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
    globals: false,
    coverage: {
      provider: 'v8',
      reporter: [
        [
          'text',
          {
            maxCols: 200,
            skipEmpty: false,
            skipFull: false,
          },
        ],
        'json',
        'html',
      ],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/*.spec.{ts,tsx}',
        'src/main.tsx',
        'src/vite-env.d.ts',
        'src/**/*.d.ts',
        'src/**/index.{ts,tsx}',
        'src/**/setupTests.{ts,tsx}',
        'src/__tests__/',
      ],
      thresholds: {
        global: {
          statements: 80,
          branches: 50,
          functions: 50,
          lines: 50,
        },
      },
    },
    setupFiles: ['./src/__tests__/setupTests.ts'],
    css: true,
    clearMocks: true,
    mockReset: true,
    restoreMocks: true,
  },
});
