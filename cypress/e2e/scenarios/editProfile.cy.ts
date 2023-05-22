import { faker } from "@faker-js/faker";

import mockarooNegativeData from "../../aPrioriData/editProfileNegative.json";
import mockarooPositiveData from "../../aPrioriData/editProfilePositive.json";
import { editProfilePage } from "../../pages/editProfile";
import { loginPage } from "../../pages/login";
import GENERAL_CONSTANTS from "../constants";

describe("Edit profile", () => {
  beforeEach(() => {
    loginPage.login(
      GENERAL_CONSTANTS.VALID_EMAIL,
      GENERAL_CONSTANTS.VALID_PASSWORD
    );

    editProfilePage.visitEditProfilePage();
  });

  describe("A priori data - mockaroo json data", () => {
    describe("Positive cases", () => {
      mockarooPositiveData.forEach((dataPool) => {
        it("should be able to edit user location", () => {
          editProfilePage.tests.positive.editLocation(dataPool.location);
        });

        it("should auto include the facebook url when input gets unfocused", () => {
          editProfilePage.tests.positive.editFacebook(dataPool.facebook);
        });

        it("should be able to edit user email", () => {
          editProfilePage.tests.positive.editEmail(dataPool.email);
        });

        it("should be able to edit user name", () => {
          editProfilePage.tests.positive.editName(dataPool.fullName);
        });

        it("should be able to edit user slug", () => {
          editProfilePage.tests.positive.editSlug(dataPool.slug);
        });

        it("should be able to edit user twitter", () => {
          editProfilePage.tests.positive.editTwitter(dataPool.twitter);
        });

        it("should be able to edit user website", () => {
          editProfilePage.tests.positive.editWebsite(dataPool.website);
        });

        it("should be able to edit user bio", () => {
          editProfilePage.tests.positive.editBio(dataPool.bio);
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
          editProfilePage.tests.negative.editProfile(dataPool.email);
        });

        it("should error when facebook profile is invalid", () => {
          editProfilePage.tests.negative.editFacebook(dataPool.facebook);
        });

        it("should error when twitter profile is invalid", () => {
          editProfilePage.tests.negative.editTwitter(dataPool.twitter);
        });

        it("should error when twitter username is invalid", () => {
          editProfilePage.tests.negative.editTwitterUsername(
            dataPool.twitterInvalidUrl
          );
        });

        it("should error when bio is too long", () => {
          editProfilePage.tests.negative.editBio(dataPool.bio);
        });
      });
    });
  });

  describe("Pseudorandom data - mockaroo api data", () => {
    describe("Positive cases", () => {
      it("should be able to edit user location", () => {
        editProfilePage.requests
          .getMockarooPositiveData()
          .then(({ location }) => {
            editProfilePage.tests.positive.editLocation(location);
          });
      });

      it("should auto include the facebook url when input gets unfocused", () => {
        editProfilePage.requests
          .getMockarooPositiveData()
          .then(({ facebook }) => {
            editProfilePage.tests.positive.editFacebook(facebook);
          });
      });

      it("should be able to edit user email", () => {
        editProfilePage.requests.getMockarooPositiveData().then(({ email }) => {
          editProfilePage.tests.positive.editEmail(email);
        });
      });

      it("should be able to edit user name", () => {
        editProfilePage.requests
          .getMockarooPositiveData()
          .then(({ fullName }) => {
            editProfilePage.tests.positive.editName(fullName);
          });
      });

      it("should be able to edit user slug", () => {
        editProfilePage.requests.getMockarooPositiveData().then(({ slug }) => {
          editProfilePage.tests.positive.editSlug(slug);
        });
      });

      it("should be able to edit user twitter", () => {
        editProfilePage.requests
          .getMockarooPositiveData()
          .then(({ twitter }) => {
            editProfilePage.tests.positive.editTwitter(twitter);
          });
      });

      it("should be able to edit user website", () => {
        editProfilePage.requests
          .getMockarooPositiveData()
          .then(({ website }) => {
            editProfilePage.tests.positive.editWebsite(website);
          });
      });

      it("should be able to edit user bio", () => {
        editProfilePage.requests.getMockarooPositiveData().then(({ bio }) => {
          editProfilePage.tests.positive.editBio(bio);
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
      it("should error when email is invalid", () => {
        editProfilePage.requests.getMockarooNegativeData().then(({ email }) => {
          editProfilePage.tests.negative.editProfile(email);
        });
      });

      it("should error when facebook profile is invalid", () => {
        editProfilePage.requests
          .getMockarooNegativeData()
          .then(({ facebook }) => {
            editProfilePage.tests.negative.editFacebook(facebook);
          });
      });

      it("should error when twitter profile is invalid", () => {
        editProfilePage.requests
          .getMockarooNegativeData()
          .then(({ twitter }) => {
            editProfilePage.tests.negative.editTwitter(twitter);
          });
      });

      it("should error when twitter username is invalid", () => {
        editProfilePage.requests
          .getMockarooNegativeData()
          .then(({ twitterInvalidUrl }) => {
            editProfilePage.tests.negative.editTwitterUsername(
              twitterInvalidUrl
            );
          });
      });

      it("should error when bio is too long", () => {
        editProfilePage.requests.getMockarooNegativeData().then(({ bio }) => {
          editProfilePage.tests.negative.editBio(bio);
        });
      });
    });
  });

  describe("Random data - faker-js data", () => {
    describe("Positive cases", () => {
      it("should be able to edit user location", () => {
        editProfilePage.tests.positive.editLocation(faker.location.country());
      });

      it("should auto include the facebook url when input gets unfocused", () => {
        editProfilePage.tests.positive.editFacebook(faker.internet.userName());
      });

      it("should be able to edit user email", () => {
        editProfilePage.tests.positive.editEmail(faker.internet.email());
      });

      it("should be able to edit user name", () => {
        editProfilePage.tests.positive.editName(faker.person.fullName());
      });

      it("should be able to edit user slug", () => {
        editProfilePage.tests.positive.editSlug(faker.lorem.slug());
      });

      it("should be able to edit user twitter", () => {
        editProfilePage.tests.positive.editTwitter(faker.internet.userName());
      });

      it("should be able to edit user website", () => {
        editProfilePage.tests.positive.editWebsite(faker.internet.url());
      });

      it("should be able to edit user bio", () => {
        editProfilePage.tests.positive.editBio(faker.lorem.sentence());
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
      it("should error when email is invalid", () => {
        editProfilePage.tests.negative.editProfile(faker.internet.url());
      });

      it("should error when facebook profile is invalid", () => {
        editProfilePage.tests.negative.editFacebook(faker.internet.url());
      });

      it("should error when twitter profile is invalid", () => {
        editProfilePage.tests.negative.editTwitter(faker.internet.emoji());
      });

      it("should error when twitter username is invalid", () => {
        editProfilePage.tests.negative.editTwitterUsername(
          faker.internet.email()
        );
      });

      it("should error when bio is too long", () => {
        editProfilePage.tests.negative.editBio(faker.lorem.paragraphs());
      });
    });
  });
});
