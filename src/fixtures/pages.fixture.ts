// src/fixtures/pages.fixture.ts
import { test as base, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';

type Pages = {
  // Override built-ins with our own context/page that load storageState
  context: BrowserContext;
  page: Page;
  // POMs
  loginPage: LoginPage;
  homePage: HomePage;
};

export const test = base.extend<Pages>({
  // 1) Create a context that reuses the saved auth state
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: 'storage/authState.json',
    });
    try {
      await use(context);
    } finally {
      await context.close();
    }
  },

  // 2) Create a page from that context
  page: async ({ context }, use) => {
    const page = await context.newPage();
    try {
      await use(page);
    } finally {
      await page.close();
    }
  },

  // 3) POM fixtures
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

export const expect = test.expect;
