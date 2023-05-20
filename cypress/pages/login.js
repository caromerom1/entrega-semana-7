const ghostUrl = Cypress.env("ghostUrl");

class LoginPage {
  elements = {
    emailInput: () => cy.get("input[name='identification']"),
    passwordInput: () => cy.get("input[name='password']"),
    loginButton: () => cy.get("button.login"),
  }

  login(email, password) {
    cy.visit(`${ghostUrl}/ghost/#/signin`);
    cy.wait(1000);
    this.elements.emailInput().type(email);
    this.elements.passwordInput().type(password);
    this.elements.loginButton().click();
    cy.wait(1000);
  }
}

export const loginPage = new LoginPage();
