import { editPostPage } from "../../pages/editPost";
import { loginPage } from "../../pages/login";
import GENERAL_CONSTANTS from "../constants";

const ghostUrl = Cypress.env("ghostUrl");

const CONSTANTS = {
  POST_TITLE: "Test post",
  POST_CONTENT: "Test post content",
};

describe("Edit post", () => {
  beforeEach(() => {
    loginPage.login(
      GENERAL_CONSTANTS.VALID_EMAIL,
      GENERAL_CONSTANTS.VALID_PASSWORD
    );

    cy.wait(500);
    cy.visit(`${ghostUrl}/ghost/#/posts?type=draft`);
    editPostPage.elements.firstPost().click();
  });

  it("should be able to edit a post title", () => {
    editPostPage.elements.postTitleInput().clear();

    const updatedTitle = `${CONSTANTS.POST_TITLE} Updated`;
    editPostPage.editPost(updatedTitle, "");

    editPostPage.elements.contentInput().click();

    editPostPage.elements.navigateToPosts().click();

    cy.wait(1000);

    editPostPage.elements.firstPost().should("contain", updatedTitle);
  });

  it("should be able to edit a post content", () => {
    editPostPage.elements.contentInput().clear();

    const updatedContent = `${CONSTANTS.POST_CONTENT} Updated`;
    editPostPage.editPost("", updatedContent);
    editPostPage.elements.navigateToPosts().click();
    cy.wait(1000);
    editPostPage.elements.firstPost().click();
    cy.wait(1000);

    editPostPage.elements.contentInput().should("contain", updatedContent);
  });

  it("should change the post title to '' if it is changed to empty text", () => {
    editPostPage.elements.postTitleInput().clear();

    editPostPage.elements.contentInput().click();
    cy.wait(1000);

    editPostPage.elements.postTitleInput().should("have.value", "");
  });
});
