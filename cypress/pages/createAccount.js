const ghostUrl = Cypress.env("ghostUrl");

class CreateAccountPage {
  elements = {
    blogTitleInput: () => cy.get("input[name='blog-title']"),
    nameInput: () => cy.get("input[name='name']"),
    emailInput: () => cy.get("input[name='email']"),
    passwordInput: () => cy.get("input[name='password']"),
    createAccountButton: () => cy.get("button[data-test-button='setup']"),
    loginButton: () => cy.get("button.login"),
    inputErrors: () => cy.get("p.response"),
    mainError: () => cy.get("p.main-error"),
    skipNormalFlowButton: () => cy.get("a.gh-done-pink"),
  };

  createAccount(blogTitle, name, email, password) {
    const signupUrl = `${ghostUrl}/ghost/#/setup`;

    cy.visit(signupUrl);
    cy.wait(1000);
    this.elements.blogTitleInput().type(blogTitle);
    this.elements.nameInput().type(name);
    this.elements.emailInput().type(email);
    this.elements.passwordInput().type(password);
    this.elements.createAccountButton().click();
  }
}

export const createAccountPage = new CreateAccountPage();
