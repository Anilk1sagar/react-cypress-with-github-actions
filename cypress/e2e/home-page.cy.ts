describe("Home page should visible and work", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Count button should work and show correct count value", () => {
    const testEnv = Cypress.env("testEnv");
    cy.wrap(testEnv).should("eq", "anil");

    cy.getBySel("count-text").should("exist").and("have.text", "1");

    cy.getBySel("count-btn").should("exist").and("have.text", "Count ++").click();

    cy.getBySel("count-text").should("exist").and("have.text", "1");
  });

  it("users should be loaded from proxy api", () => {
    cy.intercept("GET", "/api/users").as("users");

    cy.wait("@users");

    cy.getBySel("users-list")
      .should("exist")
      .within(() => {
        cy.get("li").should("exist").and("have.length", 10);
      });
  });
});
