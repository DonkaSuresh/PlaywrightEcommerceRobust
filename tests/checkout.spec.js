const { test, expect } = require("@playwright/test");
const { productName, country } = require("../config/testData");
const { loginAndGetPO: login } = require("../utils/testUtils");

test.describe("Checkout and Orders", () => {
  for (let i = 1; i <= 10; i++) {
    test(`@smoke @regression @ui checkout scenario ${i}`, async ({ page }, testInfo) => {
      const { po } = await login(page, testInfo);
      await po.getDashboardPage().addProduct(productName);
      await po.getDashboardPage().openCart();
      await po.getCartPage().checkoutProduct();
      await po.getPlaceOrderPage().selectCountry(country);
      await po.getPlaceOrderPage().submitOrder();
      const orderId = await po.getPlaceOrderPage().getOrderId();
      expect(orderId).toBeTruthy();
      await po.getOrdersPage().open();
      await po.getOrdersPage().assertOrderExists(orderId);
    });
  }
});