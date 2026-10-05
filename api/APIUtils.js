class APIUtils {
  constructor(apiContext, baseURL = "https://rahulshettyacademy.com/api/ecom") {
    this.apiContext = apiContext;
    this.baseURL = baseURL;
  }

  async login(email, password) {
    const response = await this.apiContext.post(`${this.baseURL}/auth/login`, {
      data: { userEmail: email, userPassword: password }
    });
    if (!response.ok()) throw new Error(`API login failed: ${response.status()} ${await response.text()}`);
    const body = await response.json();
    if (!body.token) throw new Error("API login succeeded but token was missing");
    return body;
  }

  async createOrder(token, orderPayload) {
    const response = await this.apiContext.post(`${this.baseURL}/order/create-order`, {
      data: orderPayload,
      headers: { Authorization: token, "Content-Type": "application/json" }
    });
    if (!response.ok()) throw new Error(`Create order failed: ${response.status()} ${await response.text()}`);
    const body = await response.json();
    if (!body.orders?.length) throw new Error(`Order ID missing: ${JSON.stringify(body)}`);
    return body;
  }
}

module.exports = { APIUtils };