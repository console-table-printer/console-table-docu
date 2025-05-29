describe("Testing Each Documentation Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Install and Quick start page contains correct headlines", () => {
    cy.visit("http://localhost:3000/docs");
    cy.contains("Installation");
    cy.contains("Basic Example");
  });

  it("Create Table Instance page contains correct headlines", () => {
    cy.visit("http://localhost:3000/docs/doc-table-instance-creation");
    cy.contains("Table instance creation");
    cy.contains("Functions of table instance");
  });

  it("Adding Rows page contains correct headlines", () => {
    cy.visit("http://localhost:3000/docs/doc-adding-rows");
    cy.contains("One row at a time");
    cy.contains("Batch Row Adding");
    cy.contains("Chained Row adding");
  });

  it("Row Dividers page contains correct headlines", () => {
    cy.visit("http://localhost:3000/docs/doc-row-divider");
    cy.contains("Basic Row Divider");
    cy.contains("Multiple Sections");
    cy.contains("Using with Computed Values");
  });

  it("Adding Columns page contains correct headlines", () => {
    cy.visit("http://localhost:3000/docs/doc-add-columns");
    cy.contains("Adding Columns One by One");
    cy.contains("Adding Multiple Columns at Once");
    cy.contains("Chained Column Adding");
    cy.contains("Column Properties");
  });

  it("Coloring page contains correct headlines", () => {
    cy.visit("http://localhost:3000/docs/doc-color");
    cy.contains("Coloring");
    cy.contains("Batch Row coloring");
    cy.contains("Custom Color");
  });

  it("Sort and Filter page contains correct headlines", () => {
    cy.visit("http://localhost:3000/docs/doc-sort-filter");
    cy.contains("Sort");
    cy.contains("Filter");
  });

  it("Alignment page contains correct headlines", () => {
    cy.visit("http://localhost:3000/docs/doc-alignment");
    cy.contains("You can put properties for alignment");
  });

  it("Enable and Disable Columns page contains correct headlines", () => {
    cy.visit("http://localhost:3000/docs/doc-enable-disable-col");
    cy.contains("Enable");
    cy.contains("Disable");
  });

  it("Calculated Columns page contains correct headlines", () => {
    cy.visit("http://localhost:3000/docs/doc-computed-function");
    cy.contains("Sometimes you need a new column added automatically whose val is dependent on other fields in the same row");
  });

  it("Table Title page contains correct headlines", () => {
    cy.visit("http://localhost:3000/docs/doc-title");
    cy.contains("Currently all table Titles will be White Bold style and aligned center");
  });

  it("Column Title page contains correct headlines", () => {
    cy.visit("http://localhost:3000/docs/doc-column-title");
    cy.contains("You can choose to have your own Column Title instead of using the ugly name of the Column");
  });

  it("Limit Column Width page contains correct headlines", () => {
    cy.visit("http://localhost:3000/docs/doc-limit-line-width");
    cy.contains("maxLen");
    cy.contains("minLen");
  });

  it("Border Design page contains correct headlines", () => {
    cy.visit("http://localhost:3000/docs/doc-border-design");
    cy.contains("You can configure the border of the table by passing style in Table constructor");
  });

  it("Special Chars and emojis page contains correct headlines and examples", () => {
    cy.visit("http://localhost:3000/docs/doc-emojis-special-chars");
    
    // Test main sections
    cy.contains("Special chars");
    cy.contains("Newlines in cells");
    
    // Test code blocks
    cy.get('pre[class*="language-"]').should('have.length.at.least', 2);
    
    // Test content structure
    cy.contains("Multiline Text Examples");
    
    // Test example categories
    cy.contains("Simple multiline");
    cy.contains("Product description with features");
    cy.contains("Long text wrapping");
    cy.contains("Technical specifications");
    cy.contains("Product warning");
    
    // Test feature list
    cy.contains("Display multi-line text in a structured way");
    cy.contains("Show formatted content with line breaks");
    cy.contains("Present hierarchical or grouped information");
    cy.contains("Format long text content to fit within column width constraints");
  });

  it("Render Console Output page contains correct headlines", () => {
    cy.visit("http://localhost:3000/docs/doc-render-console");
    cy.contains("Output can be generated as a string so that you can choose to use another shell to send the output to");
  });

  it("Typescript page contains correct headlines", () => {
    cy.visit("http://localhost:3000/docs/doc-typescript");
    cy.contains("You can easily import these in typescript");
  });

  it("CLI Quick Start page contains correct headlines", () => {
    cy.visit("http://localhost:3000/docs/doc-cli-install-quick-start");
    cy.contains("Synopsis");
    cy.contains("Installation");
    cy.contains("Basic Example");
    cy.contains("Detailed usage");
  });
});
