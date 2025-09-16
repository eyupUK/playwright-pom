import { defineConfig, devices } from '@playwright/test';
import { loadEnv } from './src/utils/env';

const env = loadEnv();

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: { timeout: 7000 },
  // retries: 1,
  reporter: [['list'], ['html', { outputFolder: 'report' }]],
  use: {
    baseURL: env.BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    // 1) Auth setup — runs first
    {
      name: 'setup',
      testMatch: 'tests/setup/auth.setup.ts'
    },

    // 2) Actual test projects reuse storage state
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome']},
      dependencies: ['setup']
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'], storageState: 'storage/authState.json' },
    //   dependencies: ['setup']
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'], storageState: 'storage/authState.json' },
    //   dependencies: ['setup']
    // }
  ],
  outputDir: 'test-results'
});
