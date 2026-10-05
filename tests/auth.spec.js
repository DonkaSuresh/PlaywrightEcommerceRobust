const { test, expect } = require("@playwright/test");
const { getUser } = require("../config/testData");
const { POManager } = require("../utils/POManager");

test.describe("Authentication", () => {
  test("@smoke @sanity @ui valid login", async ({ page }, testInfo) => {
    const user = getUser(testInfo.workerIndex);
    const po = new POManager(page);
    await po.getLoginPage().goto();
    await po.getLoginPage().login(user.email, user.password);
    await expect(page).toHaveURL(/dashboard/);
  });

  for (let i = 2; i <= 10; i++) {
    test(`@regression @ui authentication scenario ${i}`, async ({ page }, testInfo) => {
      const user = getUser(testInfo.workerIndex);
      const po = new POManager(page);
      await po.getLoginPage().goto();
      await po.getLoginPage().assertLoginPage();
      expect(user.email).toBeTruthy();
    });
  }
});