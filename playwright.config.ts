import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import { PlaywrightTestConfig } from '@playwright/test';
import { config as envConfig } from './environments';

dotenv.config();

const config: PlaywrightTestConfig = {
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['./src/core/logger/Listener.ts'],
    ['html', { open: 'never', outputFolder: './test-results/report' }],
    ['json', { outputFile: './test-results/results/results.json' }],
  ],
  use: {
    baseURL: envConfig.baseUrl,
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'setup',
      testMatch: '**/setup/*.setup.ts',
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
      storageState: 'playwright/.auth/user.json'
       },
      testIgnore: '**/e2e/LoginTests.spec.ts',
      dependencies: ['setup']
    },
    {
      name: 'chromium-no-setup',
      use: { ...devices['Desktop Chrome']},
      testMatch: '**/e2e/LoginTests.spec.ts',
    },
    {
      name: 'api-tests',
      testMatch: '**/apiTests/*.ts',
    },
  ],
};

export default config;
