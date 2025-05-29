import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      // No plugins needed for now
      return config;
    },
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.ts'
  },
})
