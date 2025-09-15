import { BasePage } from './base.page';
import { TestIds } from '../utils/test-ids';
import { expect } from '@playwright/test';

export class LoginPage extends BasePage {
  async open() {
    await this.goto('');
  }

  get emailInput() { return this.getByTestId(TestIds.login.email); }
  get passwordInput() { return this.getByTestId(TestIds.login.password); }
  get submitButton() { return this.getByTestId(TestIds.login.submit); }
  get errorBanner() { return this.getByTestId(TestIds.login.error); }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    await this.waitForNetworkIdle();
  }

  async expectLoginError(message?: RegExp | string) {
    await this.expectVisible(this.errorBanner);
    if (message) {
      await expect(this.errorBanner).toContainText(message);
    }
  }
}