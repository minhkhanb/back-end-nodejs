/// <reference types="cypress" />

describe('Login page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('Log in with valid credentials.', () => {
    cy.login('user@gmail.com', 'Aa123456!@');
  });

  // it('Check the Show Password feature.', () => {
  //   console.log('Check the Show Password feature.');
  // });
  //
  // it('Check the Remember Me checkbox.', () => {
  //   console.log('Check the Remember Me checkbox.');
  // });
  //
  // it('Check the autofill.', () => {
  //
  // });
  //
  it('Check the Log Out button.', () => {
    cy.get('.email-input').type('user@gmail.com');

    // {enter} causes the form to submit
    cy.get('.password-input').type('Aa123456!@{enter}');

    // we should be redirected to /
    cy.url().should('include', '/');

    // click to user menu
    cy.get('.user-menu').click();

    cy.get('.menu').should('include.text', 'Logout');
  });
  //
  // it('Restore the password with a registered email.', () => {
  //   console.log('Restore the password with a registered email.');
  // });
  //
  // it('Check the Forgot Password email. ', () => {
  //   console.log('Check the Forgot Password email. ');
  // });
  //
  // it('Create a new password using valid data. ', () => {
  //   console.log('Create a new password using valid data. ');
  // });
  //
  // it('Log into the account using a new password.', () => {
  //   console.log('Log into the account using a new password.');
  // });
  //
  // it('Switch between input fields using Tab.', () => {
  //   console.log('Switch between input fields using Tab. ');
  // });
  //
  // it('Log in with valid credentials in different browsers.', () => {
  //   console.log('Log in with valid credentials in different browsers. ');
  // });
  //
  // it('Log in with valid credentials using different devices.', () => {
  //   console.log('Log in with valid credentials using different devices.');
  // });
});
