import { BasePage } from './base.page';

export class HomePage extends BasePage {

  private Elements = {
    heading: this.page.locator('.title'),
    userMenu: this.page.locator('#react-burger-menu-btn'),
    inventoryItem: this.page.locator(".inventory_item"),
    cartBadge: this.page.locator("span[data-test='shopping-cart-badge']"),
    productNames: this.page.locator(".inventory_item_name")
  };

  async addProductToCartByName(name: string) {
    const product = this.Elements.inventoryItem.filter({ hasText: name });
    await product.locator("button").click();
    console.log(`Product added to cart: ${name}`);
  }

  async getCartBadgeCount(): Promise<number> {
    await this.Elements.cartBadge.waitFor({ timeout: 2000 }).catch(() => { });
    const badge = this.Elements.cartBadge;
    if (await badge.isVisible()) {
      const countText = await badge.textContent();
      const count = countText ? parseInt(countText) : 0;
      console.log(`Cart badge count: ${count}`);
      return count;
    }
    console.log("Cart badge not visible, count is 0");
    return 0;
  }

  get heading() {
    return this.Elements.heading;
  }

  get userMenu() {
    return this.Elements.userMenu;
  }
}