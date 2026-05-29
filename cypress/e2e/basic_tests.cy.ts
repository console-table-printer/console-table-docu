describe("Integration Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Home page is loaded", () => {
    // homepage get started button
    cy.contains("GET STARTED");
  });

  it("Docs Pages Works: Default Page", () => {
    // homepage get started button clicked
    cy.contains("GET STARTED").click();

    // show default docs page
    const expectedTexts: string[] = [
      "Install and Quick start",
      "Coloring",
      "Sort and Filter",
      "Alignment",
      "Installation",
      "Basic Example"
    ];

    expectedTexts.forEach((text: string) => {
      cy.contains(text);
    });
  });

  it("Docs Pages Works: Quick Start", () => {
    // homepage get started button clicked
    cy.contains("GET STARTED").click();

    // Navigate through the sidebar link. The page title is "Quick Start",
    // but the docs page also has footer links with the same text.
    cy.get(".theme-doc-sidebar-container")
      .contains("a", "CLI Quick Start")
      .click();

    cy.url().should("include", "/docs/doc-cli-install-quick-start");
    cy.contains("Detailed usage");
  });
});
