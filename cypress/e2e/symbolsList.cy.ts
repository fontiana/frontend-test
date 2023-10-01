describe("Validate symbols list", () => {
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
      .get("#symbolsListInput")
      .should("be.visible")
      .should("have.value", "");
  });
  it("Can not add symbols without a list", () => {
    cy.get("input")
      .get("#symbolsListInput")
      .should("be.visible")
      .should("have.value", "")
      .should("be.disabled");
  });
  it("Is listing symbols", () => {
    cy.get("input")
      .get("#symbolsGroupListInput")
      .type("My first symbols list{enter}");
    cy.get("input").get("#saveSymbolsList").click();
    cy.get("input")
      .get("#symbolsGroupListInput")
      .should("have.value", "My first symbols list")
      .should("be.visible");

    cy.get("input")
      .get("#symbolsListInput")
      .should("be.visible")
      .should("have.value", "")
      .click();
    cy.get("#symbolsListInput-option-0").should("be.visible");
    cy.get("#symbolsListInput-option-1").should("be.visible");
    cy.get("#symbolsListInput-option-2").should("be.visible");
  });
  it("Is adding symbol", () => {
    cy.get("input")
      .get("#symbolsGroupListInput")
      .type("My first symbols list{enter}");
    cy.get("input").get("#saveSymbolsList").click();
    cy.get("input")
      .get("#symbolsGroupListInput")
      .should("have.value", "My first symbols list")
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
  });
  it("Is removing symbols", () => {
    cy.get("input")
      .get("#symbolsGroupListInput")
      .type("My first symbols list{enter}");
    cy.get("input").get("#saveSymbolsList").click();
    cy.get("input")
      .get("#symbolsGroupListInput")
      .should("have.value", "My first symbols list")
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
          .should("be.visible")
          .parent()
          .children("svg")
          .should("be.visible")
          .click();

        cy.get("span").contains($option.text()).should("not.exist");
        return;
      });
  });
  it("Is removing symbols with backspace", () => {
    cy.get("input")
      .get("#symbolsGroupListInput")
      .type("My first symbols list{enter}");
    cy.get("input").get("#saveSymbolsList").click();
    cy.get("input")
      .get("#symbolsGroupListInput")
      .should("have.value", "My first symbols list")
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

        cy.get("input")
          .get("#symbolsListInput")
          .should("have.value", "")
          .should("be.visible")
          .focus()
          .type("{backspace}");

        cy.get("span").contains($option.text()).should("not.exist");
      });
  });
});
