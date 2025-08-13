---
id: configuration
title: Configuration & Types
sidebar_label: Configuration
---

# Configuration & Types

This section covers all configuration options, interfaces, and data types used throughout the library.

## Configuration Interfaces

### TableOptions

Main configuration object for the Table constructor.

```typescript
interface TableOptions {
  // Column definitions
  columns?: ColumnConfig[];
  
  // Default options for all columns
  defaultColumnOptions?: ColumnConfig;
  
  // Pre-defined rows
  rows?: RowData[];
  
  // Table styling
  style?: CustomStyle;
  
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

**Complete Example:**
```javascript
const table = new Table({
  // Column definitions
  columns: [
    { name: "id", alignment: "left", color: "cyan" },
    { name: "name", alignment: "center", color: "yellow" },
    { name: "age", alignment: "right", color: "green" }
  ],
  
  // Default options for any columns added later
  defaultColumnOptions: {
    alignment: "center",
    color: "white",
    maxLen: 20
  },
  
  // Pre-populate with data
  rows: [
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Jane", age: 30 }
  ],
  
  // Table styling (using default style)
  // style: customStyleObject, // Use custom style object if needed
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
  
  // Show only specific columns
  enabledColumns: ["id", "name", "age", "status"],
  
  // Custom colors
  colorMap: {
    custom_blue: '\x1b[34m',
    custom_green: '\x1b[32m'
  }
});
```

### ColumnConfig

Configuration for individual columns.

```typescript
interface ColumnConfig {
  // Required: Column identifier
  name: string;
  
  // Optional: Display title (defaults to name)
  title?: string;
  
  // Optional: Text alignment
  alignment?: Alignment;
  
  // Optional: Text color
  color?: Color;
  
  // Optional: Maximum length
  maxLen?: number;
  
  // Optional: Minimum length
  minLen?: number;
}
```

**Examples:**
```javascript
// Simple column
{ name: "id" }

// Column with alignment
{ name: "name", alignment: "center" }

// Column with color
{ name: "status", color: "red" }

// Column with length constraints
{ name: "description", maxLen: 20, minLen: 10 }

// Column with custom title
{ name: "created_at", title: "Created Date", alignment: "right" }

// Complete configuration
{
  name: "salary",
  title: "Annual Salary ($)",
  alignment: "right",
  color: "green",
  maxLen: 15,
  minLen: 10
}
```

### RowOptions

Options for row operations.

```typescript
interface RowOptions {
  // Row color
  color?: Color;
  
  // Add separator after this row
  separator?: boolean;
}
```

**Examples:**
```javascript
// Simple row
table.addRow({ id: 1, name: "John" });

// Row with color
table.addRow({ id: 1, name: "John" }, { color: "green" });

// Row with separator
table.addRow({ id: 1, name: "John" }, { separator: true });

// Row with both options
table.addRow(
  { id: 1, name: "John" }, 
  { color: "red", separator: true }
);
```

### ComputedColumnConfig

Configuration for computed columns.

```typescript
interface ComputedColumnConfig {
  // Required: Column name
  name: string;
  
  // Required: Computation function
  function: (row: RowData, index: number, array: RowData[]) => any;
}
```

**Examples:**
```javascript
// Simple computation
{
  name: "full_name",
  function: (row) => `${row.first_name} ${row.last_name}`
}

// Using row index
{
  name: "row_number",
  function: (row, index) => index + 1
}

// Using all rows for comparison
{
  name: "percentile",
  function: (row, index, array) => {
    const sorted = array.sort((a, b) => a.score - b.score);
    const position = sorted.findIndex(r => r.id === row.id);
    return Math.round((position / array.length) * 100);
  }
}

// Complex computation with conditional logic
{
  name: "grade",
  function: (row) => {
    if (row.score >= 90) return "A";
    if (row.score >= 80) return "B";
    if (row.score >= 70) return "C";
    if (row.score >= 60) return "D";
    return "F";
  }
}
```

### CustomStyle

Custom border style configuration.

```typescript
interface CustomStyle {
  headerTop: BorderLine;
  headerBottom: BorderLine;
  tableBottom: BorderLine;
  vertical: string;
}

interface BorderLine {
  left: string;
  mid: string;
  right: string;
  other: string;
}
```

**Example:**
```javascript
const customStyle = {
  headerTop: {
    left: "╔",
    mid: "╦",
    right: "╗",
    other: "═"
  },
  headerBottom: {
    left: "╟",
    mid: "╬",
    right: "╢",
    other: "═"
  },
  tableBottom: {
    left: "╚",
    mid: "╩",
    right: "╝",
    other: "═"
  },
  vertical: "║"
};

const table = new Table({
  style: customStyle,
  columns: [
    { name: "id", alignment: "left" },
    { name: "name", alignment: "center" },
    { name: "age", alignment: "right" }
  ]
});
```

## Data Types

### RowData

Represents a single row of data.

```typescript
type RowData = Record<string, any>;
```

**Examples:**
```javascript
// Simple row
{ id: 1, name: "John", age: 25 }

// Complex row with nested data
{
  id: 1,
  name: "John Doe",
  age: 25,
  address: {
    street: "123 Main St",
    city: "New York"
  },
  tags: ["developer", "senior"],
  active: true
}

// Row with computed values
{
  id: 1,
  name: "John",
  score: 85,
  timestamp: new Date(),
  metadata: {
    created: "2024-01-01",
    updated: "2024-01-15"
  }
}
```

### Alignment

Text alignment options.

```typescript
type Alignment = "left" | "center" | "right";
```

**Usage Examples:**
```javascript
// Left alignment (default)
{ name: "id", alignment: "left" }

// Center alignment
{ name: "name", alignment: "center" }

