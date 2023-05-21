class EditPostPage {
  elements = {
    postTitleInput: () => cy.get("textarea[placeholder='Post title']"),
    contentInput: () => cy.get(".koenig-editor__editor"),
    firstPost: () => cy.get(".gh-list-row.gh-posts-list-item").first(),
    navigateToPosts: () =>
      cy.get("a[href='#/posts/?type=draft']").contains("Posts"),
  };

  editPost(title: string, content: string) {
    if (title) {
      this.elements.postTitleInput().clear().type(title, { force: true });
    }
    if (content) {
      this.elements.contentInput().clear().type(content, { force: true });
    }
  }
}

export const editPostPage = new EditPostPage();
