---
id: advanced-features
title: Advanced Features
sidebar_label: Advanced Features
---

# Advanced Features

This section covers advanced features and techniques for complex table operations.

## Computed Columns

Computed columns allow you to create new columns based on calculations or transformations of existing data.

### Basic Computed Columns

```javascript
const { Table } = require("console-table-printer");

const table = new Table({
  columns: [
    { name: "price", alignment: "right" },
    { name: "quantity", alignment: "right" }
  ],
  computedColumns: [
    {
      name: "total",
      function: (row) => row.price * row.quantity
    }
  ]
});

table.addRows([
  { price: 10.50, quantity: 3 },
  { price: 25.00, quantity: 2 },
  { price: 5.75, quantity: 5 }
]);

table.printTable();
```

### Using Row Index

```javascript
const table = new Table({
  columns: [
    { name: "name", alignment: "left" },
    { name: "score", alignment: "right" }
  ],
  computedColumns: [
    {
      name: "rank",
      function: (row, index) => `#${index + 1}`
    },
    {
      name: "percentage",
      function: (row, index, array) => {
        const maxScore = Math.max(...array.map(r => r.score));
        return `${((row.score / maxScore) * 100).toFixed(1)}%`;
      }
    }
  ]
});

table.addRows([
  { name: "Alice", score: 85 },
  { name: "Bob", score: 92 },
  { name: "Charlie", score: 78 }
]);

table.printTable();
```

### Complex Computations

```javascript
const table = new Table({
  columns: [
    { name: "name", alignment: "left" },
    { name: "math", alignment: "right" },
    { name: "science", alignment: "right" },
    { name: "english", alignment: "right" }
  ],
  computedColumns: [
    {
      name: "average",
      function: (row) => {
        const scores = [row.math, row.science, row.english];
        return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
      }
    },
    {
      name: "grade",
      function: (row) => {
        const avg = parseFloat(row.average);
        if (avg >= 90) return "A";
        if (avg >= 80) return "B";
        if (avg >= 70) return "C";
        if (avg >= 60) return "D";
        return "F";
      }
    },
    {
      name: "status",
      function: (row, index, array) => {
        const avg = parseFloat(row.average);
        const classAvg = array.reduce((sum, r) => sum + parseFloat(r.average), 0) / array.length;
        return avg > classAvg ? "Above Average" : "Below Average";
      }
    }
  ]
});

table.addRows([
  { name: "Alice", math: 85, science: 90, english: 88 },
  { name: "Bob", math: 92, science: 88, english: 85 },
  { name: "Charlie", math: 78, science: 82, english: 80 }
]);

table.printTable();
```

## Custom Styling

### Custom Border Styles

```javascript
const table = new Table({
  style: {
    headerTop: {
      left: "┌",
      mid: "┬",
      right: "┐",
      other: "─"
    },
    headerBottom: {
      left: "├",
      mid: "┼",
      right: "┤",
      other: "─"
    },
    tableBottom: {
      left: "└",
      mid: "┴",
      right: "┘",
      other: "─"
    },
    vertical: "│"
  },
  columns: [
    { name: "id", alignment: "left" },
    { name: "name", alignment: "center" },
    { name: "age", alignment: "right" }
  ]
});

table.addRows([
  { id: 1, name: "John", age: 25 },
  { id: 2, name: "Jane", age: 30 }
]);

table.printTable();
```

### Colored Borders with Chalk

```javascript
const chalk = require('chalk');

const table = new Table({
  style: {
    headerTop: {
      left: chalk.blue("╔"),
      mid: chalk.blue("╦"),
      right: chalk.blue("╗"),
      other: chalk.blue("═")
    },
    headerBottom: {
      left: chalk.blue("╟"),
      mid: chalk.blue("╬"),
      right: chalk.blue("╢"),
      other: chalk.blue("═")
    },
    tableBottom: {
      left: chalk.blue("╚"),
      mid: chalk.blue("╩"),
      right: chalk.blue("╝"),
      other: chalk.blue("═")
    },
    vertical: chalk.blue("║")
  },
  columns: [
    { name: "id", alignment: "left", color: "cyan" },
    { name: "name", alignment: "center", color: "yellow" },
    { name: "age", alignment: "right", color: "green" }
  ]
});

table.addRows([
  { id: 1, name: "John", age: 25 },
  { id: 2, name: "Jane", age: 30 }
]);

