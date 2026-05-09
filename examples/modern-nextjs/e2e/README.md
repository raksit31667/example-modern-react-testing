# E2E Tests with Playwright

This directory contains end-to-end tests for the Modern Banking Dashboard using Playwright.

## Structure

```
e2e/
├── homepage.spec.ts          # Homepage (dashboard) tests
├── dashboard.spec.ts         # Dashboard functionality tests
├── api.spec.ts              # API route tests
├── fixtures/
│   └── test-data.ts         # Centralized test data
└── utils/
    └── api-mocks.ts         # API mocking utilities
```

## Running Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run tests in UI mode
npm run test:e2e:ui

# Run specific test file
npx playwright test homepage.spec.ts

# Run tests with specific tag
npx playwright test --grep @smoke

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run tests in specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run mobile tests
npx playwright test --project=mobile-chrome
npx playwright test --project=mobile-safari

# Debug tests
npx playwright test --debug

# Show test report
npx playwright show-report
```

## Test Tags

Tests are organized with tags for easy filtering:

- `@smoke` - Critical smoke tests that should always pass
- `@critical` - Critical user flows
- `@e2e` - End-to-end integration tests
- `@api` - API route tests

## Writing New Tests

### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature Name @tag', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/path')
  })

  test('should do something', async ({ page }) => {
    // Arrange
    await page.getByLabel('Input').fill('value')

    // Act
    await page.getByRole('button', { name: 'Submit' }).click()

    // Assert
    await expect(page.getByText('Success')).toBeVisible()
  })
})
```

### Using API Mocks

```typescript
import { setupDashboardMocks, mockTransactionCreation } from './utils/api-mocks'

test('with mocked APIs', async ({ page }) => {
  await setupDashboardMocks(page)
  await mockTransactionCreation(page, { shouldSucceed: true })

  await page.goto('/')
  // ... rest of test
})
```

### Using Test Data

```typescript
import { testTransactions, testTransferData } from './fixtures/test-data'

test('with test data', async ({ page }) => {
  // Use predefined test data
  const transfer = testTransferData.valid
  
  await page.getByLabel('Amount').fill(transfer.amount.toString())
  await page.getByLabel('Recipient').fill(transfer.recipient)
})
```

## Best Practices

1. **Use semantic locators**: Prefer `getByRole`, `getByLabel`, `getByText` over CSS selectors
2. **Wait for elements**: Use `await expect(locator).toBeVisible()` instead of `waitForTimeout`
3. **Keep tests independent**: Each test should be able to run in isolation
4. **Use test tags**: Tag tests for easy filtering (@smoke, @critical, etc.)
5. **Mock external APIs**: Use route mocking for consistent, fast tests
6. **Clean test data**: Use fixtures and utilities for reusable test data
7. **Test user flows**: Focus on real user scenarios, not implementation details

## Debugging Failed Tests

```bash
# Run with trace
npx playwright test --trace on

# Show trace for failed test
npx playwright show-trace trace.zip

# Run in debug mode
npx playwright test --debug

# Run with headed browser
npx playwright test --headed --project=chromium
```

## CI/CD

Tests are configured to run in CI with:
- Production build (`npm run build && npm run start`)
- 2 retries for flaky tests
- Single worker for stability
- GitHub Actions reporter
- Trace and screenshots on failure

See `playwright.config.ts` for full configuration.
