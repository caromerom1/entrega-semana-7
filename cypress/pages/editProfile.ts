import GENERAL_CONSTANTS from "../e2e/constants";

const API_KEY = Cypress.env("apiKey");

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

interface EditProfileMockarooData {
  bio: string;
  email: string;
  facebook: string;
  location: string;
  fullName: string;
  slug: string;
  twitter: string;
  twitterInvalidUrl: string;
  website: string;
}

const CONSTANTS = {
  ERROR_LABELS: {
    emailError: "Please supply a valid email address",
    facebookProfileError:
      "The URL must be in a format like https://www.facebook.com/yourPage",
    twitterProfileError:
      "The URL must be in a format like https://twitter.com/yourUsername",
    twitterUsernameError: "Your Username is not a valid Twitter Username",
    bioError: "Bio is too long",
    websiteError: "Website is not a valid url",
  },
  FACEBOOK_URL: "https://www.facebook.com/",
};

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

  requests = {
    getMockarooPositiveData: () =>
      cy
        .request<EditProfileMockarooData>(
          `https://my.api.mockaroo.com/edit_profile_positive.json?key=${API_KEY}`
        )
        .then((response) => response.body),
    getMockarooNegativeData: () =>
      cy
        .request<EditProfileMockarooData>(
          `https://my.api.mockaroo.com/edit_profile_negative.json?key=${API_KEY}`
        )
        .then((response) => response.body),
  };

  tests = {
    positive: {
      checkSaveSuccess: () => {
        this.elements.saveButton().click();
        this.elements.savedButton().should("be.visible");
      },
      editLocation: (location: string) => {
        this.editProfile({ location });
        this.tests.positive.checkSaveSuccess();
      },
      editFacebook: (facebook: string) => {
        this.editProfile({ facebook });

        const url = `${CONSTANTS.FACEBOOK_URL}${facebook}`;

        this.elements.facebookInput().click().blur();

        this.elements.facebookInput().should("have.value", url);
      },
      editEmail: (email: string) => {
        this.editProfile({ email });
        GENERAL_CONSTANTS.VALID_EMAIL = email;
        this.tests.positive.checkSaveSuccess();
      },

      editName: (name: string) => {
        this.editProfile({ name });
        this.tests.positive.checkSaveSuccess();
      },
      editSlug: (slug: string) => {
        this.editProfile({ slug });
        this.tests.positive.checkSaveSuccess();
      },
      editTwitter: (twitter: string) => {
        this.editProfile({ twitter });
        this.tests.positive.checkSaveSuccess();
      },
      editWebsite: (website: string) => {
        this.editProfile({ website });
        this.tests.positive.checkSaveSuccess();
      },
      editBio: (bio: string) => {
        this.editProfile({ bio });
        this.tests.positive.checkSaveSuccess();
      },
    },
    negative: {
      editProfile: (email: string) => {
        this.editProfile({ email }, true);
        this.elements
          .inputErrors()
          .contains(CONSTANTS.ERROR_LABELS.emailError)
          .should("be.visible");
      },
      editFacebook: (facebook: string) => {
        this.editProfile({ facebook }, true);
        this.elements
          .inputErrors()
          .contains(CONSTANTS.ERROR_LABELS.facebookProfileError)
          .should("be.visible");
      },
      editTwitter: (twitter: string) => {
        this.editProfile({ twitter }, true);
        this.elements
          .inputErrors()
          .contains(CONSTANTS.ERROR_LABELS.twitterProfileError)
          .should("be.visible");
      },
      editTwitterUsername: (username: string) => {
        this.editProfile({ twitter: username }, true);
        this.elements
          .inputErrors()
          .contains(CONSTANTS.ERROR_LABELS.twitterUsernameError)
          .should("be.visible");
      },
      editBio: (bio: string) => {
        this.editProfile({ bio }, true);
        this.elements
          .inputErrors()
          .contains(CONSTANTS.ERROR_LABELS.bioError)
          .should("be.visible");
      },
    },
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
