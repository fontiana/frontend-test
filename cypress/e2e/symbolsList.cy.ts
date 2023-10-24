import { groupsInput, saveInput } from "../selectors/groupsList.css";
import {
  symbolFirstOption,
  symbolSecondOption,
  symbolThirdOption,
  symbolsInput,
} from "../selectors/symbolsList.css";

const createGroupList = (listName: string) => {
  cy.get("input").get(groupsInput).type(`${listName}{enter}`);
  cy.get("input").get(saveInput).click();
  groupListCheck(listName);
};

const groupListCheck = (listName: string) => {
  cy.get("input")
    .get(groupsInput)
    .should("have.value", listName)
    .should("be.visible");
};

const selectSymbol = (index: number) => {
  cy.get("input")
    .get(symbolsInput)
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

const symbolsListCheck = () => {
  cy.get("input")
    .get(symbolsInput)
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
      .get(symbolsInput)
      .should("be.visible")
      .should("have.value", "")
      .should("be.disabled");
  });

  it("Is listing symbols", () => {
    createGroupList("My first symbols list");

    symbolsListCheck();

    cy.get(symbolFirstOption).should("be.visible");
    cy.get(symbolSecondOption).should("be.visible");
    cy.get(symbolThirdOption).should("be.visible");
  });

  it("Is adding symbol", () => {
    createGroupList("My first symbols list");
    selectSymbol(0);
  });

  it("Is removing symbols", () => {
    createGroupList("My first symbols list");

    symbolsListCheck();

    cy.get(symbolFirstOption)
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

    cy.get(symbolFirstOption)
      .click()
      .then(($option) => {
        cy.get("span")
          .contains($option.text())
          .should("have.class", "MuiChip-label")
          .should("be.visible");

        cy.get("input")
          .get(symbolsInput)
          .should("have.value", "")
          .should("be.visible")
          .focus()
          .type("{backspace}");

        cy.get("span").contains($option.text()).should("not.exist");
      });
  });
});
