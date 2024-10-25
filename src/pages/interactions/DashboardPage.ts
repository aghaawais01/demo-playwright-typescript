import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import DashboardLocators from '../locators/Dashboard';

export class DashboardPage extends BasePage {
  private readonly settingsButton: Locator;
  private readonly welcomeMessage: Locator;
  private readonly logoutButton: Locator;

  constructor(page: Page) {
    const pageLoadLocator = page.locator(DashboardLocators.CONTAINER);
    super(page, pageLoadLocator);

    this.settingsButton = page.locator(DashboardLocators.SETTINGS_BUTTON);
    this.welcomeMessage = page.locator('.welcome-message');
    this.logoutButton = page.locator('.logout-button');
  }

  async navigateToPage(): Promise<void> {
    await this.navigate('/');
  }

  async getUserName(): Promise<string> {
    return await this.welcomeMessage.textContent() || '';
  }

  async isSettingsButtonVisible(): Promise<boolean> {
    return await this.settingsButton.isVisible();
  }

  async clickUserProfileButton(): Promise<void> {
    await this.settingsButton.click();
  }

  async logout(): Promise<void> {
    await this.clickUserProfileButton();
    await this.logoutButton.click();
  }
}
