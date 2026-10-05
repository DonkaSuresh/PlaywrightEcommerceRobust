const { expect } = require("@playwright/test");

class LoginPage {
  constructor(page) {
    this.page = page;
    this.email = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
    this.loginButton = page.locator("[value='Login']");
  }

  async goto() {
    await this.page.goto("/client");
  }

  async login(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL(/dashboard/, { timeout: 30_000 });
  }

  async assertLoginPage() {
    await expect(this.loginButton).toBeVisible();
  }
}

module.exports = { LoginPage };