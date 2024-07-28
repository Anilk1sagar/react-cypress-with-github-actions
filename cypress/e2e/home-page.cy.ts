describe("Home page should visible and work", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Count button should work and show correct count value", () => {
    cy.getBySel("count-text").should("exist").and("have.text", "0");

    cy.getBySel("count-btn").should("exist").and("have.text", "Count ++").click();

    cy.getBySel("count-text").should("exist").and("have.text", "1");
  });
});
