const { expect } = require("@playwright/test");

class OrdersPage {
  constructor(page) {
    this.page = page;
    this.rows = page.locator("tbody tr");
  }

  async open() {
    await this.page.locator("button[routerlink*='myorders']").click();
    await this.rows.first().waitFor();
  }

  async assertOrderExists(orderId) {
    await expect(this.rows.filter({ hasText: orderId }).first()).toBeVisible();
  }
}

module.exports = { OrdersPage };