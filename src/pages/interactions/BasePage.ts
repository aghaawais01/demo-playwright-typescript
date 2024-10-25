import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;
  private readonly pageLoadLocator: Locator;

  constructor(page: Page, pageLoadLocator: Locator) {
    this.page = page;
    this.pageLoadLocator = pageLoadLocator;
  }

  async isPageLoaded(): Promise<void> {
    await expect(this.pageLoadLocator).toBeVisible();
  }

  abstract navigateToPage(): Promise<void>;

  async navigate(path: string): Promise<void> {
    const response = await this.page.goto(path);
    expect(response?.status()).toBeLessThan(400);
    await this.isPageLoaded();
    await this.waitForNetworkIdle();
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async getPageUrl(): Promise<string> {
    return this.page.url();
  }

  async waitForNetworkIdle(timeout: number = 10000): Promise<void> {
    await this.page.waitForLoadState('networkidle', { timeout });
  }
}
