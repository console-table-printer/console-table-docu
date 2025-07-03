---
id: table-methods
title: Table Instance Methods
sidebar_label: Table Methods
---

# Table Instance Methods

This section covers all methods available on Table instances for manipulating data and structure.

## Row Management Methods

### addRow

### `addRow(rowData: RowData, options?: RowOptions): Table`

Adds a single row to the table.

**Parameters:**
- `rowData: RowData` - Object containing row data
- `options?: RowOptions` - Optional row-specific options

**Returns:** `Table` instance (for method chaining)

**Example:**
```javascript
const table = new Table();
table.addRow({ id: 1, name: "John", age: 25 });
```

**With Options:**
```javascript
const table = new Table();
table.addRow(
  { id: 1, name: "John", age: 25 }, 
  { color: "green", separator: true }
);
```

**Chaining:**
```javascript
const table = new Table();
table
  .addRow({ id: 1, name: "John", age: 25 }, { color: "green" })
  .addRow({ id: 2, name: "Jane", age: 30 }, { color: "blue" })
  .addRow({ id: 3, name: "Bob", age: 35 }, { color: "red" });
```

### addRows

### `addRows(rowsData: RowData[], options?: RowOptions): Table`

Adds multiple rows to the table.

**Parameters:**
- `rowsData: RowData[]` - Array of objects containing row data
- `options?: RowOptions` - Optional options applied to all rows

**Returns:** `Table` instance (for method chaining)

**Example:**
```javascript
const table = new Table();
table.addRows([
  { id: 1, name: "John", age: 25 },
  { id: 2, name: "Jane", age: 30 },
  { id: 3, name: "Bob", age: 35 }
]);
```

**With Options:**
```javascript
const table = new Table();
table.addRows([
  { id: 1, name: "John", age: 25 },
  { id: 2, name: "Jane", age: 30 },
  { id: 3, name: "Bob", age: 35 }
], { color: "yellow" });
```

**Mixed with Separators:**
```javascript
const table = new Table();

// Add first group
table.addRows([
  { category: "Fruits", item: "Apple", price: 1.0 },
  { category: "Fruits", item: "Banana", price: 0.5 }
]);

// Add separator
table.addRow({ category: "Fruits", item: "Orange", price: 0.75 }, { separator: true });

// Add second group
table.addRows([
  { category: "Vegetables", item: "Carrot", price: 0.3 },
  { category: "Vegetables", item: "Potato", price: 0.4 }
]);
```

## Column Management Methods

### addColumn

### `addColumn(columnConfig: ColumnConfig): Table`

Adds a single column to the table.

**Parameters:**
- `columnConfig: ColumnConfig` - Column configuration object

**Returns:** `Table` instance (for method chaining)

**Example:**
```javascript
const table = new Table();
table.addColumn({ 
  name: "age", 
  alignment: "right", 
  color: "yellow" 
});
```

**Complete Column Configuration:**
```javascript
const table = new Table();
table.addColumn({
  name: "salary",
  title: "Annual Salary",
  alignment: "right",
  color: "green",
  maxLen: 15,
  minLen: 10
});
```

### addColumns

### `addColumns(columnsConfig: ColumnConfig[]): Table`

Adds multiple columns to the table.

**Parameters:**
- `columnsConfig: ColumnConfig[]` - Array of column configuration objects

**Returns:** `Table` instance (for method chaining)

**Example:**
```javascript
const table = new Table();
table.addColumns([
  { name: "id", alignment: "left", color: "cyan" },
  { name: "name", alignment: "center", color: "yellow" },
  { name: "age", alignment: "right", color: "green" }
]);
```

**Mixed Column Types:**
```javascript
const table = new Table();
table.addColumns([
  // Simple column
  { name: "id" },
  
  // Column with alignment
  { name: "name", alignment: "center" },
  
  // Column with color
  { name: "status", color: "red" },
  
  // Column with length constraints
  { name: "description", maxLen: 20, minLen: 10 },
  
  // Column with custom title
  { name: "created_at", title: "Created Date", alignment: "right" }
]);
```

## Output Methods

### printTable

### `printTable(): void`

Prints the table to the console.

**Parameters:** None

**Returns:** `void`

**Example:**
```javascript
const table = new Table();
table.addRow({ id: 1, name: "John" });
table.printTable();
```

**Complete Workflow:**
```javascript
const table = new Table({
  columns: [
    { name: "id", alignment: "left" },
    { name: "name", alignment: "center" },
    { name: "age", alignment: "right" }
  ]
});

table.addRows([
  { id: 1, name: "John", age: 25 },
  { id: 2, name: "Jane", age: 30 },
  { id: 3, name: "Bob", age: 35 }
]);

table.printTable();
```

### render

### `render(): string`

Renders the table as a string without printing it.

**Parameters:** None

**Returns:** `string` - The formatted table as a string

**Example:**
```javascript
const table = new Table();
table.addRow({ id: 1, name: "John" });
const tableString = table.render();
console.log(tableString);
```

**Advanced Usage:**
```javascript
const table = new Table({
  title: "User Report"
  // Default style will be used (omit style property for default borders)
});

table.addRows([
  { id: 1, name: "John", age: 25 },
  { id: 2, name: "Jane", age: 30 }
]);

// Get the formatted string
const report = table.render();

// Save to file
const fs = require('fs');
fs.writeFileSync('user-report.txt', report);

// Send via email
sendEmail('admin@company.com', 'User Report', report);

// Log to different console
console.error(report);
```

## Method Chaining Examples

### Complete Table Building
```javascript
const table = new Table()
  .addColumn({ name: "id", alignment: "left", color: "cyan" })
  .addColumn({ name: "name", alignment: "center", color: "yellow" })
  .addColumn({ name: "age", alignment: "right", color: "green" })
  .addRow({ id: 1, name: "John", age: 25 }, { color: "blue" })
  .addRow({ id: 2, name: "Jane", age: 30 }, { color: "red" })
  .addRow({ id: 3, name: "Bob", age: 35 }, { separator: true })
  .addRow({ id: 4, name: "Alice", age: 28 })
  .printTable();
```

### Dynamic Table Building
```javascript
const table = new Table();

// Add columns dynamically
const columns = ["id", "name", "email", "role"];
columns.forEach(col => {
  table.addColumn({ 
    name: col, 
    alignment: col === "id" ? "left" : "center" 
  });
});

// Add rows from API data
async function buildUserTable() {
  const users = await fetchUsers();
  
  users.forEach((user, index) => {
    const options = {};
    
    // Add color based on role
    if (user.role === "admin") {
      options.color = "red";
    } else if (user.role === "manager") {
      options.color = "yellow";
    }
    
    // Add separator after every 5 users
    if ((index + 1) % 5 === 0) {
      options.separator = true;
    }
    
    table.addRow(user, options);
  });
  
  table.printTable();
}
```

## RowOptions Interface

```typescript
interface RowOptions {
  // Row color
  color?: Color;
  
  // Add separator after this row
  separator?: boolean;
}
```

## ColumnConfig Interface

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
