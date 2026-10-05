const { expect } = require("@playwright/test");

class PlaceOrderPage {
    constructor(page) {
        this.page = page;
        this.country = page.getByPlaceholder("Select Country");
        this.dropdown = page.locator(".ta-results");
        this.options = this.dropdown.locator("button");
        this.submit = page.locator(".action__submit");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted").first();
    }

    async selectCountry(country) {
        await this.country.fill("");
        await this.country.pressSequentially(country, { delay: 100 });
        await this.dropdown.waitFor({ state: "visible" });

        const count = await this.options.count();

        for (let i = 0; i < count; i++) {
            const option = this.options.nth(i);
            const text = ((await option.textContent()) || "").trim();

            if (text.toLowerCase() === country.trim().toLowerCase()) {
                await option.click();
                return;
            }
        }

        throw new Error(`Country "${country}" was not found in dropdown`);
    }

    async submitOrder() {
        await this.submit.click();

        await expect(this.page.locator(".hero-primary"))
            .toContainText("Thankyou", { timeout: 15000 });
    }

    async getOrderId() {
        const text = await this.orderId.textContent();
        return text.replace(/\|/g, "").trim();
    }
}

module.exports = { PlaceOrderPage };