export const createGroupList = (listName: string) => {
  cy.get("input").get("#symbolsGroupListInput").type(`${listName}{enter}`);
  cy.get("input").get("#saveSymbolsList").click();
  groupListCheck(listName);
};

export const groupListCheck = (listName: string) => {
  cy.get("input")
    .get("#symbolsGroupListInput")
    .should("have.value", listName)
    .should("be.visible");
};

export const unselectGroupList = () => {
  cy.get("button")
    .get(".MuiAutocomplete-clearIndicator")
    .should("have.attr", "title", "Clear")
    .should("be.visible")
    .click();
};

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
    groupListCheck("");
  });

  it("Is canceling a list creation", () => {
    cy.get("input")
      .get("#symbolsGroupListInput")
      .type("My first symbols list{enter}");
    cy.get("input").get("#cancelSymbolsList").click();
    groupListCheck("");
  });

  it("Is saving list with enter", () => {
    createGroupList("My first symbols list");
  });

  it("Is saving list on selecting on a dropdown", () => {
    cy.get("input").get("#symbolsGroupListInput").type("My first symbols list");
    cy.get("li")
      .get("#symbolsGroupListInput-option-0")
      .should("contain.text", "My first symbols list")
      .should("be.visible")
      .click();
    cy.get("input").get("#saveSymbolsList").click();
    groupListCheck("My first symbols list");
  });

  it("Is unselecting a list", () => {
    createGroupList("My first symbols list");
    unselectGroupList();
    groupListCheck("");
  });

  it("Is deleting a list", () => {
    createGroupList("My first symbols list");
    cy.get("#deleteSymbolsList").should("be.visible").click();

    groupListCheck("");

    cy.get("input").get("#symbolsGroupListInput").focus();

    cy.get("li").get("#symbolsGroupListInput-option-0").should("not.exist");
    cy.get("input").get("#symbolsGroupListInput").blur();
  });

  it("Is filtering a list", () => {
    createGroupList("My first symbols list");
    unselectGroupList();
    createGroupList("My second symbols list");
    unselectGroupList();

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
