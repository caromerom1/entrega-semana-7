import { loginPage } from "../../pages/login";
import { searchPage } from "../../pages/search";
import GENERAL_CONSTANTS from "../constants";

describe("Search", () => {
  beforeEach(() => {
    loginPage.login(
      GENERAL_CONSTANTS.VALID_EMAIL,
      GENERAL_CONSTANTS.VALID_PASSWORD
    );

    cy.wait(500);
  });

  it("should open search modal when ctrl+k is pressed", () => {
    searchPage.elements.searchModal().should("not.exist");
    searchPage.openSearchModal();
    searchPage.elements.searchModal().should("exist");
  });

  it("should close search modal when esc is pressed", () => {
    searchPage.elements.searchModal().should("not.exist");
    searchPage.openSearchModal();
    searchPage.elements.searchModal().should("exist");
    searchPage.closeSearchModal();
    searchPage.elements.searchModal().should("not.exist");
  });
});
