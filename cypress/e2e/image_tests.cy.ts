interface Page {
  url: string;
  name: string;
}

interface Interception {
  response?: {
    statusCode: number;
  };
  request: {
    url: string;
  };
}

describe("Documentation Page Images", () => {
  const pages: Page[] = [
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
    { url: "/docs/doc-transform", name: "Transform Functions" },
    { url: "/docs/doc-cli-install-quick-start", name: "CLI Quick Start" },
    { url: "/docs/doc-cli-brew", name: "CLI Homebrew" }
  ];

  beforeEach(() => {
    // Increase the default timeout since we're dealing with image loading
    Cypress.config('defaultCommandTimeout', 10000);
    
    // Intercept image requests to verify they succeed
    cy.intercept('GET', '/img/**/*').as('imageRequest');
  });

  pages.forEach((page: Page) => {
    it(`should load all images properly on ${page.name} page`, () => {
      // Track image requests
      cy.intercept('GET', '/img/**/*', (req) => {
        req.continue();
      }).as('imageRequestCounter');

      // Visit the page and wait for it to load
      cy.visit(page.url, {
        timeout: 10000,
        retryOnStatusCodeFailure: true
      });

      // Wait for main content to be visible
      cy.get('main', { timeout: 10000 }).should('be.visible');

      // Keep assertions on a query so retries use the current DOM after hydration.
      cy.get('img', { timeout: 10000 }).should(($images) => {
        expect($images.length).to.be.greaterThan(0);
        $images.each((_, element) => {
          const img = element as HTMLImageElement;
          expect(img.getAttribute('src'), 'image source').to.be.a('string').and.not.be.empty;
          expect(img.complete, img.src).to.be.true;
          expect(img.naturalWidth, img.src).to.be.greaterThan(0);
          expect(img.naturalHeight, img.src).to.be.greaterThan(0);
        });
      });

      // Verify all image requests were successful
      cy.get('@imageRequestCounter.all').then((interceptions: unknown) => {
        const interceptArray = interceptions as Interception[];
        if (interceptArray.length > 0) {
          interceptArray.forEach((interception) => {
            if (interception.response) {
              expect([200, 304]).to.include(interception.response.statusCode);
            } else {
              // If there's no response, the image might be cached or loaded from a different source
              // We've already verified the image is loaded properly above
              cy.log(`No response for image request: ${interception.request.url}`);
            }
          });
        }
      });
    });
  });

  it('should have proper alt text for all images', () => {
    cy.visit("/docs", {
      timeout: 10000,
      retryOnStatusCodeFailure: true
    });

    cy.get('main', { timeout: 10000 }).should('be.visible');
    
    cy.get('.theme-doc-markdown img:visible').should(($images) => {
      $images.each((_, img) => {
        expect(img.getAttribute('alt'), 'image alt text').to.be.a('string').and.not.be.empty;
      });
    });
  });

  it('should load images with correct dimensions', () => {
    cy.visit("/docs", {
      timeout: 10000,
      retryOnStatusCodeFailure: true
    });

    cy.get('main', { timeout: 10000 }).should('be.visible');
    
    cy.get('.theme-doc-markdown img:visible').should(($images) => {
      $images.each((_, element) => {
        const img = element as HTMLImageElement;
        expect(img.complete, img.src).to.be.true;
        expect(img.naturalWidth, img.src).to.be.within(50, 2000);
        expect(img.naturalHeight, img.src).to.be.within(50, 2000);
        expect(img.naturalWidth / img.naturalHeight, img.src).to.be.within(0.1, 10);
      });
    });
  });
}); 
