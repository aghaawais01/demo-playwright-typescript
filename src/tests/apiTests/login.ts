import { test, expect } from '@playwright/test';
import { ApiClient } from '../../api/client/ApiClient';
import { APIAssertions } from '../../assertions/apiAssertions';
import { API_ROUTES } from '../../API/apiConstants';
import { config } from '../../../environments';

test.describe('Authentication API Tests', () => {
  let apiClient: ApiClient;
  let apiAssertions: APIAssertions;

  test.beforeEach(async ({ request }) => {
    apiClient = new ApiClient(request);
    apiAssertions = new APIAssertions();
  });

  test('Login with valid credentials', async () => {
    const response = await apiClient.post(API_ROUTES.AUTHENTICATION.LOGIN, {
      data: {
        email: config.userLoginEmail,
        password: config.userPassword
      }
    });

    apiAssertions.assertStatus(response, 200);
    apiAssertions.assertBodyContainsKey(response, 'token');
    
    const body = await response.json();
    expect(body.token).toBeTruthy();
  });
});
