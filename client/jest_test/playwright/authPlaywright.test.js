import {homeUrl} from "./config";
import resemble from 'resemblejs'
import compareImages from 'resemblejs/compareImages'

const {webkit, chromium} = require('playwright');
import fs from 'fs';

jest.setTimeout(40 * 1000);

describe("Authorization", () => {
    let browser;
    let page;
    let context;
    beforeAll(async () => {
        browser = await chromium.launch();
        context = await browser.newContext();
    });

    afterAll(async () => {
        await browser.close();
    });
    beforeEach(async () => {
        page = await browser.newPage();
        await page.route('**/api/users/authenticated*', route => {
            console.log('Catched!');
            route.fulfill({
                contentType: 'application/json',
                headers: {'access-control-allow-origin': '*'},
                status: 200,
                body: JSON.stringify({
                    "id": 1,
                    "login": "TestName",
                    "password": "123456",
                    "email": "TestEmail",
                    "name": "Tom",
                    "creationTime": 1609777856000
                }),
            })
        });
        page.on('request', request =>
            console.log('>>', request.method(), request.url()));
        page.on('response', response =>
            console.log('<<', response.status(), response.url()));
        await page.goto(homeUrl);
        await page.evaluate(() => window.localStorage.setItem('token', 'My jwt token'));
    });
    afterEach(async () => {
        await page.close();
    });
    it('Hello page shows name', async () => {
        await page.goto(homeUrl + 'hello');
        expect(await page.textContent("h1")).toEqual("Hello TestName");
    });
    it('Has avatar in main page', async () => {
        await page.goto(homeUrl);
        expect(await page.$$('#avatar')).toHaveLength(1)
    });
    test('Hello screenshot test', async () => {
        await page.goto(homeUrl + 'hello');
        const screen = await page.screenshot();
        let data = await compareImages(screen, 'jest_test/playwright/screens/hello-authorized.png');
        fs.writeFile("./output.png", data.getBuffer(),() => {});
        //expect(data.misMatchPercentage).toEqual(0);
    })
});
