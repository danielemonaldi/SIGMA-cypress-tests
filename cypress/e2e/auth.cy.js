const dashboardURL = "...";

// Prevent Cypress from failing tests on uncaught exceptions
Cypress.on("uncaught:exception", (err, runnable) => {
  return false
});

describe("Login & logout tests", () => {
  
  it("Valid login test", () => {
    cy.login("...", "...");
    cy.visit(dashboardURL);
    cy.url().should("include", dashboardURL);
  });

  it("Invalid login test", () => {
    cy.login("...", "...");
    cy.visit(dashboardURL);
    cy.url().should("not.include", dashboardURL);
  });

  it("Logout test", () => {
    cy.login("...", "...");
    cy.visit(dashboardURL);
    cy.get("#headerLogin\\:j_idt44 > table > tbody > tr > td > a").click();
    cy.url().should("not.include", "...");
  });
 
  afterEach(() => {
    Cypress.session.clearCurrentSessionData();
    Cypress.session.clearAllSavedSessions();
  });
});