import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/interactions/LoginPage';
import { config } from '../../../environments';

test.describe('Login Functionality', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToPage();
  });

  test('successful login', async () => {
    await loginPage.login(config.userLoginEmail, config.userPassword);
  });

  test('login with invalid credentials', async () => {
    await loginPage.login('invalid@example.com', 'wrongpassword');
  });
});
