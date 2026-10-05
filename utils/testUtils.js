const { expect } = require("@playwright/test");
const { getUser, productName, country } = require("../config/testData");
const { POManager } = require("./POManager");

async function loginAndGetPO(page, testInfo) {
  const po = new POManager(page);
  const user = getUser(testInfo.workerIndex);
  await po.getLoginPage().goto();
  await po.getLoginPage().login(user.email, user.password);
  await expect(page).toHaveURL(/dashboard/);
  return { po, user };
}

async function createOrderViaUI(page, testInfo) {
  const { po } = await loginAndGetPO(page, testInfo);
  await po.getDashboardPage().addProduct(productName);
  await po.getDashboardPage().openCart();
  await po.getCartPage().checkoutProduct();
  await po.getPlaceOrderPage().selectCountry(country);
  await po.getPlaceOrderPage().submitOrder();
  return po.getPlaceOrderPage().getOrderId();
}

module.exports = { loginAndGetPO, createOrderViaUI };