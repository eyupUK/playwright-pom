import { test, expect } from '../../src/fixtures/pages.fixture';
import { loadEnv } from '../../src/utils/env';

const env = loadEnv();

test.describe('Authentication', () => {
  test('valid user can log in and see Home', async ({ loginPage, homePage }) => {
    await homePage.goto('/inventory.html');
    await expect(homePage.heading).toContainText("Products");
    await homePage.expectUrlContains('/inventory.html');
  });

  test('invalid credentials show an error', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login('wrong@user.com', 'badpass');
    await loginPage.expectLoginError("Epic sadface: Username and password do not match any user in this service");
  });
});