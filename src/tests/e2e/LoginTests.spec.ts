import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/interactions/LoginPage';

test.describe('Login Functionality', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToPage();
  });

  test('successful login', async () => {
    await loginPage.login('test@example.com', 'password123');
  });

  test('login with invalid credentials', async () => {
    await loginPage.login('invalid@example.com', 'wrongpassword');
  });
});
