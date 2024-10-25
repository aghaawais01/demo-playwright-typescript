import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import LoginLocators from '../locators/LOGIN';

export class LoginPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    const pageLoadLocator = page.locator(LoginLocators.EMAILINPUT);
    super(page, pageLoadLocator);
        
    this.emailInput = page.locator(LoginLocators.EMAILINPUT);
    this.passwordInput = page.locator(LoginLocators.PASSWORDINPUT);
    this.loginButton = page.locator(LoginLocators.LOGINBUTTON);
  }

  async navigateToPage(): Promise<void> {
    await this.navigate('/');
  }

  async enterEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async isLoginButtonVisible(): Promise<boolean> {
    return await this.loginButton.isVisible();
  }
}