// Right alignment
{ name: "age", alignment: "right" }
```

### Color

Available color options.

```typescript
type Color = 
  | "red"
  | "green" 
  | "yellow"
  | "white"
  | "blue"
  | "magenta"
  | "cyan"
  | "white_bold"
  | string; // Custom colors defined in colorMap
```

**Usage Examples:**
```javascript
// Built-in colors
{ name: "status", color: "red" }
{ name: "name", color: "green" }
{ name: "warning", color: "yellow" }

// Custom colors
const table = new Table({
  colorMap: {
    success: '\x1b[32m',
    error: '\x1b[31m',
    warning: '\x1b[33m',
    info: '\x1b[36m'
  }
});

// Use custom colors
{ name: "status", color: "success" }
{ name: "error", color: "error" }
```

### TableStyle

Pre-defined table border styles.

The style property accepts a `TableStyleDetails` object or can be omitted to use the default style.

**Examples:**
```javascript
// Default border style (will use built-in default style)
const table = new Table();

// Custom border style
const table = new Table({ 
  style: {
    headerTop: { left: "┌", mid: "┬", right: "┐", other: "─" },
    headerBottom: { left: "├", mid: "┼", right: "┤", other: "─" },
    tableBottom: { left: "└", mid: "┴", right: "┘", other: "─" },
    vertical: "│"
  }
});
```

## Function Signatures

### Sort Function

```typescript
type SortFunction = (row1: RowData, row2: RowData) => number;
```

**Parameters:**
- `row1: RowData` - First row for comparison
- `row2: RowData` - Second row for comparison

**Returns:** `number` - Negative if row1 < row2, positive if row1 > row2, 0 if equal

**Examples:**
```javascript
// Sort by numeric value in ascending order
sort: (row1, row2) => row1.age - row2.age

// Sort by numeric value in descending order
sort: (row1, row2) => row2.score - row1.score

// Sort by string alphabetically
sort: (row1, row2) => row1.name.localeCompare(row2.name)

// Sort by multiple fields
sort: (row1, row2) => {
  if (row1.department !== row2.department) {
    return row1.department.localeCompare(row2.department);
  }
  return row1.name.localeCompare(row2.name);
}

// Sort by date
sort: (row1, row2) => new Date(row1.created) - new Date(row2.created)
```

### Filter Function

```typescript
type FilterFunction = (row: RowData) => boolean;
```

**Parameters:**
- `row: RowData` - Row data to evaluate

**Returns:** `boolean` - `true` to include row, `false` to exclude

**Examples:**
```javascript
// Filter by numeric value
filter: (row) => row.age >= 18

// Filter by string value
filter: (row) => row.status === "active"

// Filter by multiple conditions
filter: (row) => row.age >= 18 && row.status === "active"

// Filter by array inclusion
filter: (row) => row.tags.includes("senior")

// Filter by date range
filter: (row) => {
  const date = new Date(row.created);
  const start = new Date("2024-01-01");
  const end = new Date("2024-12-31");
  return date >= start && date <= end;
}

// Complex filter with nested properties
filter: (row) => {
  return row.address?.city === "New York" && 
         row.metadata?.active === true;
}
```

### Computed Column Function

```typescript
type ComputedFunction = (row: RowData, index: number, array: RowData[]) => any;
```

**Parameters:**
- `row: RowData` - Current row data
- `index: number` - Current row index (0-based)
- `array: RowData[]` - Array of all rows

**Returns:** `any` - Computed value for the column

**Examples:**
```javascript
// Simple computation using row data
function: (row) => row.price * row.quantity

// Using row index
function: (row, index) => `Row ${index + 1}`

// Using all rows for comparison
function: (row, index, array) => {
  const avg = array.reduce((sum, r) => sum + r.score, 0) / array.length;
  return row.score > avg ? "Above Average" : "Below Average";
}

// Complex computation with conditional logic
function: (row, index, array) => {
  const total = array.reduce((sum, r) => sum + r.amount, 0);
  const percentage = ((row.amount / total) * 100).toFixed(2);
  return `${percentage}%`;
}

// Using index for ranking
function: (row, index, array) => {
  const sorted = [...array].sort((a, b) => b.score - a.score);
  const rank = sorted.findIndex(r => r.id === row.id) + 1;
  return rank;
}
```

## TypeScript Enums

### ALIGNMENT

```typescript
enum ALIGNMENT {
  LEFT = "left",
  CENTER = "center",
  RIGHT = "right"
}
```

**Usage:**
```typescript
import { ALIGNMENT } from 'console-table-printer';

const table = new Table({
  columns: [
    { name: "id", alignment: ALIGNMENT.LEFT },
    { name: "name", alignment: ALIGNMENT.CENTER },
    { name: "age", alignment: ALIGNMENT.RIGHT }
  ]
});
```

### COLOR

```typescript
enum COLOR {
  RED = "red",
  GREEN = "green",
  YELLOW = "yellow",
  WHITE = "white",
  BLUE = "blue",
  MAGENTA = "magenta",
  CYAN = "cyan",
  WHITE_BOLD = "white_bold"
}
```

**Usage:**
```typescript
import { COLOR } from 'console-table-printer';

const table = new Table({
  columns: [
    { name: "status", color: COLOR.RED },
    { name: "name", color: COLOR.GREEN },
    { name: "warning", color: COLOR.YELLOW }
  ]
});
```

## Configuration Best Practices

1. **Column Definition:** Define columns in constructor for better performance
2. **Default Options:** Use `defaultColumnOptions` for consistent styling
3. **Computed Columns:** Keep computation functions simple and efficient
4. **Custom Colors:** Use descriptive names for custom colors
5. **Sorting/Filtering:** Apply filters before sorting for better performance
6. **Type Safety:** Use TypeScript interfaces for better development experience 