describe("Validate groups list", () => {
  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: true });
    Cypress.on("uncaught:exception", (/*err, runnable*/) => {
      return true;
    });
    expect(true).to.equal(true);
    cy.visit("/");
  });
  it("Is rendering", () => {
    cy.get("input")
      .get("#symbolsGroupListInput")
      .should("be.visible")
      .should("have.value", "");
  });
  it("Is canceling a list creation", () => {
    cy.get("input")
      .get("#symbolsGroupListInput")
      .type("My first symbols list{enter}");
    cy.get("input").get("#cancelSymbolsList").click();
    cy.get("input")
      .get("#symbolsGroupListInput")
      .should("have.value", "")
      .should("be.visible");
  });
  it("Is saving list with enter", () => {
    cy.get("input")
      .get("#symbolsGroupListInput")
      .type("My first symbols list{enter}");
    cy.get("input").get("#saveSymbolsList").click();
    cy.get("input")
      .get("#symbolsGroupListInput")
      .should("have.value", "My first symbols list")
      .should("be.visible");
  });
  it("Is saving list on selecting on a dropdown", () => {
    cy.get("input").get("#symbolsGroupListInput").type("My first symbols list");
    cy.get("li")
      .get("#symbolsGroupListInput-option-0")
      .should("contain.text", "My first symbols list")
      .should("be.visible")
      .click();
    cy.get("input").get("#saveSymbolsList").click();
    cy.get("input")
      .get("#symbolsGroupListInput")
      .should("have.value", "My first symbols list")
      .should("be.visible");
  });
  it("Is unselecting a list", () => {
    cy.get("input")
      .get("#symbolsGroupListInput")
      .type("My first symbols list{enter}");
    cy.get("input").get("#saveSymbolsList").click();
    cy.get("input")
      .get("#symbolsGroupListInput")
      .should("have.value", "My first symbols list")
      .should("be.visible")
      .focus();
    cy.get("button")
      .get(".MuiAutocomplete-clearIndicator")
      .should("have.attr", "title", "Clear")
      .should("be.visible")
      .click();
    cy.get("input")
      .get("#symbolsGroupListInput")
      .should("have.value", "")
      .should("be.visible")
      .blur();
  });
  it("Is deleting a list", () => {
    cy.get("input")
      .get("#symbolsGroupListInput")
      .type("My first symbols list{enter}");
    cy.get("input").get("#saveSymbolsList").click();
    cy.get("input")
      .get("#symbolsGroupListInput")
      .should("have.value", "My first symbols list")
      .should("be.visible");
    cy.get("#deleteSymbolsList").should("be.visible").click();
    cy.get("input")
      .get("#symbolsGroupListInput")
      .should("have.value", "")
      .should("be.visible");
    cy.get("input").get("#symbolsGroupListInput").focus();

    cy.get("li").get("#symbolsGroupListInput-option-0").should("not.exist");
    cy.get("input").get("#symbolsGroupListInput").blur();
  });
  it("Is filtering a list", () => {
    cy.get("input")
      .get("#symbolsGroupListInput")
      .type("My first symbols list{enter}");
    cy.get("input").get("#saveSymbolsList").click();
    cy.get("button")
      .get(".MuiAutocomplete-clearIndicator")
      .should("have.attr", "title", "Clear")
      .should("be.visible")
      .click();

    cy.get("input")
      .get("#symbolsGroupListInput")
      .type("My second symbols list{enter}");
    cy.get("input").get("#saveSymbolsList").click();
    cy.get("button")
      .get(".MuiAutocomplete-clearIndicator")
      .should("have.attr", "title", "Clear")
      .should("be.visible")
      .click();

    cy.get("input").get("#symbolsGroupListInput").type("My first");

    cy.get("li")
      .get("#symbolsGroupListInput-option-0")
      .should("contain.text", "My first symbols list")
      .should("be.visible");

    cy.get("li")
      .get("#symbolsGroupListInput-option-1")
      .should("contain.text", 'Add "My first"')
      .should("be.visible");
  });
});
