class SearchPage {
  elements = {
    searchModal: () => cy.get(".gh-nav-search-modal"),
    body: () => cy.get("body"),
  }

  openSearchModal() {
    this.elements.body().type("{ctrl}k");
  }

  closeSearchModal() {
    this.elements.body().type("{esc}");
  }
}

export const searchPage = new SearchPage();
