describe("Validate binance integration", () => {
  beforeEach(() => {
    expect(true).to.equal(true);
  });

  Cypress.config("defaultCommandTimeout", 10 * 1000); // 10 seconds
  it("Check symbols list request", () => {
    cy.request("GET", Cypress.env("URL_EXCHANGE_INFO")).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.symbols).length.to.be.greaterThan(100);
      expect(response.body.symbols[0])
        .property("symbol")
        .to.not.be.oneOf([null, ""]);
    });
  });
  it("Check symbols info request", () => {
    cy.visit("/");
    cy.get("input")
      .get("#symbolsGroupListInput")
      .type("My second symbols list{enter}");
    cy.get("input").get("#saveSymbolsList").click();
    cy.get("input")
      .get("#symbolsGroupListInput")
      .should("have.value", "My second symbols list")
      .should("be.visible");

    cy.get("input")
      .get("#symbolsListInput")
      .should("have.value", "")
      .should("be.visible")
      .click();
    cy.get("#symbolsListInput-option-0")
      .click()
      .then(($option) => {
        cy.get("span")
          .contains($option.text())
          .should("have.class", "MuiChip-label")
          .should("be.visible");
      });
    cy.get("input")
      .get("#symbolsListInput")
      .should("have.value", "")
      .should("be.visible")
      .click();
    cy.get("#symbolsListInput-option-1")
      .click()
      .then(($option) => {
        cy.get("span")
          .contains($option.text())
          .should("have.class", "MuiChip-label")
          .should("be.visible");
      });
    cy.get("input")
      .get("#symbolsListInput")
      .should("have.value", "")
      .should("be.visible")
      .blur();

    cy.get("table", { timeout: 5 * 1000 })
      .get("#symbolsValuesTable > tbody > tr")
      .contains("Loading the data...")
      .should("not.exist");

    cy.get("table", { timeout: 5 * 1000 })
      .get("#symbolsValuesTable > tbody")
      .children()
      .should("have.length", 2);
  });
});
