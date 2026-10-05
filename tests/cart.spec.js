const { test, expect } = require("@playwright/test");
const { productName } = require("../config/testData");
const { loginAndGetPO } = require("../utils/testUtils");

test.describe("Cart", () => {
  for (let i = 1; i <= 10; i++) {
    test(`@sanity @regression @ui cart scenario ${i}`, async ({ page }, testInfo) => {
      const { po } = await loginAndGetPO(page, testInfo);
      await po.getDashboardPage().addProduct(productName);
      await po.getDashboardPage().openCart();
      await po.getCartPage().assertProduct(productName);
      await expect(po.getCartPage().checkout).toBeVisible();
    });
  }
});