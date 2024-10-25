import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../pages/interactions/DashboardPage';

test.describe('Dashboard Functionality', () => {
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    await dashboardPage.navigateToPage();
  });

  test('verify settings button is visible', async () => {
    await dashboardPage.isSettingsButtonVisible();
    // Add assertions here to verify successful login
  });
});
