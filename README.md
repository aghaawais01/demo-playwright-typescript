# Demo Playwright Test Suite

This project contains automated tests for the CXMeter application using Playwright.

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Install Playwright browsers:
   ```
   npx playwright install
   ```

## Running Tests

Use the following npm scripts to run tests:

- Run all tests (default environment: stage):
  ```
  npm run test
  ```

- Run tests in development environment:
  ```
  npm run test:dev
  ```

- Run tests in staging environment:
  ```
  npm run test:stage
  ```
- Run tests for a specific project in a specific environment:
  ```
  TEST_ENV=<env> npm run test:<project-name>
  ```
  Replace `<env>` with either `dev` or `stage`, and `<project-name>` with the name of the project you want to run (e.g., chromium, api-tests).

  Examples:
  ```
  TEST_ENV=dev npm run test:chromium
  TEST_ENV=stage npm run test:api-tests


## Project Structure

```
src/
├── API/
│   ├── client/
│   │   └── ApiClient.ts
│   └── constants/
│       └── apiConstants.ts
├── APIHelpers/
│   └── apiHelpers.ts
├── assertions/
│   ├── apiAssertions.ts
│   └── webAssertions.ts
├── core/
│   └── logger/
│       └── Listener.ts
├── pages/
│   ├── interactions/
│   │   ├── LoginInteractions.ts
│   │   └── DashboardInteractions.ts
│   └── locators/
│       ├── LoginLocators.ts
│       └── DashboardLocators.ts
└── tests/
    ├── apiTests/
    │   └── login.ts
    ├── e2e/
    │   ├── login.spec.ts
    │   └── dashboard.spec.ts
    └── setup/
        └── login.setup.ts
playwright.config.ts
package.json
```

- `src/API/`: Contains API-related code
  - `client/`: API client implementation
  - `constants/`: API route constants
- `src/APIHelpers/`: Helper functions for API operations
- `src/assertions/`: Custom assertion utilities
- `src/core/`: Core utilities like custom reporter
- `src/pages/`: Page Object Model components
  - `interactions/`: Page interaction methods
  - `locators/`: Element locators for pages
- `src/tests/`: Test files
  - `apiTests/`: API-specific tests
  - `e2e/`: End-to-end test files
  - `setup/`: Test setup files
- `playwright.config.ts`: Playwright configuration
- `package.json`: Project dependencies and scripts

## Reporting

Test results are generated in multiple formats:

1. Console Output: Real-time test results are displayed in the console during test execution.

2. HTML Report:
   - Location: `./test-results/report`
   - To view: Open `index.html` in this directory after test execution

3. JSON Results:
   - File: `./test-results/results/results.json`
   - Contains detailed test execution data in JSON format

4. Custom Logging:
   - Implemented via `./src/core/logger/Listener.ts`
   - Provides additional logging capabilities as defined in the custom reporter

To generate reports:
1. Run tests using any of the test commands (e.g., `npm run test`)
2. Reports will be automatically generated in the specified locations
