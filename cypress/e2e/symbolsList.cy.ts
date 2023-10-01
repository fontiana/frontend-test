import { createGroupList } from "./groupsList.cy";

export const selectSymbol = (index: number) => {
  cy.get("input")
    .get("#symbolsListInput")
    .should("have.value", "")
    .should("be.visible")
    .click();
  cy.get(`#symbolsListInput-option-${index.toString()}`)
    .click()
    .then(($option) => {
      cy.get("span")
        .contains($option.text())
        .should("have.class", "MuiChip-label")
        .should("be.visible");
    });
};

export const symbolsListCheck = () => {
  cy.get("input")
    .get("#symbolsListInput")
    .should("have.value", "")
    .should("be.visible")
    .click();
};

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
    createGroupList("My first symbols list");
    symbolsListCheck();
  });

  it("Can not add symbols without a list", () => {
    cy.get("input")
      .get("#symbolsListInput")
      .should("be.visible")
      .should("have.value", "")
      .should("be.disabled");
  });

  it("Is listing symbols", () => {
    createGroupList("My first symbols list");

    symbolsListCheck();

    cy.get("#symbolsListInput-option-0").should("be.visible");
    cy.get("#symbolsListInput-option-1").should("be.visible");
    cy.get("#symbolsListInput-option-2").should("be.visible");
  });

  it("Is adding symbol", () => {
    createGroupList("My first symbols list");
    selectSymbol(0);
  });

  it("Is removing symbols", () => {
    createGroupList("My first symbols list");

    symbolsListCheck();

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
    createGroupList("My first symbols list");

    symbolsListCheck();

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
