interface PageTest {
  url: string;
  title: string;
  headlines: string[];
  additionalChecks?: () => void;
}

describe("Testing Each Documentation Page", () => {
  const pages: PageTest[] = [
    {
      url: "/docs",
      title: "Install and Quick start",
      headlines: ["Installation", "Basic Example"]
    },
    {
      url: "/docs/doc-table-instance-creation",
      title: "Create Table Instance",
      headlines: ["Table instance creation", "Functions of table instance"]
    },
    {
      url: "/docs/doc-adding-rows",
      title: "Adding Rows",
      headlines: ["One row at a time", "Batch Row Adding", "Chained Row adding"]
    },
    {
      url: "/docs/doc-row-divider",
      title: "Row Dividers",
      headlines: ["Basic Row Divider", "Multiple Sections", "Using with Computed Values"]
    },
    {
      url: "/docs/doc-add-columns",
      title: "Adding Columns",
      headlines: [
        "Adding Columns One by One",
        "Adding Multiple Columns at Once",
        "Chained Column Adding",
        "Column Properties"
      ]
    },
    {
      url: "/docs/doc-color",
      title: "Coloring",
      headlines: ["Coloring", "Batch Row coloring", "Custom Color"]
    },
    {
      url: "/docs/doc-sort-filter",
      title: "Sort and Filter",
      headlines: ["Sort", "Filter"]
    },
    {
      url: "/docs/doc-alignment",
      title: "Alignment",
      headlines: ["You can put properties for alignment"]
    },
    {
      url: "/docs/doc-enable-disable-col",
      title: "Enable and Disable Columns",
      headlines: ["Enable", "Disable"]
    },
    {
      url: "/docs/doc-computed-function",
      title: "Calculated Columns",
      headlines: [
        "Sometimes you need a new column added automatically whose val is dependent on other fields in the same row"
      ]
    },
    {
      url: "/docs/doc-title",
      title: "Table Title",
      headlines: [
        "Currently all table Titles will be White Bold style and aligned center"
      ]
    },
    {
      url: "/docs/doc-column-title",
      title: "Column Title",
      headlines: [
        "You can choose to have your own Column Title instead of using the ugly name of the Column"
      ]
    },
    {
      url: "/docs/doc-limit-line-width",
      title: "Limit Column Width",
      headlines: ["maxLen", "minLen"]
    },
    {
      url: "/docs/doc-border-design",
      title: "Border Design",
      headlines: [
        "You can configure the border of the table by passing style in Table constructor"
      ]
    },
    {
      url: "/docs/doc-emojis-special-chars",
      title: "Special Chars and emojis",
      headlines: [
        "Special chars",
        "Newlines in cells",
        "Multiline Text Examples",
        "Simple multiline",
        "Product description with features",
        "Long text wrapping",
        "Technical specifications",
        "Product warning",
        "Display multi-line text in a structured way",
        "Show formatted content with line breaks",
        "Present hierarchical or grouped information",
        "Format long text content to fit within column width constraints"
      ],
      additionalChecks: () => {
        // Test code blocks
        cy.get('pre[class*="language-"]').should('have.length.at.least', 2);
      }
    },
    {
      url: "/docs/doc-render-console",
      title: "Render Console Output",
      headlines: [
        "Output can be generated as a string so that you can choose to use another shell to send the output to"
      ]
    },
    {
      url: "/docs/doc-typescript",
      title: "Typescript",
      headlines: ["You can easily import these in typescript"]
    },
    {
      url: "/docs/doc-cli-install-quick-start",
      title: "CLI Quick Start",
      headlines: ["Synopsis", "Installation", "Basic Example", "Detailed usage"]
    }
  ];

  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  pages.forEach((page: PageTest) => {
    it(`${page.title} page contains correct headlines`, () => {
      cy.visit(`http://localhost:3000${page.url}`);
      
      // Check each headline
      page.headlines.forEach((headline: string) => {
        cy.contains(headline);
      });

      // Run additional checks if they exist
      if (page.additionalChecks) {
        page.additionalChecks();
      }
    });
  });
}); 