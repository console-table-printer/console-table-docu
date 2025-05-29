describe("Link Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  describe("Navigation Links", () => {
    it("should have working header navigation links", () => {
      // Test GitHub link in header
      cy.get('a[href="https://github.com/ayonious/console-table-printer"]')
        .should("have.attr", "target", "_blank")
        .should("have.attr", "rel", "noopener noreferrer");

      // Test NPM link in header
      cy.get('a[href="https://www.npmjs.com/package/console-table-printer"]')
        .should("have.attr", "target", "_blank")
        .should("have.attr", "rel", "noopener noreferrer");
    });

    it("should have working footer links", () => {
      // Test Learn section links
      cy.contains("Quick Start").click();
      cy.url().should("include", "/docs");
      cy.go("back");

      cy.contains("Getting Started With CLI").click();
      cy.url().should("include", "/docs/doc-cli-install-quick-start");
      cy.go("back");

      // Test Decorate section links
      cy.contains("Color").click();
      cy.url().should("include", "/docs/doc-color");
      cy.go("back");

      cy.contains("Border").click();
      cy.url().should("include", "/docs/doc-border-design");
      cy.go("back");

      cy.contains("Alignment").click();
      cy.url().should("include", "/docs/doc-alignment");
      cy.go("back");
    });

    it("should have working external links in footer", () => {
      // Test GitHub link in footer
      cy.get('footer')
        .find('a[href="https://github.com/ayonious/console-table-printer"]')
        .should("have.attr", "target", "_blank")
        .should("have.attr", "rel", "noopener noreferrer");

      // Test NPM link in footer
      cy.get('footer')
        .find('a[href="https://www.npmjs.com/package/console-table-printer"]')
        .should("have.attr", "target", "_blank")
        .should("have.attr", "rel", "noopener noreferrer");
    });
  });

  describe("Documentation Page Links", () => {
    beforeEach(() => {
      cy.contains("GET STARTED").click();
    });

    it("should have working sidebar navigation links", () => {
      // Test all sidebar links
      const sidebarLinks = [
        { text: "Install and Quick start", url: "/docs" },
        { text: "Create Table Instance", url: "/docs/doc-table-instance-creation" },
        { text: "Adding Rows", url: "/docs/doc-adding-rows" },
        { text: "Row Dividers", url: "/docs/doc-row-divider" },
        { text: "Adding Columns", url: "/docs/doc-add-columns" },
        { text: "Coloring", url: "/docs/doc-color" },
        { text: "Sort and Filter", url: "/docs/doc-sort-filter" },
        { text: "Alignment", url: "/docs/doc-alignment" },
        { text: "Enable and Disable Columns", url: "/docs/doc-enable-disable-col" },
        { text: "Calculated Columns", url: "/docs/doc-computed-function" },
        { text: "Table Title", url: "/docs/doc-title" },
        { text: "Column Title", url: "/docs/doc-column-title" },
        { text: "Limit Column Width", url: "/docs/doc-limit-line-width" },
        { text: "Border Design", url: "/docs/doc-border-design" },
        { text: "Special Chars and emojis", url: "/docs/doc-emojis-special-chars" },
        { text: "Render Console Output", url: "/docs/doc-render-console" },
        { text: "Typescript", url: "/docs/doc-typescript" },
        { text: "Quick Start", url: "/docs/doc-cli-install-quick-start" }
      ];

      sidebarLinks.forEach(link => {
        cy.contains(link.text).click();
        cy.url().should("include", link.url);
        // Verify page content is loaded
        cy.get("main").should("exist");
        cy.get("main").should("be.visible");
        
        // Additional checks for Special Chars and emojis page
        if (link.text === "Special Chars and emojis") {
          // Verify both sections are present
          cy.contains("Special chars").should("be.visible");
          cy.contains("Newlines in cells").should("be.visible");
          
          // Verify code examples
          cy.get('pre[class*="language-"]').should('have.length.at.least', 2);
          
          // Verify screenshots
          cy.get('img[alt="Screenshot"]').should('have.length.at.least', 2);
        }
      });
    });
  });

  describe("Announcement Bar Link", () => {
    it("should have working GitHub star link", () => {
      cy.get('div[class*="announcementBarContent"]')
        .find('a[href="https://github.com/ayonious/console-table-printer"]')
        .should("have.attr", "target", "_blank")
        .should("have.attr", "rel", "noopener noreferrer");
    });
  });
}); 