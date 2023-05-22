import GENERAL_CONSTANTS from "../constants";
import { loginPage } from "../../pages/login";
import { createPostPage } from "../../pages/createPost";
import mockarooPositiveData from "../../aPrioriData/createPostPositive.json";
import mockarooNegativeData from "../../aPrioriData/createPostNegative.json";
import { faker } from "@faker-js/faker";

describe("Create post", () => {
  beforeEach(() => {
    loginPage.login(
      GENERAL_CONSTANTS.VALID_EMAIL,
      GENERAL_CONSTANTS.VALID_PASSWORD
    );
    createPostPage.elements.newPostButton().click();
  });

  describe("A priori data - mockaroo json data", () => {
    describe("Positive cases", () => {
      mockarooPositiveData.forEach((dataPool) => {
        it("should create a new post", () => {
          createPostPage.createPost(dataPool.title, dataPool.content);

          createPostPage.elements.publishSuccessTitle().should("be.visible");
        });

        it("should be able to unpublish a post", () => {
          createPostPage.createAndUnpublishPost(
            dataPool.title,
            dataPool.content
          );

          createPostPage.elements
            .notification()
            .contains("Post successfully reverted to a draft.");
        });
      });
    });
    describe("Negative cases", () => {
      mockarooPositiveData.forEach((dataPool) => {
        it("should not be able create a new post when it does not have content", () => {
          createPostPage.elements.postTitleInput().type(dataPool.title);

          createPostPage.elements.publishButton().should("not.exist");
        });
      });
      mockarooNegativeData.forEach((dataPool) => {
        it("should not create a new post", () => {
          createPostPage.typeContent(dataPool.title, dataPool.content);

          createPostPage.elements.publishButton().should("not.exist");
        });
      });
    });
  });

  describe("Pseudorandom data - mockaroo api data", () => {
    describe("Positive cases", () => {
      it("should create a new post", () => {
        createPostPage.requests.getMockarooPositiveData().then((dataPool) => {
          createPostPage.createPost(dataPool.title, dataPool.content);

          createPostPage.elements.publishSuccessTitle().should("be.visible");
        });
      });

      it("should be able to unpublish a post", () => {
        createPostPage.requests.getMockarooPositiveData().then((dataPool) => {
          createPostPage.createAndUnpublishPost(
            dataPool.title,
            dataPool.content
          );

          createPostPage.elements
            .notification()
            .contains("Post successfully reverted to a draft.");
        });
      });
    });
    describe("Negative cases", () => {
      it("should not be able create a new post when it does not have content", () => {
        createPostPage.requests.getMockarooPositiveData().then((dataPool) => {
          createPostPage.elements.postTitleInput().type(dataPool.title);

          createPostPage.elements.publishButton().should("not.exist");
        });
      });
      it("should not create a new post", () => {
        createPostPage.requests.getMockarooNegativeData().then((dataPool) => {
          createPostPage.typeContent(dataPool.title, dataPool.content);

          createPostPage.elements.publishButton().should("not.exist");
        });
      });
    });
  });

  describe("Random data - faker-js data", () => {
    describe("Positive cases", () => {
      it("should create a new post", () => {
        createPostPage.createPost(
          faker.person.jobTitle(),
          faker.lorem.paragraph(1)
        );

        createPostPage.elements.publishSuccessTitle().should("be.visible");
      });

      it("should be able to unpublish a post", () => {
        createPostPage.createAndUnpublishPost(
          faker.person.jobTitle(),
          faker.lorem.paragraph(1)
        );

        createPostPage.elements
          .notification()
          .contains("Post successfully reverted to a draft.");
      });
    });
    describe("Negative cases", () => {
      it("should not be able create a new post when it does not have content", () => {
        createPostPage.elements.postTitleInput().type(faker.person.jobTitle());

        createPostPage.elements.publishButton().should("not.exist");
      });
      it("should not create a new post", () => {
        createPostPage.typeContent(faker.internet.emoji(), faker.internet.emoji());

        createPostPage.elements.publishButton().should("not.exist");
      });
    });
  });
});
