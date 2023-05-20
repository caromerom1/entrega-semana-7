import GENERAL_CONSTANTS from "../e2e/constants";

const ghostUrl = Cypress.env("ghostUrl");

class EditProfilePage {
  elements = {
    nameInput: () => cy.get("input[data-test-name-input]"),
    saveButton: () => cy.get("button[data-test-save-button]"),
    savedButton: () => cy.get("button.gh-btn").contains("Saved"),
    nameError: () => cy.get("p.response"),
    locationInput: () => cy.get("input#user-location"),
    slugInput: () => cy.get("input[data-test-slug-input]"),
    facebookInput: () => cy.get("input[data-test-facebook-input]"),
    inputErrors: () => cy.get("p.response"),
  };

  visitEditProfilePage() {
    const userParam = GENERAL_CONSTANTS.VALID_NAME.split(" ")[0].toLowerCase();
    cy.visit(`${ghostUrl}/ghost/#/settings/staff/${userParam}`);
    cy.wait(1000);
  }
}

export const editProfilePage = new EditProfilePage();
