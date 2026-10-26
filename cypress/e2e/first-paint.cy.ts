/// <reference types="cypress" />

// Run against the production build so this checks the server-rendered page.
describe('Homepage before hydration', () => {
  it('loads styles and reserves image space without application JavaScript', () => {
    cy.intercept('GET', '**/assets/js/*.js', {
      statusCode: 200,
      headers: { 'content-type': 'application/javascript' },
      body: '',
    });
    cy.visit('/');

    cy.get('main img').should('have.length', 4).each(($image) => {
      cy.wrap($image)
        .should('have.attr', 'width', '200')
        .and('have.attr', 'height', '200')
        .and('have.css', 'width', '200px')
        .and('have.css', 'height', '200px');
    });
    cy.get('main h1')
      .should('have.css', 'font-size', '60px')
      .and('have.css', 'color', 'rgb(255, 255, 255)');
    cy.contains('main h1 span', 'colorful Tables')
      .should('have.css', 'color', 'rgb(50, 120, 230)');
    cy.contains('main a', 'GET STARTED')
      .should('have.css', 'border-top-width', '2px');
    cy.get('main section').should('have.css', 'display', 'flex');
  });
});
