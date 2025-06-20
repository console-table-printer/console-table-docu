interface PageTestInterface {
  title: string;
  headlines: string[];
}

describe("Testing Each Documentation Page", () => {
  const pages: PageTestInterface[] = [
    {
      title: "Install and Quick start",
      headlines: ["Installation", "Basic Example"]
    },
    {
      title: "Create Table Instance",
      headlines: ["Table instance creation", "Functions of table instance"]
    },
    {
      title: "Adding Rows",
      headlines: ["One row at a time", "Batch Row Adding", "Chained Row adding"]
    },
    {
      title: "Row Dividers",
      headlines: ["Basic Row Divider", "Multiple Sections", "Using with Computed Values"]
    },
    {
      title: "Adding Columns",
      headlines: [
        "Adding Columns One by One",
        "Adding Multiple Columns at Once",
        "Chained Column Adding",
        "Column Properties"
      ]
    },
    {
      title: "Coloring",
      headlines: ["Coloring", "Batch Row coloring", "Custom Color", "Advanced Color Mapping", "Semantic Colors", "Conditional Coloring"]
    },
    {
      title: "Sort and Filter",
      headlines: ["Sort", "Filter", "Advanced Sorting and Filtering", "Multi-Level Sorting", "Complex Filtering"]
    },
    {
      title: "Alignment",
      headlines: []
    },
    {
      title: "Enable and Disable Columns",
      headlines: ["Enable", "Disable"]
    },
    {
      title: "Calculated Columns",
      headlines: [
        "Sometimes you need a new column added automatically whose val is dependent on other fields in the same row",
        "Using All Parameters",
        "Advanced Examples",
        "Using Row Index for Ranking",
        "Complex Computations with Multiple Subjects",
        "Memory-Efficient Computed Columns"
      ]
    },
    {
      title: "Table Title",
      headlines: [
        "Currently all table Titles will be White Bold style and aligned center"
      ]
    },
    {
      title: "Column Title",
      headlines: [
        "You can choose to have your own Column Title instead of using the ugly name of the Column"
      ]
    },
    {
      title: "Limit Column Width",
      headlines: ["maxLen", "minLen"]
    },
    {
      title: "Border Design",
      headlines: [
        "You can configure the border of the table by passing style in Table constructor",
        "Advanced Border Styles",
        "Custom Border Styles",
        "Colored Borders with Chalk"
      ]
    },
    {
      title: "Special Chars and emojis",
      headlines: [
        "Special chars",
        "Newlines in cells",
        "Multiline Text Examples",
        "Product description with features",
        "Technical specifications",
        "Product warning",
        "Laptop",
        "Smartphone",
        "Headphones",
        "Camera",
        "Battery Pack"
      ]
    },
    {
      title: "Render Console Output",
      headlines: [
        "Output can be generated as a string so that you can choose to use another shell to send the output to"
      ]
    },
    {
      title: "Typescript",
      headlines: ["You can easily import these in typescript"]
    },
    {
      title: "Quick Start",
      headlines: ["Synopsis", "Installation", "Basic Example", "Detailed usage"]
    },
    {
      title: "CLI Quick Start",
      headlines: ["Installation", "Basic Example"]
    },
    {
      title: "Homebrew",
      headlines: [
        "Quick Install",
        "Usage",
        "Show help",
        "Simple Table",
        "Use custom column styles",
        "Change table title",
        "Uninstallation"
      ]
    }
  ];

  beforeEach(() => {
    // Go to docs page before each test
    cy.visit("http://localhost:3000");
    cy.contains("GET STARTED").click();
  });

  pages.forEach((page: PageTestInterface) => {
    it(`${page.title} page contains correct headlines`, () => {
      cy.contains(page.title).click();
      
      // Check each headline
      page.headlines.forEach((headline: string) => {
        cy.contains(headline);
      });

      // Special check for Special Chars and emojis page
      if (page.title === "Special Chars and emojis") {
        // Verify screenshot presence
        cy.get('img[alt="Screenshot"]').should('have.length.at.least', 2);
      }
    });
  });
}); 