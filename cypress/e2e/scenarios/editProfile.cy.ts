import { editProfilePage } from "../../pages/editProfile";
import { loginPage } from "../../pages/login";
import GENERAL_CONSTANTS from "../constants";
import mockarooPositiveData from "../../aPrioriData/editProfilePositive.json";
import mockarooNegativeData from "../../aPrioriData/editProfileNegative.json";

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

describe("Edit profile", () => {
  beforeEach(() => {
    loginPage.login(
      GENERAL_CONSTANTS.VALID_EMAIL,
      GENERAL_CONSTANTS.VALID_PASSWORD
    );

    editProfilePage.visitEditProfilePage();
  });

  describe("Positive cases", () => {
    mockarooPositiveData.forEach((dataPool) => {
      it("should be able to edit user location", () => {
        editProfilePage.editProfile({ location: dataPool.location });
        editProfilePage.elements.saveButton().click();
        editProfilePage.elements.savedButton().should("be.visible");
      });

      it("should auto include the facebook url when input gets unfocused", () => {
        editProfilePage.editProfile({ facebook: dataPool.facebook });

        const url = `${CONSTANTS.FACEBOOK_URL}${dataPool.facebook}`;

        editProfilePage.elements.facebookInput().click().blur();

        editProfilePage.elements.facebookInput().should("have.value", url);
      });

      it("should be able to edit user email", () => {
        editProfilePage.editProfile({ email: dataPool.email });
        GENERAL_CONSTANTS.VALID_EMAIL = dataPool.email;
        editProfilePage.elements.saveButton().click();
        editProfilePage.elements.savedButton().should("be.visible");
      });

      it("should be able to edit user name", () => {
        editProfilePage.editProfile({ name: dataPool.fullName });
        editProfilePage.elements.saveButton().click();
        editProfilePage.elements.savedButton().should("be.visible");
      });

      it("should be able to edit user slug", () => {
        editProfilePage.editProfile({ slug: dataPool.slug });
        editProfilePage.elements.saveButton().click();
        editProfilePage.elements.savedButton().should("be.visible");
      });

      it("should be able to edit user twitter", () => {
        editProfilePage.editProfile({ twitter: dataPool.twitter });
        editProfilePage.elements.saveButton().click();
        editProfilePage.elements.savedButton().should("be.visible");
      });

      it("should be able to edit user website", () => {
        editProfilePage.editProfile({ website: dataPool.website });
        editProfilePage.elements.saveButton().click();
        editProfilePage.elements.savedButton().should("be.visible");
      });

      it("should be able to edit user bio", () => {
        editProfilePage.editProfile({ bio: dataPool.bio });
        editProfilePage.elements.saveButton().click();
        editProfilePage.elements.savedButton().should("be.visible");
      });
    });

    // Cleanup of the tests by updating the email to the original one to not alter future tests
    after(() => {
      editProfilePage.visitEditProfilePage();

      const defaultEmail = "test@test.com";

      editProfilePage.editProfile({ email: defaultEmail });
      GENERAL_CONSTANTS.VALID_EMAIL = defaultEmail;

      editProfilePage.elements.saveButton().click();
    });
  });

  describe("Negative cases", () => {
    mockarooNegativeData.forEach((dataPool) => {
      it("should error when email is invalid", () => {
        editProfilePage.editProfile({ email: dataPool.email }, true);
        editProfilePage.elements
          .inputErrors()
          .contains(CONSTANTS.ERROR_LABELS.emailError)
          .should("be.visible");
      });
      it("should error when facebook profile is invalid", () => {
        editProfilePage.editProfile({ facebook: dataPool.facebook }, true);
        editProfilePage.elements
          .inputErrors()
          .contains(CONSTANTS.ERROR_LABELS.facebookProfileError)
          .should("be.visible");
      });
      it("should error when twitter profile is invalid", () => {
        editProfilePage.editProfile({ twitter: dataPool.twitter }, true);
        editProfilePage.elements
          .inputErrors()
          .contains(CONSTANTS.ERROR_LABELS.twitterProfileError)
          .should("be.visible");
      });
      it("should error when twitter username is invalid", () => {
        editProfilePage.editProfile(
          { twitter: dataPool.twitterInvalidUrl },
          true
        );
        editProfilePage.elements
          .inputErrors()
          .contains(CONSTANTS.ERROR_LABELS.twitterUsernameError)
          .should("be.visible");
      });
      it("should error when bio is too long", () => {
        editProfilePage.editProfile({ bio: dataPool.bio }, true);
        editProfilePage.elements
          .inputErrors()
          .contains(CONSTANTS.ERROR_LABELS.bioError)
          .should("be.visible");
      });
    });
  });
});
