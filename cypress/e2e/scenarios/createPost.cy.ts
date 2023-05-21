import GENERAL_CONSTANTS from "../constants";
import { loginPage } from "../../pages/login";
import { createPostPage } from "../../pages/createPost";
import DATA from '../../aPrioriData/createPost.json'

const data = DATA[1]

const CONSTANTS = {
  POST_TITLE: data.Title,
  POST_CONTENT: data.Content,
}

beforeEach(() => {
  loginPage.login(
    GENERAL_CONSTANTS.VALID_EMAIL,
    GENERAL_CONSTANTS.VALID_PASSWORD
  );
  createPostPage.elements.newPostButton().click();
});

describe("Create post", () => {
  it("should create a new post", () => {
    createPostPage.createPost(CONSTANTS.POST_TITLE, CONSTANTS.POST_CONTENT);

    createPostPage.elements.publishSuccessTitle().should("be.visible");
  });

  it("should create a new post with title '' when no title is set", () => {
    createPostPage.createPost("", CONSTANTS.POST_CONTENT);

    createPostPage.elements.publishSuccessTitle().should("be.visible");

    createPostPage.elements.backToEditorButton().click();

    createPostPage.elements.postTitleInput().should("have.value", "");
  });

  it("should not be able create a new post when it does not have content", () => {
    createPostPage.elements.postTitleInput().type(CONSTANTS.POST_TITLE);

    createPostPage.elements.publishButton().should("not.exist");
  });

  it("should be able to unpublish a post", () => {
    createPostPage.createAndUnpublishPost(CONSTANTS.POST_TITLE, CONSTANTS.POST_CONTENT);

    createPostPage.elements.notification().contains("Post successfully reverted to a draft.")
  });

  it("should be able to add email only content", () => {
    createPostPage.addEmailContent();
    createPostPage.elements.emailCard().should("exist");
  });
});
