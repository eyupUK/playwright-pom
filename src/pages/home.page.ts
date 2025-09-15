import { BasePage } from './base.page';
import { TestIds } from '../utils/test-ids';

export class HomePage extends BasePage {
  get heading() { return this.getByTestId(TestIds.home.heading); }
  get userMenu() { return this.getByTestId(TestIds.home.userMenu); }
}