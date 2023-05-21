const ghostUrl = Cypress.env("ghostUrl");

class LoginPage {
  elements = {
    emailInput: () => cy.get("input[name='identification']"),
    passwordInput: () => cy.get("input[name='password']"),
    loginButton: () => cy.get("button.login"),
  };

  login(email: string, password: string) {
    cy.visit(`${ghostUrl}/ghost/#/signin`);
    this.elements.emailInput().type(email);
    this.elements.passwordInput().type(password);
    this.elements.loginButton().click();
  }
}

export const loginPage = new LoginPage();
