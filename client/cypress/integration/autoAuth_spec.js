describe('tests for authorized user', ()=> {
    beforeEach(() =>  {
        window.localStorage.setItem('token', 'My jwt token');

        cy.intercept('**/api/users/authenticated*', {
            "id": 1,
            "login": "TestName",
            "password": "123456",
            "email": "TestEmail",
            "name": "Tom",
            "creationTime": 1609777856000
        });
    });
    it('Has avatar in main page if user auth', () => {
        cy.visit('/');
        cy.get('#avatar').should('exist');
    });
    it ('Has hello name', () => {
        cy.visit('/hello');
        cy.get('h1').should('contain', 'Hello TestName');
    });
});
