import { createGroupList } from "./groupsList.cy";
import { symbolsListCheck } from "./symbolsList.cy";

export const selectSymbol = (index: number) => {
  cy.get(`#symbolsListInput-option-${index.toString()}`)
    .click()
    .then(($option) => {
      cy.get("span")
        .contains($option.text())
        .should("have.class", "MuiChip-label")
        .should("be.visible");
    });
};

describe("Validate binance integration", () => {
  beforeEach(() => {
    cy.visit("/");
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

  it("Check symbols info websocket", () => {
    createGroupList("My second symbols list");
    symbolsListCheck();
    selectSymbol(0);
    symbolsListCheck();
    selectSymbol(1);
    symbolsListCheck();
    cy.get("input").get("#symbolsListInput").blur();

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
