const playwright = require('playwright');
const homeUrl = "http://localhost:3000/";
(async () => {

    const browser = await playwright['chromium'].launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(homeUrl);
    await page.screenshot({path: `client/jest_test/playwright/screens/signin.png`, fullPage: true});

    await page.goto(homeUrl + 'signup');
    await page.screenshot({path: `client/jest_test/playwright/screens/signup.png`, fullPage: true});

    await page.goto(homeUrl + 'hello');
    await page.screenshot({path: `client/jest_test/playwright/screens/hello-unauthorized.png`, fullPage: true});

    await browser.close();

})();
