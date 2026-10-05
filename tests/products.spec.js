const { test, expect } = require("@playwright/test");
const { productName } = require("../config/testData");
const { loginAndGetPO } = require("../utils/testUtils");

test.describe("Products", () => {
  for (let i = 1; i <= 10; i++) {
    test(`@smoke @regression @ui product scenario ${i}`, async ({ page }, testInfo) => {
      const { po } = await loginAndGetPO(page, testInfo);
      await po.getDashboardPage().assertLoaded();
      await expect(po.getDashboardPage().product(productName)).toBeVisible();
      if (i % 2 === 0) await po.getDashboardPage().addProduct(productName);
    });
  }
});