const dotenv = require("dotenv");
const path = require("path");

const envPath = path.resolve(__dirname, "../.env");

console.log("================================");
console.log("ENV PATH:", envPath);

const result = dotenv.config({ path: envPath });

console.log("DOTENV:", result.error || "Loaded successfully");
console.log("USER1_EMAIL:", process.env.USER1_EMAIL);
console.log("USER1_PASSWORD:", process.env.USER1_PASSWORD ? "LOADED" : "MISSING");
console.log("USER2_EMAIL:", process.env.USER2_EMAIL);
console.log("USER3_EMAIL:", process.env.USER3_EMAIL);
console.log("================================");

const users = [
  { email: process.env.USER1_EMAIL, password: process.env.USER1_PASSWORD },
  { email: process.env.USER2_EMAIL, password: process.env.USER2_PASSWORD },
  { email: process.env.USER3_EMAIL, password: process.env.USER3_PASSWORD },
];

function getUser(index = 0) {
  const user = users[index % users.length];
  if (!user.email || !user.password) {
    throw new Error(`Test account ${index % users.length + 1} is not configured in .env`);
  }
  return user;
}

module.exports = {
  users,
  getUser,
  productName: "ZARA COAT 3",
  country: "India",
  card: {
    number: "4542 9978 7895 3214",
    month: "03",
    year: "31",
    cvv: "123",
    name: "Test User"
  }
};