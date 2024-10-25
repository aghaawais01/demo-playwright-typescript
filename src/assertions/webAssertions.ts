import { Page, Locator, expect } from '@playwright/test';

export class WebAssertions {
  /**
   * Asserts that an element is visible on the page.
   * @param locator - The Playwright Locator for the element to check.
   */
  public static async assertElementIsVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  /**
   * Asserts that an element contains specific text.
   * @param locator - The Playwright Locator for the element to check.
   * @param text - The text to search for within the element.
   */
  public static async assertElementContainsText(locator: Locator, text: string) {
    await expect(locator).toContainText(text);
  }

  /**
   * Asserts that a page has a specific title.
   * @param page - The Playwright Page object.
   * @param title - The expected title of the page.
   */
  public static async assertPageHasTitle(page: Page, title: string) {
    await expect(page).toHaveTitle(title);
  }

  /**
   * Asserts that an element has a specific attribute value.
   * @param locator - The Playwright Locator for the element to check.
   * @param attribute - The name of the attribute to check.
   * @param value - The expected value of the attribute.
   */
  public static async assertElementHasAttribute(locator: Locator, attribute: string, value: string) {
    await expect(locator).toHaveAttribute(attribute, value);
  }

  /**
   * Asserts that an element is enabled.
   * @param locator - The Playwright Locator for the element to check.
   */
  public static async assertElementIsEnabled(locator: Locator) {
    await expect(locator).toBeEnabled();
  }

  /**
   * Asserts that a condition is true.
   * @param condition - The condition to check.
   * @param message - Optional message to display if the assertion fails.
   */
  public static async assertTrue(condition: boolean, message?: string) {
    await expect(condition, message).toBe(true);
  }

  /**
   * Asserts that a condition is false.
   * @param condition - The condition to check.
   * @param message - Optional message to display if the assertion fails.
   */
  public static async assertFalse(condition: boolean, message?: string) {
    await expect(condition, message).toBe(false);
  }

  /**
   * Asserts that two values are equal.
   * @param actual - The actual value.
   * @param expected - The expected value.
   * @param description - Description of what is being compared.
   * @param softAssert - If true, doesn't throw an error on failure.
   */
  public static async assertEquals(actual: any, expected: any, description: string, softAssert = false) {
    try {
      await expect(
        actual === expected,
        `${description}: Expected '${expected}' should be EQUAL to Actual '${actual}'`
      ).toBeTruthy();
    } catch (error) {
      if (!softAssert) {
        throw error;
      }
      // If softAssert is true, the error is caught but not rethrown
    }
  }

  /**
   * Asserts that two values are not equal.
   * @param actual - The actual value.
   * @param expected - The value that actual should not equal.
   * @param message - Optional message to display if the assertion fails.
   */
  public static async assertNotEquals(actual: any, expected: any, message?: string) {
    await expect(actual, message).not.toBe(expected);
  }
}
