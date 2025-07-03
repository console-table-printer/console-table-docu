---
id: core-functions
title: Core Functions
sidebar_label: Core Functions
---

# Core Functions

This section covers the main functions for creating and printing tables.

## printTable

### `printTable(data: RowData[], options?: PrintTableOptions): void`

Prints a table directly from an array of data objects without creating a Table instance.

**Parameters:**
- `data: RowData[]` - Array of objects representing table rows
- `options?: PrintTableOptions` - Optional configuration for the table

**Returns:** `void`

**Example:**
```javascript
const { printTable } = require("console-table-printer");

const data = [
  { id: 1, name: "John", age: 25 },
  { id: 2, name: "Jane", age: 30 }
];

printTable(data);
```

**With Options:**
```javascript
const { printTable } = require("console-table-printer");

const data = [
  { id: 1, name: "John", age: 25, status: "active" },
  { id: 2, name: "Jane", age: 30, status: "inactive" }
];

printTable(data, {
  columns: [
    { name: "id", alignment: "left" },
    { name: "name", alignment: "center" },
    { name: "age", alignment: "right" }
  ],
  enabledColumns: ["id", "name", "age"], // Hide status column
  title: "User List"
});
```

## Table Constructor

### `new Table(options?: TableOptions)`

Creates a new Table instance with optional configuration.

**Parameters:**
- `options?: TableOptions` - Optional configuration object

**Returns:** `Table` instance

### Constructor Overloads

#### 1. Empty Constructor
```javascript
const table = new Table();
```

Creates a table with default settings. Columns will be automatically detected from the first row added.

#### 2. Column Names Array
```javascript
const table = new Table(["id", "name", "age"]);
```

Creates a table with predefined column names. All columns will use default settings.

#### 3. Configuration Object
```javascript
const table = new Table({
  columns: [
    { name: "id", alignment: "left", color: "red" },
    { name: "name", alignment: "center" },
    { name: "age", alignment: "right", color: "green" }
  ],
  // Default style will be used (omit style property for default borders)
  title: "User Data",
  sort: (row1, row2) => row1.id - row2.id,
  filter: (row) => row.age >= 18
});
```

### TableOptions Interface

```typescript
interface TableOptions {
  // Column definitions
  columns?: ColumnConfig[];
  
  // Default options for all columns
  defaultColumnOptions?: ColumnConfig;
  
  // Pre-defined rows
  rows?: RowData[];
  
  // Table styling
  style?: TableStyle | CustomStyle;
  
  // Sorting function
  sort?: (row1: RowData, row2: RowData) => number;
  
  // Filtering function
  filter?: (row: RowData) => boolean;
  
  // Column visibility
  enabledColumns?: string[];
  disabledColumns?: string[];
  
  // Computed columns
  computedColumns?: ComputedColumnConfig[];
  
  // Table title
  title?: string;
  
  // Custom color mapping
  colorMap?: Record<string, string>;
}
```

### Complete Example

```javascript
const { Table } = require("console-table-printer");

// Create table with comprehensive configuration
const table = new Table({
  // Define columns with specific properties
  columns: [
    { 
      name: "id", 
      title: "ID", 
      alignment: "left", 
      color: "cyan",
      maxLen: 10 
    },
    { 
      name: "name", 
      title: "Full Name", 
      alignment: "center", 
      color: "yellow",
      minLen: 15 
    },
    { 
      name: "age", 
      title: "Age", 
      alignment: "right", 
      color: "green" 
    }
  ],
  
  // Default options for any columns added later
  defaultColumnOptions: {
    alignment: "center",
    color: "white"
  },
  
  // Pre-populate with data
  rows: [
    { id: 1, name: "John Doe", age: 25 },
    { id: 2, name: "Jane Smith", age: 30 }
  ],
  
  // Table styling
  // Default style will be used (omit style property for default borders)
  title: "Employee Directory",
  
  // Sorting by age in descending order
  sort: (row1, row2) => row2.age - row1.age,
  
  // Filter to show only adults
  filter: (row) => row.age >= 18,
  
  // Computed columns
  computedColumns: [
    {
      name: "status",
      function: (row) => row.age >= 25 ? "Senior" : "Junior"
    }
  ],
  
  // Custom colors
  colorMap: {
    custom_blue: '\x1b[34m',
    custom_green: '\x1b[32m'
  }
});

// Add more data
table.addRow({ id: 3, name: "Bob Wilson", age: 35 });

// Print the table
table.printTable();
```
