interface EnvironmentConfig {
    baseUrl: string;
    apiBaseUrl: string;
    userLoginEmail: string;
    userPassword: string;
  }
  
  const environments: Record<string, EnvironmentConfig> = {
    dev: {
      baseUrl: process.env.DEV_BASE_URL as string,
      apiBaseUrl: process.env.DEV_API_BASE_URL as string,
      userLoginEmail: process.env.DEV_USER_LOGIN_EMAIL as string,
      userPassword: process.env.DEV_USER_PASSWORD as string,
    },
    stage: {
      baseUrl: process.env.STAGE_BASE_URL as string,
      apiBaseUrl: process.env.STAGE_API_BASE_URL as string,
      userLoginEmail: process.env.STAGE_USER_LOGIN_EMAIL as string,
      userPassword: process.env.STAGE_USER_PASSWORD as string,
    },
  };
  
  const currentEnv = process.env.TEST_ENV || 'stage';
  
  export const config = environments[currentEnv];

// TEST_ENV=dev npm run test
// # or
// TEST_ENV=stage npm run test