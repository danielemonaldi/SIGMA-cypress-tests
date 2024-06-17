// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// -- SIGMA Central Authentication Service login --
Cypress.Commands.add("casLogin", (username, password) => {

    cy.session([username, password], () => {
        cy.visit("...");
        cy.get("#username").type(username);
        cy.get("#password").type(password);
        cy.get("#fm1 > div > button").click();
    });
});

// -- SIGMA Dashboard for E2E Testing login --
Cypress.Commands.add("login", (username, password) => {
    
    cy.session([username, password], () => {
        cy.visit("...");
        cy.get("#username").type(username);
        cy.get("#password").type(password);
        cy.get("#kc-login").click();
    });
});

Cypress.Commands.add("checkDownloadedFile", (partialFileName) => {
    return cy.exec('dir "C:\\Users\\dmonaldi\\Downloads\\"'+ partialFileName).then(({ stdout }) => {
        return stdout.includes(partialFileName);
    });
});