describe("Site Integrity Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  describe("Basic Navigation", () => {
    it("should navigate to documentation", () => {
      cy.contains("GET STARTED").click();
      cy.url().should("include", "/docs");
      cy.contains("Installation").should("exist");
    });
  });

  describe("Documentation Structure", () => {
    beforeEach(() => {
      cy.contains("GET STARTED").click();
    });

    it("should have basic documentation elements", () => {
      // Check for sidebar
      cy.get(".theme-doc-sidebar-container").should("exist");
      
      // Check for main content area
      cy.get(".theme-doc-markdown").should("exist");
      
      // Check for navigation elements
      cy.get(".pagination-nav").should("exist");
    });

    it("should have properly formatted code blocks", () => {
      // Check for presence of code blocks
      cy.get("pre").should("exist");
      cy.get('pre[class*="language-"]').should("exist");
      
      // Verify code block content
      cy.get('pre[class*="language-"]').first()
        .should("be.visible")
        .and("not.be.empty");
    });

    it("should have working images", () => {
      // Check all images are loaded
      cy.get("img").each(($img) => {
        // Check only visible images
        if ($img.is(":visible")) {
          cy.wrap($img)
            .should("be.visible")
            .and(($img) => {
              expect($img[0].naturalWidth).to.be.greaterThan(0);
            });
        }
      });
    });
  });

  describe("Sidebar Navigation", () => {
    beforeEach(() => {
      cy.contains("GET STARTED").click();
    });

    const mainPages = [
      "Install and Quick start",
      "Create Table Instance",
      "Adding Rows"
    ];

    mainPages.forEach(page => {
      it(`should navigate to ${page}`, () => {
        cy.contains(".theme-doc-sidebar-item-link", page).click();
        cy.contains("h1", page).should("exist");
      });
    });
  });

  describe("Footer Links", () => {
    it("should have working footer links", () => {
      // Check footer sections exist
      cy.get("footer").within(() => {
        cy.contains("Learn").should("exist");
        cy.contains("Decorate").should("exist");
        cy.contains("More").should("exist");
      });

      // Check specific links
      cy.get("footer")
        .contains("a", "GitHub")
        .should("have.attr", "href")
        .and("include", "github.com");
      
      cy.get("footer")
        .contains("a", "Npmjs")
        .should("have.attr", "href")
        .and("include", "npmjs.com");
    });
  });

  describe("Performance", () => {
    it("should load pages within acceptable time", () => {
      cy.window().then((win) => {
        const perfData = win.performance.getEntriesByType("navigation")[0];
        expect(perfData.duration).to.be.lessThan(5000); // More lenient timeout of 5 seconds
      });
    });
  });
});
