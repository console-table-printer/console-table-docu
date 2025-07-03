/**
 * Unit tests for all console-table-printer documentation samples
 * These tests verify that ALL examples in the documentation work correctly
 * If any test fails, it indicates the documentation needs to be updated
 */

const { printTable, Table } = require("console-table-printer");

// Mock console.log to capture output
const originalConsoleLog = console.log;
let consoleOutput = [];

beforeEach(() => {
  consoleOutput = [];
  console.log = (...args) => {
    consoleOutput.push(args.join(' '));
  };
});

afterEach(() => {
  console.log = originalConsoleLog;
});

describe('Console Table Printer Documentation Examples', () => {
  
  describe('Basic Usage and Installation (doc-install-quick-start.md)', () => {
    test('should handle basic printTable usage from install docs', () => {
      const testCases = [
        { Type: "Wish", text: "I would like some gelb bananen bitte", value: 100 },
        { Type: "Hope", text: "I hope batch update is working", value: 300 },
      ];

      printTable(testCases);
      
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('Wish');
      expect(consoleOutput.join('\n')).toContain('Hope');
    });
  });

  describe('Table Instance Creation (doc-table-instance-creation.md)', () => {
    test('should handle basic Table instance usage', () => {
      const p = new Table();

      p.addRow({ "LineNr.": 1, text: "red wine please", value: 10.212 }, { color: "red" });
      p.addRow({ "LineNr.": 2, text: "green gemuse please", value: 20.0 }, { color: "green" });
      p.addRows([
        { "LineNr.": 3, text: "gelb bananen bitte", value: 100 },
        { "LineNr.": 4, text: "update is working", value: 300 },
      ]);

      p.printTable();
      
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('red wine please');
      expect(consoleOutput.join('\n')).toContain('green gemuse please');
    });

    test('should handle simplest table constructor', () => {
      const table = new Table();
      expect(table).toBeInstanceOf(Table);
    });

    test('should handle column names array constructor', () => {
      const table = new Table(["column1", "column2", "column3"]);
      expect(table).toBeInstanceOf(Table);
    });

    test('should handle complex table constructor with fatBorder style', () => {
      const table = new Table({
        style: "fatBorder", //style of border of the table, (optional)
        columns: [
          { name: "column1", alignment: "left", color: "red" }, //with alignment and color
          { name: "column2", alignment: "right" },
          { name: "column3" },
        ],
        sort: (row1, row2) => row2.column1 - row1.column1, // sorting order of rows (optional)
        filter: (row) => row.column1 < 3, // filtering rows (optional)
      });
      
      expect(table).toBeInstanceOf(Table);
    });

    test('should handle bonus example with defaultColumnOptions', () => {
      const table = new Table({
        columns: [
          { name: "product" },     // Will inherit all defaultColumnOptions
          { name: "quantity" },    // Will inherit all defaultColumnOptions
          { name: "price", alignment: "right" }  // Will override the default alignment
        ],
        defaultColumnOptions: {
          alignment: "center",     // Default center alignment for all columns
          color: "green",         // Default green color for all columns
          maxLen: 20,            // Default maximum length for all columns
          minLen: 10            // Default minimum length for all columns
        },
        rows: [
          { product: "Laptop", quantity: 5, price: 999.99 },
          { product: "Mouse", quantity: 10, price: 24.99 },
          { product: "Keyboard", quantity: 7, price: 59.99 }
        ]
      });
      
      table.printTable();
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('Laptop');
      expect(consoleOutput.join('\n')).toContain('Mouse');
      expect(consoleOutput.join('\n')).toContain('Keyboard');
    });
  });

  describe('Adding Rows (doc-adding-rows.md)', () => {
    test('should handle one row at a time', () => {
      const p = new Table();

      p.addRow({ Serial: 1, text: "red wine", value: 10.212 }); // Single row at a time
      p.addRow({ Serial: 2, text: "green gemuse", value: 20.0 });
      p.addRow({
        Serial: 3,
        text: "gelb bananen",
        value: 100,
        is_priority_today: "Y",
      });
      p.addRow({ Serial: 3, text: "rosa hemd wie immer", value: 100 });
      p.printTable();
      
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('red wine');
      expect(consoleOutput.join('\n')).toContain('green gemuse');
      expect(consoleOutput.join('\n')).toContain('gelb bananen');
      expect(consoleOutput.join('\n')).toContain('rosa hemd wie immer');
    });

    test('should handle batch row adding', () => {
      const p = new Table();

      p.addRows([
        // adding multiple rows are possible
        { Item: 3, text: "green color text1", value: 100 },
        { Item: 4, text: "green color text2", value: 300 },
      ]);
      p.printTable();
      
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('green color text1');
      expect(consoleOutput.join('\n')).toContain('green color text2');
    });

    test('should handle chained row adding', () => {
      const p = new Table();

      p.addRow({ Weight: "1kg", text: "red wine", value: 10.212 })
        .addRow({ Weight: "1kg", text: "green gemuse", value: 20.0 })
        .addRow({
          Weight: "2kg",
          text: "gelb bananen",
          value: 100,
          is_priority_today: "Y",
        })
        .addRow({ Weight: 3, text: "rosa hemd wie immer", value: 100 });
      p.printTable();
      
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('red wine');
      expect(consoleOutput.join('\n')).toContain('rosa hemd wie immer');
    });
  });

  describe('Adding Columns (doc-add-columns.md)', () => {
    test('should handle adding columns one by one', () => {
      // Initialize table with one column
      const p = new Table({
        columns: [{ name: "Serial", alignment: "left" }],
      });

      // Add more columns one by one
      p.addColumn({ name: "Name", alignment: "center" }); // Adding a single column
      p.addColumn({ name: "Price", alignment: "right", color: "green" });

      // Add some data
      p.addRow({ Serial: "A001", Name: "Laptop", Price: 999.99 });
      p.addRow({ Serial: "A002", Name: "Mouse", Price: 29.99 });
      p.printTable();
      
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('Serial');
      expect(consoleOutput.join('\n')).toContain('Name');
      expect(consoleOutput.join('\n')).toContain('Price');
      expect(consoleOutput.join('\n')).toContain('Laptop');
      expect(consoleOutput.join('\n')).toContain('Mouse');
    });

    test('should handle adding multiple columns at once', () => {
      const p = new Table();

      p.addColumns([
        // adding multiple columns
        { name: "Item", alignment: "left" },
        { name: "Description", alignment: "center" },
        { name: "Stock", alignment: "right", color: "yellow" }
      ]);

      // Add some data
      p.addRows([
        { Item: "Phone", Description: "Latest model", Stock: 50 },
        { Item: "Tablet", Description: "10-inch display", Stock: 30 }
      ]);
      p.printTable();
      
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('Item');
      expect(consoleOutput.join('\n')).toContain('Description');
      expect(consoleOutput.join('\n')).toContain('Stock');
      expect(consoleOutput.join('\n')).toContain('Phone');
      expect(consoleOutput.join('\n')).toContain('Tablet');
    });

    test('should handle chained column adding', () => {
      const p = new Table();

      p.addColumn({ name: "Weight", alignment: "left" })
        .addColumn({ name: "Color", alignment: "center" })
        .addColumn({ name: "Price", alignment: "right", color: "blue" });

      // Add some data
      p.addRow({ Weight: "2.5kg", Color: "Black", Price: 199.99 });
      p.addRow({ Weight: "1.8kg", Color: "Silver", Price: 149.99 });
      p.printTable();
      
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('Weight');
      expect(consoleOutput.join('\n')).toContain('Color');
      expect(consoleOutput.join('\n')).toContain('Price');
      expect(consoleOutput.join('\n')).toContain('Black');
      expect(consoleOutput.join('\n')).toContain('Silver');
    });

    test('should handle mixing different column addition methods', () => {
      const p = new Table();

      // Add first column individually
      p.addColumn({ 
        name: "ProductId", 
        alignment: "left",
        color: "cyan"
      });

      // Add multiple columns at once
      p.addColumns([
        { name: "Category", alignment: "center" },
        { name: "Quantity", alignment: "right" }
      ]);

      // Add one more column
      p.addColumn({ 
        name: "Total", 
        alignment: "right",
        color: "green"
      });

      // Add some data
      p.addRows([
        { ProductId: "P100", Category: "Electronics", Quantity: 5, Total: 2499.95 },
        { ProductId: "P101", Category: "Accessories", Quantity: 10, Total: 299.90 }
      ]);
      p.printTable();
      
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('ProductId');
      expect(consoleOutput.join('\n')).toContain('Category');
      expect(consoleOutput.join('\n')).toContain('Quantity');
      expect(consoleOutput.join('\n')).toContain('Total');
      expect(consoleOutput.join('\n')).toContain('P100');
      expect(consoleOutput.join('\n')).toContain('Electronics');
    });
  });

  describe('Alignment (doc-alignment.md)', () => {
    test('should handle different column alignments', () => {
      const p = new Table({
        columns: [
          { name: "index", alignment: "left" },
          { name: "text", alignment: "right" },
          { name: "is_priority_today", alignment: "center" },
        ],
      });

      p.addRow({ index: 1, text: "red wine", value: 10.212 }, { color: "green" });
      p.addRow({ index: 2, text: "green gemuse", value: 20.0 });
      p.addRow({ index: 3, text: "gelb bananen", value: 100, is_priority_today: "Y" }, { color: "yellow" });
      p.printTable();
      
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('red wine');
      expect(consoleOutput.join('\n')).toContain('green gemuse');
      expect(consoleOutput.join('\n')).toContain('gelb bananen');
    });
  });

  describe('Border Design (doc-border-design.md)', () => {
    test('should handle custom border style', () => {
      const p = new Table({
        style: {
          headerTop: {
            left: "╔",
            mid: "╦",
            right: "╗",
            other: "═",
          },
          headerBottom: {
            left: "╟",
            mid: "╬",
            right: "╢",
            other: "═",
          },
          tableBottom: {
            left: "╚",
            mid: "╩",
            right: "╝",
            other: "═",
          },
          vertical: "║",
        },
        columns: [
          { name: "index", alignment: "left" },
          { name: "text", alignment: "right" },
          { name: "value" },
        ],
      });

      // add rows with color
      p.addRow(
        { index: 1, text: "I would like some red wine please", value: 10.212 },
        { color: "red" }
      );
      p.addRow(
        { index: 2, text: "I would like some green gemuse please", value: 20.0 },
        { color: "green" }
      );
      p.addRow(
        { index: 3, text: "I would like some gelb bananen bitte", value: 100 },
        { color: "yellow" }
      );

      // print
      p.printTable();
      
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('red wine');
      expect(consoleOutput.join('\n')).toContain('green gemuse');
      expect(consoleOutput.join('\n')).toContain('gelb bananen');
    });

    test('should handle colored borders with chalk - DOCUMENTATION ISSUE: chalk not installed', () => {
      // This test demonstrates that the documentation shows chalk usage
      // but chalk is not included as a dependency in the project
      // This is a documentation problem that should be fixed
      
      // Mock chalk since it's not available but documented
      const mockChalk = {
        blue: (str) => `\x1b[34m${str}\x1b[0m`
      };
      
      const p = new Table({
        style: {
          headerTop: {
            left: mockChalk.blue('╔'),
            mid: mockChalk.blue('╦'),
            right: mockChalk.blue('╗'),
            other: mockChalk.blue('═'),
          },
          headerBottom: {
            left: mockChalk.blue('╟'),
            mid: mockChalk.blue('╬'),
            right: mockChalk.blue('╢'),
            other: mockChalk.blue('═'),
          },
          tableBottom: {
            left: mockChalk.blue('╚'),
            mid: mockChalk.blue('╩'),
            right: mockChalk.blue('╝'),
            other: mockChalk.blue('═'),
          },
          vertical: mockChalk.blue('║'),
        },
        columns: [
          { name: "index", alignment: "left" },
          { name: "text", alignment: "right" },
          { name: "value" },
        ],
      });

      p.addRow({ index: 1, text: "test", value: 10 });
      p.printTable();
      
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('test');
      
      // Note: This test passes but highlights a documentation issue
      // The docs show chalk usage without listing it as a dependency
    });
  });

  describe('Color Configuration (doc-color.md)', () => {
    test('should handle column and row coloring', () => {
      const p = new Table({
        columns: [
          { name: "index", alignment: "left", color: "yellow" }, // column coloring
          { name: "text", alignment: "right" },
        ],
      });

      p.addRow({ index: 1, text: "red wine", value: 10.212 }, { color: "green" }); // row coloring
      p.printTable();
      
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('red wine');
    });

    test('should handle batch row coloring', () => {
      const p = new Table();
      p.addRows([
        { index: 3, text: "green color text1", value: 100 },
        { index: 4, text: "green color text2", value: 300 },
      ], { color: "green" });
      
      p.printTable();
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('green color text1');
      expect(consoleOutput.join('\n')).toContain('green color text2');
    });

    test('should handle custom colors', () => {
      const p = new Table({
        columns: [
          { name: 'index', alignment: 'left', color: 'blue' },
          { name: 'text', alignment: 'right' },
        ],
        colorMap: {
          custom_green_underscore: '\x1b[4m\x1b[32m',
        },
      });

      p.addRow({ index: 2, text: 'green gemuse'}, { color: 'custom_green_underscore' });
      p.printTable();
      
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('green gemuse');
    });
  });

  describe('Column Titles (doc-column-title.md)', () => {
    test('should handle custom column titles - DOCUMENTATION ISSUE: chalk not installed', () => {
      // This test demonstrates that the documentation shows chalk usage
      // but chalk is not included as a dependency in the project
      
      // Mock chalk since it's not available but documented
      const mockChalk = {
        red: (str) => `\x1b[31m${str}\x1b[0m`,
        yellowBright: (str) => `\x1b[93m${str}\x1b[0m`
      };
      
      const p = new Table({
        columns: [
          {
            name: "red_left_align_index",
            alignment: "left",
            title: mockChalk.red("Red Left Align Index"),
          },
          {
            name: "right_align_text",
            alignment: "right",
            title: "Right Align Text",
          },
          {
            name: "green_value_center",
            alignment: "center",
            title: mockChalk.yellowBright("Big Green Value Center"),
          },
        ],
      });

      p.addRow({ red_left_align_index: 1, right_align_text: "text", green_value_center: 100 });
      p.printTable();
      
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('text');
      
      // Note: This test passes but highlights a documentation issue
      // The docs show chalk usage without listing it as a dependency
    });
  });

  describe('Computed Functions (doc-computed-function.md)', () => {
    test('should handle basic computed columns', () => {
      const p = new Table({
        columns: [
          { name: "red_amount", color: "red" },
          { name: "blue_amount", color: "blue" },
        ],
        computedColumns: [
          {
            name: "sum",
            function: (row) => row.red_amount + row.blue_amount,
          },
          {
            name: "red_percent",
            function: (row) => {
              const val = ((row.red_amount / (row.red_amount + row.blue_amount)) * 100).toFixed(2);
              return val + "%";
            },
          },
        ],
      });

      p.addRow({ red_amount: 10, blue_amount: 20 });
      p.addRow({ red_amount: 15, blue_amount: 25 });
      p.printTable();
      
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('sum');
      expect(consoleOutput.join('\n')).toContain('red_percent');
    });

    test('should handle computed columns with all parameters', () => {
      const p = new Table({
        columns: [
          { name: "name" },
          { name: "score" }
        ],
        computedColumns: [
          {
            name: "status",
            function: (row) => row.score >= 60 ? "PASS" : "FAIL"
          },
          {
            name: "student_no",
            function: (row, index) => `Student #${index + 1}`
          },
          {
            name: "vs_average",
            function: (row, index, array) => {
              const avg = array.reduce((sum, r) => sum + r.score, 0) / array.length;
              return row.score > avg ? "Above Average" : "Below Average";
            }
          }
        ]
      });

      p.addRow({ name: "John", score: 85 });
      p.addRow({ name: "Jane", score: 45 });
      p.addRow({ name: "Bob", score: 75 });
      p.printTable();
      
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('PASS');
      expect(consoleOutput.join('\n')).toContain('FAIL');
      expect(consoleOutput.join('\n')).toContain('Student #1');
      expect(consoleOutput.join('\n')).toContain('Above Average');
    });
  });

  describe('Emojis and Special Characters (doc-emojis-special-chars.md)', () => {
    test('should handle special character length', () => {
      const { Table } = require("console-table-printer");
      const bundle = new Table({
        title: "My Table",
        charLength: { "👍": 2, "✅": 2 },
      });

      bundle.addRows([
        {
          Col1: "👍",
          Column2: "✅",
          SomeOtherCol: "Some Random string",
          SomeOtherCol2: "123_sdas",
        },
      ]);
      bundle.printTable();
      
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('My Table');
      expect(consoleOutput.join('\n')).toContain('Some Random string');
    });

    test('should handle multiline text', () => {
      const p = new Table({
        title: 'Multiline Text Examples',
        columns: [
          { name: 'col1', title: 'Product', alignment: 'left' },
          { name: 'col2', title: 'Description', alignment: 'left', minLen: 30 },
          { name: 'col3', title: 'Price', alignment: 'right' }
        ]
      });

      p.addRow({ 
        col1: 'Smartphone',
        col2: '- 6.7" Display\n- 256GB Storage\n- 5G Ready',
        col3: '$799.99'
      });
      p.printTable();
      
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('Smartphone');
      expect(consoleOutput.join('\n')).toContain('$799.99');
    });
  });

  describe('Enable/Disable Columns (doc-enable-disable-col.md)', () => {
    test('should handle enabled columns', () => {
      const p = new Table({
        enabledColumns: ["id", "text"],
      });

      p.addRow({ id: 1, text: "visible", hidden: "not visible" });
      p.printTable();
      
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('id');
      expect(consoleOutput.join('\n')).toContain('text');
      expect(consoleOutput.join('\n')).not.toContain('hidden');
    });

    test('should handle disabled columns', () => {
      const p = new Table({
        disabledColumns: ["garbages"],
      });

      p.addRow({ id: 1, text: "visible", garbages: "not visible" });
      p.printTable();
      
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('id');
      expect(consoleOutput.join('\n')).toContain('text');
      expect(consoleOutput.join('\n')).not.toContain('garbages');
    });
  });

  describe('Limit Line Width (doc-limit-line-width.md)', () => {
    test('should handle max length constraint', () => {
      const p = new Table({
        columns: [
          { name: "Index", alignment: "left", color: "red" },
          { name: "right_align_text", alignment: "right", maxLen: 10, title: "maxLen10" },
          { name: "green", alignment: "center", color: "green" },
        ],
      });

      p.addRow({ Index: 1, right_align_text: "This is a very long text that should be truncated", green: "short" });
      p.printTable();
      
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('maxLen10');
    });

    test('should handle min length constraint', () => {
      const p = new Table({
        columns: [
          { name: "Index", alignment: "left", color: "red", minLen: 15, title: "minLen15" },
          { name: "right_align_text", alignment: "right", maxLen: 15, title: "maxLen15" },
          { name: "green", alignment: "center", color: "green", minLen: 20, title: "minLen20" },
        ],
      });

      p.addRow({ Index: 1, right_align_text: "text", green: "short" });
      p.printTable();
      
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('minLen15');
      expect(consoleOutput.join('\n')).toContain('maxLen15');
      expect(consoleOutput.join('\n')).toContain('minLen20');
    });
  });

  describe('No ASCII (doc-no-ascii.md)', () => {
    test('should handle disable colors and special characters', () => {
      const p = new Table({
        columns: [
          { name: "Serial", alignment: "left", color: "yellow" },
          { name: "text", alignment: "right" },
        ],
        shouldDisableColors: true,
      });

      p.addRow({ Serial: 1, text: "test" });
      p.printTable();
      
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('Serial');
      expect(consoleOutput.join('\n')).toContain('text');
    });
  });

  describe('Render Console (doc-render-console.md)', () => {
    test('should handle render to string', () => {
      const p = new Table();
      p.addRow({ index: 1, text: "red wine", value: 10.212 }, { color: "green" });
      p.addRow({ index: 2, text: "green gemuse", value: 20.0 });

      const tableStr = p.render();
      expect(typeof tableStr).toBe('string');
      expect(tableStr).toContain('red wine');
      expect(tableStr).toContain('green gemuse');
    });
  });

  describe('Row Dividers (doc-row-divider.md)', () => {
    test('should handle basic row separator', () => {
      const table = new Table();
      table.addRow({ amount: 1, name: "Apple" });
      table.addRow({ amount: 2, name: "Pear" });
      table.addRow({ amount: 3, name: "Banana" }, { separator: true });
      table.addRow({ amount: 6, name: "Total" });
      
      table.printTable();
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('Apple');
      expect(consoleOutput.join('\n')).toContain('Pear');
      expect(consoleOutput.join('\n')).toContain('Banana');
      expect(consoleOutput.join('\n')).toContain('Total');
    });

    test('should handle multiple sections', () => {
      const table = new Table();

      table.addRow({ category: "Fruits", item: "Apple", price: 1.0 });
      table.addRow({ category: "Fruits", item: "Banana", price: 0.5 });
      table.addRow({ category: "Fruits", item: "Orange", price: 0.75 }, { separator: true });

      table.addRow({ category: "Vegetables", item: "Carrot", price: 0.3 });
      table.addRow({ category: "Vegetables", item: "Potato", price: 0.4 });
      table.addRow({ category: "Vegetables", item: "Tomato", price: 0.6 }, { separator: true });

      table.addRow({ category: "Total Items", item: "6", price: 3.55 });
      
      table.printTable();
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('Fruits');
      expect(consoleOutput.join('\n')).toContain('Vegetables');
      expect(consoleOutput.join('\n')).toContain('Total Items');
    });
  });

  describe('Sort and Filter (doc-sort-filter.md)', () => {
    test('should handle simple sorting', () => {
      const p = new Table({
        columns: [{ name: "index" }, { name: "text" }, { name: "value" }],
        sort: (row1, row2) => +row2.value - +row1.value, // desc sorting
      });

      p.addRow({ index: 1, text: "item1", value: 10 });
      p.addRow({ index: 2, text: "item2", value: 30 });
      p.addRow({ index: 3, text: "item3", value: 20 });
      p.printTable();
      
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('item1');
      expect(consoleOutput.join('\n')).toContain('item2');
      expect(consoleOutput.join('\n')).toContain('item3');
    });

    test('should handle multi-level sorting', () => {
      const table = new Table({
        columns: [
          { name: "department", alignment: "left" },
          { name: "name", alignment: "left" },
          { name: "salary", alignment: "right" }
        ],
        sort: (row1, row2) => {
          const deptCompare = row1.department.localeCompare(row2.department);
          if (deptCompare !== 0) return deptCompare;
          return row2.salary - row1.salary;
        }
      });

      table.addRow({ department: "Engineering", name: "John", salary: 75000 });
      table.addRow({ department: "Engineering", name: "Jane", salary: 80000 });
      table.addRow({ department: "Sales", name: "Bob", salary: 60000 });
      table.printTable();
      
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('Engineering');
      expect(consoleOutput.join('\n')).toContain('Sales');
    });

    test('should handle simple filtering', () => {
      const p = new Table({
        columns: [{ name: "index" }, { name: "text" }, { name: "value" }],
        filter: (row) => +row.value < 20,
      });

      p.addRow({ index: 1, text: "item1", value: 10 });
      p.addRow({ index: 2, text: "item2", value: 30 });
      p.addRow({ index: 3, text: "item3", value: 15 });
      p.printTable();
      
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('item1');
      expect(consoleOutput.join('\n')).not.toContain('item2');
      expect(consoleOutput.join('\n')).toContain('item3');
    });

    test('should handle complex filtering', () => {
      const table = new Table({
        columns: [
          { name: "id", alignment: "left" },
          { name: "name", alignment: "left" },
          { name: "age", alignment: "right" },
          { name: "department", alignment: "left" },
          { name: "salary", alignment: "right" }
        ],
        filter: (row) => {
          const isAdult = row.age >= 18;
          const isHighSalary = row.salary >= 50000;
          const isEngineering = row.department === "Engineering";
          return isAdult && (isHighSalary || isEngineering);
        }
      });

      table.addRow({ id: 1, name: "John", age: 25, department: "Engineering", salary: 40000 });
      table.addRow({ id: 2, name: "Jane", age: 30, department: "Sales", salary: 60000 });
      table.addRow({ id: 3, name: "Bob", age: 16, department: "Engineering", salary: 30000 });
      table.printTable();
      
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('John');
      expect(consoleOutput.join('\n')).toContain('Jane');
      expect(consoleOutput.join('\n')).not.toContain('Bob');
    });
  });

  describe('Table Titles (doc-title.md)', () => {
    test('should handle table title', () => {
      const p = new Table({
        title: "Analysis Results",
        columns: [{ name: "red_amount" }, { name: "blue_amount" }],
      });

      p.addRow({ red_amount: 10, blue_amount: 20 });
      p.printTable();
      
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('Analysis Results');
    });
  });

  describe('TypeScript Support (doc-typescript.md)', () => {
    test('should handle TypeScript usage', () => {
      // Note: In a real TypeScript environment, this would use imports
      // For this test, we'll simulate the TypeScript usage pattern
      const red_color = "red";
      const green_color = "green";
      const left_alignment = "left";
      const center_alignment = "center";

      const p = new Table({
        columns: [
          {
            name: "red_left_align_index",
            alignment: left_alignment,
            color: red_color,
          },
          { name: "right_align_text", alignment: left_alignment },
          {
            name: "green_value_center",
            alignment: center_alignment,
            color: green_color,
          },
        ],
      });

      p.addRow({ red_left_align_index: 1, right_align_text: "text", green_value_center: "value" });
      p.printTable();
      
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(consoleOutput.join('\n')).toContain('text');
      expect(consoleOutput.join('\n')).toContain('value');
    });
  });
});