table.printTable();
```

## Custom Color Mapping

### Semantic Colors

```javascript
const table = new Table({
  colorMap: {
    success: '\x1b[32m',      // Green
    error: '\x1b[31m',        // Red
    warning: '\x1b[33m',      // Yellow
    info: '\x1b[36m',         // Cyan
    highlight: '\x1b[1m',     // Bold
    dim: '\x1b[2m',           // Dim
    underline: '\x1b[4m',     // Underline
    critical: '\x1b[1m\x1b[31m' // Bold Red
  },
  columns: [
    { name: "id", alignment: "left" },
    { name: "status", alignment: "center" },
    { name: "message", alignment: "left" }
  ]
});

table.addRows([
  { id: 1, status: "success", message: "Operation completed" },
  { id: 2, status: "error", message: "Failed to connect" },
  { id: 3, status: "warning", message: "Low disk space" },
  { id: 4, status: "critical", message: "System crash detected" }
]);

table.printTable();
```

### Conditional Coloring

```javascript
const table = new Table({
  columns: [
    { name: "name", alignment: "left" },
    { name: "score", alignment: "right" },
    { name: "status", alignment: "center" }
  ]
});

const data = [
  { name: "Alice", score: 95 },
  { name: "Bob", score: 75 },
  { name: "Charlie", score: 60 },
  { name: "David", score: 45 }
];

data.forEach(row => {
  let color = "white";
  let status = "Pass";
  
  if (row.score >= 90) {
    color = "green";
    status = "Excellent";
  } else if (row.score >= 80) {
    color = "cyan";
    status = "Good";
  } else if (row.score >= 70) {
    color = "yellow";
    status = "Average";
  } else if (row.score >= 60) {
    color = "red";
    status = "Poor";
  } else {
    color = "magenta";
    status = "Fail";
  }
  
  table.addRow(
    { name: row.name, score: row.score, status: status },
    { color: color }
  );
});

table.printTable();
```

## Performance Optimization

### Large Dataset Handling

```javascript
const table = new Table({
  // Pre-define columns for better performance
  columns: [
    { name: "id", alignment: "left" },
    { name: "name", alignment: "center" },
    { name: "email", alignment: "left" },
    { name: "status", alignment: "center" }
  ],
  
  // Filter data before adding to table
  filter: (row) => row.status === "active",
  
  // Sort efficiently
  sort: (row1, row2) => row1.name.localeCompare(row2.name)
});

// Process data in chunks for large datasets
async function processLargeDataset(data) {
  const chunkSize = 1000;
  
  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);
    
    // Process chunk
    const processedChunk = chunk.map(row => ({
      ...row,
      email: row.email.toLowerCase(),
      status: row.active ? "active" : "inactive"
    }));
    
    // Add to table
    table.addRows(processedChunk);
    
    // Optional: Print progress
    console.log(`Processed ${Math.min(i + chunkSize, data.length)} of ${data.length} records`);
  }
  
  table.printTable();
}
```

### Memory-Efficient Computed Columns

```javascript
const table = new Table({
  columns: [
    { name: "id", alignment: "left" },
    { name: "value", alignment: "right" }
  ],
  computedColumns: [
    {
      name: "running_total",
      function: (row, index, array) => {
        // Calculate running total efficiently
        return array
          .slice(0, index + 1)
          .reduce((sum, r) => sum + r.value, 0);
      }
    }
  ]
});

// For very large datasets, consider pre-calculating
function preCalculateRunningTotal(data) {
  let runningTotal = 0;
  return data.map(row => ({
    ...row,
    running_total: runningTotal += row.value
  }));
}
```

## Advanced Filtering and Sorting

### Multi-Level Sorting

```javascript
const table = new Table({
  columns: [
    { name: "department", alignment: "left" },
    { name: "name", alignment: "left" },
    { name: "salary", alignment: "right" }
  ],
  sort: (row1, row2) => {
    // First sort by department
    const deptCompare = row1.department.localeCompare(row2.department);
    if (deptCompare !== 0) return deptCompare;
    
    // Then sort by salary (descending)
    return row2.salary - row1.salary;
  }
});

table.addRows([
  { department: "Engineering", name: "Alice", salary: 85000 },
  { department: "Engineering", name: "Bob", salary: 90000 },
  { department: "Marketing", name: "Charlie", salary: 70000 },
  { department: "Marketing", name: "David", salary: 75000 },
  { department: "Sales", name: "Eve", salary: 65000 }
]);

