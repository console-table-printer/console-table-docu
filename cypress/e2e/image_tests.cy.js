describe("Documentation Page Images", () => {
  const pages = [
    { url: "/docs", name: "Install and Quick start" },
    { url: "/docs/doc-table-instance-creation", name: "Create Table Instance" },
    { url: "/docs/doc-adding-rows", name: "Adding Rows" },
    { url: "/docs/doc-row-divider", name: "Row Dividers" },
    { url: "/docs/doc-add-columns", name: "Adding Columns" },
    { url: "/docs/doc-color", name: "Coloring" },
    { url: "/docs/doc-sort-filter", name: "Sort and Filter" },
    { url: "/docs/doc-alignment", name: "Alignment" },
    { url: "/docs/doc-enable-disable-col", name: "Enable and Disable Columns" },
    { url: "/docs/doc-computed-function", name: "Calculated Columns" },
    { url: "/docs/doc-title", name: "Table Title" },
    { url: "/docs/doc-column-title", name: "Column Title" },
    { url: "/docs/doc-limit-line-width", name: "Limit Column Width" },
    { url: "/docs/doc-border-design", name: "Border Design" },
    { url: "/docs/doc-emojis-special-chars", name: "Special Chars and emojis" },
    { url: "/docs/doc-render-console", name: "Render Console Output" },
    { url: "/docs/doc-typescript", name: "Typescript" },
    { url: "/docs/doc-cli-install-quick-start", name: "CLI Quick Start" }
  ];

  beforeEach(() => {
    // Intercept image requests to verify they succeed
    cy.intercept('GET', '/img/**/*').as('imageRequest');
  });

  pages.forEach(page => {
    it(`should load all images properly on ${page.name} page`, () => {
      // Visit the page
      cy.visit(`http://localhost:3000${page.url}`);

      // Wait for page to load
      cy.get('main').should('be.visible');

      // Get all images and verify each one
      cy.get('img').each(($img) => {
        // Create an alias for this specific image
        const imgId = `img-${Cypress._.random(0, 1e6)}`;
        cy.wrap($img).as(imgId);

        // Check visibility and dimensions
        cy.get(`@${imgId}`).should('be.visible');
        cy.get(`@${imgId}`).then(($img) => {
          expect($img[0].naturalWidth).to.be.greaterThan(0);
        });

        // Verify the image src exists
        cy.get(`@${imgId}`).should('have.attr', 'src')
          .and('not.be.empty');
      });

      // Wait for all image requests to complete
      cy.wait('@imageRequest').then((interception) => {
        expect([200, 304]).to.include(interception.response.statusCode);
      });

      // Additional check for broken images
      cy.get('img').each(($img) => {
        const imgId = `img-check-${Cypress._.random(0, 1e6)}`;
        cy.wrap($img).as(imgId);
        
        cy.get(`@${imgId}`).then(($img) => {
          expect($img[0].complete).to.be.true;
          expect($img[0].naturalHeight).to.be.greaterThan(0);
        });
      });
    });
  });

  it('should have proper alt text for all images', () => {
    pages.forEach(page => {
      cy.visit(`http://localhost:3000${page.url}`);
      cy.get('main').should('be.visible');
      
      // Check that all images have non-empty alt text
      cy.get('img').each(($img) => {
        const imgId = `img-alt-${Cypress._.random(0, 1e6)}`;
        cy.wrap($img).as(imgId);
        
        cy.get(`@${imgId}`).should('have.attr', 'alt')
          .and('not.be.empty');
      });
    });
  });

  it('should load images with correct dimensions', () => {
    pages.forEach(page => {
      cy.visit(`http://localhost:3000${page.url}`);
      cy.get('main').should('be.visible');
      
      // Verify images have reasonable dimensions
      cy.get('img').each(($img) => {
        const imgId = `img-dim-${Cypress._.random(0, 1e6)}`;
        cy.wrap($img).as(imgId);
        
        cy.get(`@${imgId}`).then(($img) => {
          const naturalWidth = $img[0].naturalWidth;
          const naturalHeight = $img[0].naturalHeight;
          
          // Images should have reasonable dimensions
          expect(naturalWidth).to.be.within(50, 2000);
          expect(naturalHeight).to.be.within(50, 2000);
          
          // Aspect ratio should be reasonable
          const aspectRatio = naturalWidth / naturalHeight;
          expect(aspectRatio).to.be.within(0.1, 10);
        });
      });
    });
  });
}); 