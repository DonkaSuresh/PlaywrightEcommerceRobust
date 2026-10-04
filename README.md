# Playwright Ecommerce Robust Framework

Install:
npm install
npx playwright install

Copy .env.example to .env and configure five independent test accounts.

Run:
npm test
npm run test:workers
npm run smoke
npm run sanity
npm run regression
npm run ui
npm run api
npm run debug
npm run report

Tests are independent and account selection uses workerIndex. Successful tests do not retain screenshots/video/trace; failures do.

Keep credentials only in .env and never commit it.
