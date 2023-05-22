const API_KEY = Cypress.env("apiKey");

interface CreatePostMockarooData {
  title: string;
  content: string;
}

class CreatePostPage {
  elements = {
    postTitleInput: () => cy.get("textarea[placeholder='Post title']"),
    contentInput: () => cy.get(".koenig-editor__editor"),
    publishButton: () => cy.get("button[data-test-button='publish-flow']"),
    confirmPublishButton: () => cy.get("button[data-test-button='continue']"),
    publishPostRightNowButton: () =>
      cy.get("button[data-test-button='confirm-publish']"),
    revertToDraftButton: () =>
      cy.get("button[data-test-button='revert-to-draft']"),
    unPublishButton: () => cy.get("button[data-test-button='update-flow']"),
    publishSuccessTitle: () => cy.get("div[data-test-complete-title]"),
    backToEditorButton: () =>
      cy.get("button[data-test-button='back-to-editor']"),
    newPostButton: () => cy.get("a[title='New post']"),
    addCustomContentButton: () => cy.get("button.koenig-plus-menu-button"),
    emailSection: () => cy.get("div").contains("Email"),
    emailCard: () => cy.get(".kg-email-card"),
    notification: () => cy.get("div[data-test-text='notification-content']"),
  };

  requests = {
    getMockarooPositiveData: () =>
      cy
        .request<CreatePostMockarooData>(
          `https://my.api.mockaroo.com/create_post_positive.json?key=${API_KEY}`
        )
        .then((response) => response.body),
    getMockarooNegativeData: () =>
      cy
        .request<CreatePostMockarooData>(
          `https://my.api.mockaroo.com/create_post_negative.json?key=${API_KEY}`
        )
        .then((response) => response.body),
  };

  createPost(title: string, content: string) {
    this.typeContent(title, content);
    this.elements.publishButton().click();
    this.elements.confirmPublishButton().click();
    this.elements.publishPostRightNowButton().click();
  }

  typeContent(title: string, content: string) {
    if (title) {
      this.elements.postTitleInput().type(title);
    }
    if (content) {
      this.elements.contentInput().type(content);
    }
  }

  createAndUnpublishPost(title: string, content: string) {
    this.createPost(title, content);

    this.elements.backToEditorButton().click();
    this.elements.unPublishButton().click();
    this.elements.revertToDraftButton().click();
  }

  addEmailContent() {
    this.elements.contentInput().click();
    this.elements.addCustomContentButton().click();
    this.elements.emailSection().click();
  }
}

export const createPostPage = new CreatePostPage();
