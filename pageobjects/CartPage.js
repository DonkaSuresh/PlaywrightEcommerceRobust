const { expect } = require("@playwright/test");

class CartPage {
  constructor(page) {
    this.page = page;
    this.items = page.locator(".cartSection");
    this.checkout = page.getByRole("button", { name: /Checkout/i });
  }

  item(name) {
    return this.items.filter({ hasText: name }).first();
  }

  async assertProduct(name) {
    await expect(this.item(name)).toBeVisible();
  }

  async checkoutProduct() {
    await expect(this.checkout).toBeVisible();
    await this.checkout.click();
    await this.page.waitForURL(/order|checkout/);
  }
}

module.exports = { CartPage };