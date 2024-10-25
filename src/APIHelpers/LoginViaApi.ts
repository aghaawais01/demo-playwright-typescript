import { Page, APIResponse } from 'playwright';
import { LoginCredentials, TokenResponse, ParentEntity } from './interfaces/login';
import * as path from 'path';
import * as fs from 'fs';
import { config } from '../../environments';


export async function loginViaApi(page: Page, email: string, password: string): Promise<void> {
  const authFile = 'playwright/.auth/user.json';
  const loginUrl = `${config.apiBaseUrl}/api/v2/authentication/login/`;
  const loginCredentials: LoginCredentials = { email, password };

  try {
    const response = await performLoginRequest(page, loginUrl, loginCredentials);
    const { authToken, refresh, user } = await extractTokens(response);

    const parentEntity = getParentEntity();
    await storeAuthDataInLocalStorage(page, authToken, refresh, user, parentEntity);

    await page.context().storageState({ path: authFile });
  } catch (error) {
    console.error('Login via API failed:', error);
    throw error;
  }
}

async function performLoginRequest(page: Page, url: string, data: LoginCredentials): Promise<APIResponse> {
  return page.request.post(url, {
    data,
    headers: { 'Content-Type': 'application/json' },
    failOnStatusCode: false
  });
}

async function extractTokens(response: APIResponse): Promise<{ authToken: string; refresh: string; user: object }> {
  const responseBody: TokenResponse = await response.json();
  if (!responseBody.token) {
    throw new Error('Token not found in response');
  }
  return {
    authToken: responseBody.token.access,
    refresh: responseBody.token.refresh,
    user: responseBody.user
  };
}

function getParentEntity(): ParentEntity {
    const filePath = path.resolve(__dirname, 'jsons/parentEntityStage.json');
    let data = fs.readFileSync(filePath, 'utf-8');
    data = data.replace('{{USER_LOGIN_EMAIL}}', config.userLoginEmail || '');
    return JSON.parse(data) as ParentEntity;
  }

async function storeAuthDataInLocalStorage(page: Page, authToken: string, refresh: string, user: object, parentEntity: ParentEntity): Promise<void> {
await page.goto('/')
  await page.evaluate(([authToken, refresh, user, parentEntity]) => {
    localStorage.setItem('access_token', authToken as string);
    localStorage.setItem('refresh_token', refresh as string);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('parent_entity', JSON.stringify(parentEntity));
  }, [authToken, refresh, user, parentEntity]);
}
