describe("Testing Each Documentation Page", () => {
  beforeEach(() => {
    // Go to docs page before each test
    cy.visit("http://localhost:3000");
    cy.contains("GET STARTED").click();
  });

  it("Install and Quick start page contains correct headlines", () => {
    cy.contains("Install and Quick start").click();
    cy.contains("Installation");
    cy.contains("Basic Example");
  });

  it("Create Table Instance page contains correct headlines", () => {
    cy.contains("Create Table Instance").click();
    cy.contains("Table instance creation");
    cy.contains("Functions of table instance");
  });

  it("Adding Rows page contains correct headlines", () => {
    cy.contains("Adding Rows").click();
    cy.contains("One row at a time");
    cy.contains("Batch Row Adding");
    cy.contains("Chained Row adding");
  });

  it("Row Dividers page contains correct headlines", () => {
    cy.contains("Row Dividers").click();
    cy.contains("Basic Row Divider");
    cy.contains("Multiple Sections");
    cy.contains("Using with Computed Values");
  });

  it("Adding Columns page contains correct headlines", () => {
    cy.contains("Adding Columns").click();
    cy.contains("Adding Columns One by One");
    cy.contains("Adding Multiple Columns at Once");
    cy.contains("Chained Column Adding");
    cy.contains("Column Properties");
  });

  it("Coloring page contains correct headlines", () => {
    cy.contains("Coloring").click();
    cy.contains("Coloring");
    cy.contains("Batch Row coloring");
    //cy.contains("possible `color` values for rows/columns");
    cy.contains("Custom Color");
  });

  it("Sort and Filter page contains correct headlines", () => {
    cy.contains("Sort and Filter").click();
    cy.contains("Sort");
    cy.contains("Filter");
  });

  it("Alignment page contains correct headlines", () => {
    cy.contains("Alignment").click();
    //cy.contains("possible `alignment` values for columns");
  });

  it("Enable and Disable Columns page contains correct headlines", () => {
    cy.contains("Enable and Disable Columns").click();
    cy.contains("Enable");
    cy.contains("Disable");
  });

  it("Calculated Columns page contains correct headlines", () => {
    cy.contains("Calculated Columns").click();
    cy.contains("Sometimes you need a new column added automatically whose val is dependent on other fields in the same row");
  });

  it("Table Title page contains correct headlines", () => {
    cy.contains("Table Title").click();
    cy.contains("Currently all table Titles will be White Bold style and aligned center");
  });

  it("Column Title page contains correct headlines", () => {
    cy.contains("Column Title").click();
    cy.contains("You can choose to have your own Column Title instead of using the ugly name of the Column");
  });

  it("Limit Column Width page contains correct headlines", () => {
    cy.contains("Limit Column Width").click();
    cy.contains("maxLen");
    cy.contains("minLen");
  });

  it("Border Design page contains correct headlines", () => {
    cy.contains("Border Design").click();
    cy.contains("You can configure the border of the table by passing style in Table constructor");
  });

  it("Special Chars and emojis page contains correct headlines", () => {
    cy.contains("Special Chars and emojis").click();
    cy.contains("Special chars");
    
    // Test newlines section
    cy.contains("Newlines in cells");
    
    // Test code examples
    cy.contains("Multiline Text Examples");
    cy.contains("Product description with features");
    cy.contains("Technical specifications");
    cy.contains("Product warning");
    
    // Test example content
    cy.contains("Laptop");
    cy.contains("Smartphone");
    cy.contains("Headphones");
    cy.contains("Camera");
    cy.contains("Battery Pack");
    
    // Verify screenshot presence
    cy.get('img[alt="Screenshot"]').should('have.length.at.least', 2);
  });

  it("Render Console Output page contains correct headlines", () => {
    cy.contains("Render Console Output").click();
    cy.contains("Output can be generated as a string so that you can choose to use another shell to send the output to");
  });

  it("Typescript page contains correct headlines", () => {
    cy.contains("Typescript").click();
    cy.contains("You can easily import these in typescript");
  });

  it("CLI Quick Start page contains correct headlines", () => {
    cy.contains("Quick Start").click();
    cy.contains("Synopsis");
    cy.contains("Installation");
    cy.contains("Basic Example");
    cy.contains("Detailed usage");
  });
});
