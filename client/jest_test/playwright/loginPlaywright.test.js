import {homeUrl} from "./config";
import resemble from "resemblejs";

const { webkit, chromium } = require('playwright');
jest.setTimeout(40 * 1000);

describe("Login page", () => {
    let browser;
    let page;
    beforeAll(async () => {
        //browser = await chromium.launch( {headless: false, devtools: true, slowMo: 15});
        browser = await chromium.launch();
    });
    afterAll(async () => {
        await browser.close();
    });
    beforeEach(async () => {
        page = await browser.newPage();
    });
    afterEach(async () => {
        await page.close();
    });
    it("should start login page", async () => {
        await page.goto(homeUrl);
        expect(await page.textContent("h1")).toEqual("Sign in");
    });

    it("Href to sign up page", async () => {
       await page.goto(homeUrl);
       await page.click('"Don\'t have an account? Sign Up"');
       expect(page.url()).toEqual(homeUrl+"signup")
    });

    it("successful login", async () => {
        const back = await browser.newPage();
        await page.route('http://localhost:8080/api/jwt?login=Login&password=Pass', route => {
            console.log('Catched');
            route.fulfill({
                contentType: 'application/json',
                headers: { 'access-control-allow-origin': '*' },
                status: 200,
                body: JSON.stringify({token: "token"}),
            })});
        await page.route('**/api/users/authenticated*', route => {
            console.log('Catched!');
            route.fulfill({
                contentType: 'application/json',
                headers: {'access-control-allow-origin': '*'},
                status: 200,
                body: JSON.stringify({"id":1,"login":"TestName","password":"123456","email":"TestEmail","name":"Tom","creationTime":1609777856000}),
            })
        });

        await page.goto(homeUrl);
        await page.fill('#login', 'Login');
        await page.fill('#password', 'Pass');
        await page.click('#submit');
        const localStorage = await page.evaluate(() => window.localStorage);
        expect('token' in localStorage);
        expect(page.url()).toEqual(homeUrl+"hello");

        const screen = await page.screenshot();
        resemble(screen)
            .compareTo('jest_test/playwright/screens/hello-authorized.png')
            .ignoreColors()
            .onComplete(function(data) {
                console.log(data);
            });
    });

    it("error login", async () => {
        await page.route('**/api/jwt*', route => {
            console.log('Catched');
            route.fulfill({
                contentType: 'application/json',
                headers: { 'access-control-allow-origin': '*' },
                status: 400,
                body: JSON.stringify({message: "Some error"}),
            })});
        page.on('request', request =>
            console.log('>>', request.method(), request.url()));
        page.on('response', response =>
            console.log('<<', response.status(), response.url()));

        await page.goto(homeUrl);
        await page.fill('#login', 'Login');
        await page.fill('#password', 'Pass');
        await page.click('#submit');
        const localStorage = await page.evaluate(() => window.localStorage);
        expect(!('token' in localStorage));
        expect(page.url()).toEqual(homeUrl);
        expect(await page.textContent("#login-helper-text")).toEqual("Some error")
    });
    it('Screenshoot test', async () => {
        await page.goto(homeUrl);
        const screen = await page.screenshot();
        resemble(screen)
            .compareTo('jest_test/playwright/screens/signin.png')
            .ignoreColors()
            .onComplete(function(data) {
                console.log(data);
                expect(data.rowMisMatchPercentage).toEqual(0);
            });
    })
});
