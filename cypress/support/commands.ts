// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Declare global Cypress namespace to add custom commands
declare namespace Cypress {
  interface Chainable {
    // Add custom command types here if needed
    // Example:
    // login(email: string, password: string): Chainable<void>;
  }
}

// -- This is a parent command --
// Cypress.Commands.add('login', (email: string, password: string) => { ... })

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element' }, (subject: Element, options?: any) => { ... })

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional' }, (subject: Element, options?: any) => { ... })

// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn: Function, url: string, options: any) => { ... }) 