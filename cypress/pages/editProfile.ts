interface EditProfileData {
  bio?: string;
  email?: string;
  facebook?: string;
  location?: string;
  name?: string;
  slug?: string;
  twitter?: string;
  website?: string;
}

class EditProfilePage {
  elements = {
    bioInput: () => cy.get("textarea[data-test-bio-input]"),
    emailInput: () => cy.get("input[data-test-email-input]"),
    facebookInput: () => cy.get("input[data-test-facebook-input]"),
    inputErrors: () => cy.get("p.response"),
    locationInput: () => cy.get("input[data-test-location-input]"),
    nameError: () => cy.get("p.response"),
    nameInput: () => cy.get("input[data-test-name-input]"),
    profileButton: () => cy.get("a[data-test-nav='user-profile']"),
    saveButton: () => cy.get("button[data-test-save-button]"),
    savedButton: () => cy.get("button.gh-btn").contains("Saved"),
    slugInput: () => cy.get("input[data-test-slug-input]"),
    retryButton: () => cy.get("button.gh-btn").contains("Retry"),
    twitterInput: () => cy.get("input[data-test-twitter-input]"),
    userDropdown: () => cy.get("div[class='pe-all']"),
    websiteInput: () => cy.get("input[data-test-website-input]"),
  };

  visitEditProfilePage() {
    this.elements.userDropdown().click();
    this.elements.profileButton().click();
  }

  editProfile(data: EditProfileData, blur = false) {
    Object.entries(data).forEach(([key, value]) => {
      if (!value) {
        return;
      }
      if (!blur) {
        this.elements[`${key}Input`]().clear().type(value);
        return;
      }
      this.elements[`${key}Input`]().clear().type(value).blur();
    });
  }
}

export const editProfilePage = new EditProfilePage();
