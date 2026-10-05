const { test, expect, request } = require("@playwright/test");
const { getUser } = require("../config/testData");
const { APIUtils } = require("../api/APIUtils");

test.describe("API", () => {
  for (let i = 1; i <= 10; i++) {
    test(`@api @regression API scenario ${i}`, async ({}, testInfo) => {
      const user = getUser(testInfo.workerIndex);
      const apiContext = await request.newContext();
      try {
        const api = new APIUtils(apiContext);
        const login = await api.login(user.email, user.password);
        expect(login.token).toBeTruthy();

        if (i % 2 === 0) {
          const result = await api.createOrder(login.token, {
            orders: [{ country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3" }]
          });
          expect(result.orders.length).toBeGreaterThan(0);
        } else {
          expect(login.userId).toBeTruthy();
        }
      } finally {
        await apiContext.dispose();
      }
    });
  }
});