import { BasePage } from './base.page';
import { expect } from '@playwright/test';

export class LoginPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  private Elements = {
    emailInput: this.page.locator('input[data-test="username"]'),
    passwordInput: this.page.locator('input[data-test="password"]'),
    submitButton: this.page.locator('input[data-test="login-button"]'),
    errorBanner: this.page.locator('[data-test="error"]'),
  };

  async open() {
    await this.goto('https://www.saucedemo.com/');
  }

  async login(email: string, password: string) {
    await this.Elements.emailInput.fill(email);
    await this.Elements.passwordInput.fill(password);
    await this.Elements.submitButton.click();
    await this.waitForNetworkIdle();
  }

  async expectLoginError(message?: RegExp | string) {
    await this.expectVisible(this.Elements.errorBanner);
    if (message) {
      await expect(this.Elements.errorBanner).toContainText(message);
    }
  }
}