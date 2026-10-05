const { LoginPage } = require("../pageobjects/LoginPage");
const { DashboardPage } = require("../pageobjects/DashboardPage");
const { CartPage } = require("../pageobjects/CartPage");
const { PlaceOrderPage } = require("../pageobjects/PlaceOrderPage");
const { OrdersPage } = require("../pageobjects/OrdersPage");

class POManager {
  constructor(page) {
    this.page = page;
    this.pages = {};
  }

  getLoginPage() {
    return this.pages.login ||= new LoginPage(this.page);
  }
  getDashboardPage() {
    return this.pages.dashboard ||= new DashboardPage(this.page);
  }
  getCartPage() {
    return this.pages.cart ||= new CartPage(this.page);
  }
  getPlaceOrderPage() {
    return this.pages.placeOrder ||= new PlaceOrderPage(this.page);
  }
  getOrdersPage() {
    return this.pages.orders ||= new OrdersPage(this.page);
  }
}

module.exports = { POManager };