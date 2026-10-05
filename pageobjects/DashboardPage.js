const { expect } = require("@playwright/test");

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.cartLink = page.locator("[routerlink*='cart']");
    this.ordersLink = page.locator("[routerlink*='myorders']");
    this.signOut = page.getByRole("button", { name: "Sign Out" });
  }

  product(name) {
    return this.products.filter({ hasText: name }).first();
  }

  async assertLoaded() {
    await expect(this.products.first()).toBeVisible();
  }

  async addProduct(name) {
    const product = this.product(name);
    await expect(product).toBeVisible();
    await product.getByRole("button", { name: /Add To Cart/i }).click();
  }

  async openCart() {
    await this.cartLink.click();
    await this.page.waitForURL(/cart/);
  }

  async openOrders() {
    await this.ordersLink.click();
    await this.page.waitForURL(/myorders/);
  }

  async logout() {
    await this.signOut.click();
    await this.page.waitForURL(/auth/);
  }
}

module.exports = { DashboardPage };