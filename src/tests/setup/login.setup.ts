// login.setup.ts
import { test as setup, expect } from '@playwright/test';
import { loginViaApi } from '../../APIHelpers/LoginViaApi';
import { config } from '../../../environments';


setup('login via API', async ({ page }) => {
  await loginViaApi(page, config.userLoginEmail, config.userPassword);
  await page.goto('/');
  await expect(page.locator('.dashboardHeader')).toBeVisible();
});

export { loginViaApi };
