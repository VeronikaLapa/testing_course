import {homeUrl} from "../../jest_test/playwright/config";

describe('The Home Page', () => {
    it('successfully loads', () => {
        cy.visit('/') // change URL to match your dev URL
    });
    it("Href to sign up page", () => {
        cy.visit('/');
        cy.contains('Don\'t have an account? Sign Up').click();
        cy.url().should('includes', "/signup")
    });

    it("successful login", async () => {
        cy.intercept('http://localhost:8080/api/jwt*', {token: "token"});
        cy.intercept('**/api/users/authenticated*', {
            "id": 1,
            "login": "TestName",
            "password": "123456",
            "email": "TestEmail",
            "name": "Tom",
            "creationTime": 1609777856000
        });
        cy.visit('/');
        cy.get('#login').type('Login');
        cy.get('#password').type('Pass');
        cy.get('#submit').click();
        cy.url().should("/hello");
        cy.get('h1').should('contain', 'Hello TestName');
    });

});
