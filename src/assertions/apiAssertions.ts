import { APIResponse } from 'playwright';
import { expect } from '@playwright/test';

export class APIAssertions {
  /**
   * Asserts that the response status is as expected.
   * @param response - The APIResponse object.
   * @param expectedStatus - The expected status code.
   */
  public async assertStatus(response: APIResponse, expectedStatus: number) {
    await expect(response.status()).toBe(expectedStatus);
  }

  /**
   * Asserts that the response body contains a specific key.
   * @param response - The APIResponse object.
   * @param key - The key to check for in the response body.
   */
  public async assertBodyContainsKey(response: APIResponse, key: string) {
    const responseBody = await response.json();
    await expect(responseBody).toHaveProperty(key);
  }

  /**
   * Asserts that the response body matches a specific schema.
   * @param response - The APIResponse object.
   * @param schema - The expected schema of the response body.
   */
  public async assertBodyMatchesSchema(response: APIResponse, schema: Record<string, unknown>) {
    const responseBody = await response.json();
    await expect(responseBody).toMatchObject(schema);
  }

  /**
   * Asserts that a specific header is present in the response.
   * @param response - The APIResponse object.
   * @param headerName - The name of the header to check for.
   */
  public async assertHeaderPresent(response: APIResponse, headerName: string) {
    const headers = response.headers();
    await expect(headers).toHaveProperty(headerName.toLowerCase());
  }
}
