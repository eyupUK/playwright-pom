import { test, expect } from '../../src/fixtures/pages.fixture';

test.describe('Home smoke', () => {
  test('heading and user menu are visible', async ({ homePage }) => {
    await homePage.goto('/home');
    await homePage.expectVisible(homePage.heading);
    await homePage.expectVisible(homePage.userMenu);
    await expect(homePage.heading).toBeVisible();
  });
});