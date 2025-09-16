import { before } from 'node:test';
import { test, expect } from '../../src/fixtures/pages.fixture';
import { loadEnv } from '../../src/utils/env';

const env = loadEnv();

test.describe('Home smoke', () => {

  test.beforeEach(async ({ homePage }) => {
    // Start at home (logged in via storageState)
    await homePage.goto('/inventory.html');
  });

  test('heading and user menu are visible', async ({ homePage }) => {
    await expect(homePage.userMenu).toBeVisible();
  });

  test('add product to cart by name', async ({ loginPage, homePage }) => {
    const productName = "Sauce Labs Backpack";
    await homePage.addProductToCartByName(productName);
    // Additional verification can be added here to confirm the product is in the cart
    expect(await homePage.getCartBadgeCount()).toBe(1);
  });
});