table.printTable();
```

### Complex Filtering

```javascript
const table = new Table({
  columns: [
    { name: "id", alignment: "left" },
    { name: "name", alignment: "left" },
    { name: "age", alignment: "right" },
    { name: "department", alignment: "left" },
    { name: "salary", alignment: "right" }
  ],
  filter: (row) => {
    // Multiple conditions
    const isAdult = row.age >= 18;
    const isHighSalary = row.salary >= 50000;
    const isEngineering = row.department === "Engineering";
    
    // Complex logic
    return isAdult && (isHighSalary || isEngineering);
  }
});

table.addRows([
  { id: 1, name: "Alice", age: 25, department: "Engineering", salary: 85000 },
  { id: 2, name: "Bob", age: 17, department: "Marketing", salary: 45000 },
  { id: 3, name: "Charlie", age: 30, department: "Sales", salary: 60000 },
  { id: 4, name: "David", age: 22, department: "Engineering", salary: 40000 }
]);

table.printTable();
```

## Dynamic Table Building

### API Data Integration

```javascript
async function buildUserTable() {
  const table = new Table({
    title: "User Directory",
    style: "fatBorder"
  });
  
  try {
    // Fetch data from API
    const response = await fetch('https://api.example.com/users');
    const users = await response.json();
    
    // Determine columns dynamically
    const sampleUser = users[0];
    const columns = Object.keys(sampleUser).map(key => ({
      name: key,
      alignment: typeof sampleUser[key] === 'number' ? 'right' : 'left',
      color: key === 'status' ? 'yellow' : 'white'
    }));
    
    // Add columns
    table.addColumns(columns);
    
    // Add rows with conditional styling
    users.forEach((user, index) => {
      const options = {};
      
      // Color based on status
      if (user.status === 'active') {
        options.color = 'green';
      } else if (user.status === 'inactive') {
        options.color = 'red';
      }
      
      // Add separator every 10 users
      if ((index + 1) % 10 === 0) {
        options.separator = true;
      }
      
      table.addRow(user, options);
    });
    
    table.printTable();
    
  } catch (error) {
    console.error('Failed to build table:', error);
  }
}
```

### Real-time Data Updates

```javascript
class LiveTable {
  constructor() {
    this.table = new Table({
      columns: [
        { name: "timestamp", alignment: "left" },
        { name: "event", alignment: "left" },
        { name: "status", alignment: "center" }
      ],
      title: "Live Event Log"
    });
  }
  
  addEvent(event, status) {
    const timestamp = new Date().toLocaleTimeString();
    
    let color = "white";
    if (status === "success") color = "green";
    else if (status === "error") color = "red";
    else if (status === "warning") color = "yellow";
    
    this.table.addRow(
      { timestamp, event, status },
      { color, separator: status === "error" }
    );
    
    // Clear console and re-render
    console.clear();
    this.table.printTable();
  }
}

// Usage
const liveTable = new LiveTable();

// Simulate real-time events
setInterval(() => {
  const events = ["Data processed", "User logged in", "File uploaded"];
  const statuses = ["success", "warning", "error"];
  
  const randomEvent = events[Math.floor(Math.random() * events.length)];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  
  liveTable.addEvent(randomEvent, randomStatus);
}, 2000);
```

## Error Handling and Validation

### Robust Table Creation

```javascript
function createSafeTable(data, options = {}) {
  try {
    // Validate data
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Data must be a non-empty array");
    }
    
    // Validate first row structure
    const firstRow = data[0];
    if (typeof firstRow !== 'object' || firstRow === null) {
      throw new Error("Each row must be an object");
    }
    
    // Create table with error handling
    const table = new Table({
      ...options,
      columns: options.columns || Object.keys(firstRow).map(key => ({
        name: key,
        alignment: typeof firstRow[key] === 'number' ? 'right' : 'left'
      }))
    });
    
    // Add rows with validation
    data.forEach((row, index) => {
      try {
        // Validate row structure
        if (typeof row !== 'object' || row === null) {
          console.warn(`Skipping invalid row at index ${index}`);
          return;
        }
        
        table.addRow(row);
      } catch (error) {
        console.warn(`Error adding row ${index}:`, error.message);
      }
    });
    
    return table;
    
  } catch (error) {
    console.error("Failed to create table:", error.message);
    return null;
  }
}

// Usage
const data = [
  { id: 1, name: "John", age: 25 },
  { id: 2, name: "Jane", age: 30 },
  null, // Invalid row
  { id: 3, name: "Bob", age: 35 }
];

const table = createSafeTable(data, {
  title: "User List",
  style: "fatBorder"
});

if (table) {
  table.printTable();
}
``` 