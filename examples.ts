import { Table } from "console-table-printer";
import chalk from "chalk";

console.log("=== ADVANCED EXAMPLES DEMONSTRATION ===\n");

// Example 1: Advanced Computed Columns - Using Row Index for Ranking
console.log("1. ADVANCED COMPUTED COLUMNS - Using Row Index for Ranking");
console.log("=" .repeat(60));

const rankingTable = new Table({
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

rankingTable.addRows([
  { name: "Alice", score: 85 },
  { name: "Bob", score: 92 },
  { name: "Charlie", score: 78 }
]);

rankingTable.printTable();
console.log("\n");

// Example 2: Complex Computations with Multiple Subjects
console.log("2. COMPLEX COMPUTATIONS WITH MULTIPLE SUBJECTS");
console.log("=" .repeat(60));

const gradeTable = new Table({
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

gradeTable.addRows([
  { name: "Alice", math: 85, science: 90, english: 88 },
  { name: "Bob", math: 92, science: 88, english: 85 },
  { name: "Charlie", math: 78, science: 82, english: 80 }
]);

gradeTable.printTable();
console.log("\n");

// Example 3: Memory-Efficient Computed Columns
console.log("3. MEMORY-EFFICIENT COMPUTED COLUMNS");
console.log("=" .repeat(60));

const runningTotalTable = new Table({
  columns: [
    { name: "id", alignment: "left" },
    { name: "value", alignment: "right" }
  ],
  computedColumns: [
    {
      name: "running_total",
      function: (row, index, array) => {
        return array
          .slice(0, index + 1)
          .reduce((sum, r) => sum + r.value, 0);
      }
    }
  ]
});

runningTotalTable.addRows([
  { id: 1, value: 10 },
  { id: 2, value: 25 },
  { id: 3, value: 15 },
  { id: 4, value: 30 }
]);

runningTotalTable.printTable();
console.log("\n");

// Example 4: Custom Border Styles
console.log("4. CUSTOM BORDER STYLES");
console.log("=" .repeat(60));

const customBorderTable = new Table({
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

customBorderTable.addRows([
  { id: 1, name: "John", age: 25 },
  { id: 2, name: "Jane", age: 30 }
]);

customBorderTable.printTable();
console.log("\n");

// Example 5: Colored Borders with Chalk
console.log("5. COLORED BORDERS WITH CHALK");
console.log("=" .repeat(60));

const coloredBorderTable = new Table({
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

coloredBorderTable.addRows([
  { id: 1, name: "John", age: 25 },
  { id: 2, name: "Jane", age: 30 }
]);

coloredBorderTable.printTable();
console.log("\n");

// Example 6: Semantic Colors
console.log("6. SEMANTIC COLORS");
console.log("=" .repeat(60));

const semanticColorTable = new Table({
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

semanticColorTable.addRows([
  { id: 1, status: "success", message: "Operation completed" },
  { id: 2, status: "error", message: "Failed to connect" },
  { id: 3, status: "warning", message: "Low disk space" },
  { id: 4, status: "critical", message: "System crash detected" }
]);

semanticColorTable.printTable();
console.log("\n");

// Example 7: Conditional Coloring
console.log("7. CONDITIONAL COLORING");
console.log("=" .repeat(60));

const conditionalColorTable = new Table({
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
  
  conditionalColorTable.addRow(
    { name: row.name, score: row.score, status: status },
    { color: color }
  );
});

conditionalColorTable.printTable();
console.log("\n");

// Example 8: Multi-Level Sorting
console.log("8. MULTI-LEVEL SORTING");
console.log("=" .repeat(60));

const multiSortTable = new Table({
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

multiSortTable.addRows([
  { department: "Engineering", name: "Alice", salary: 85000 },
  { department: "Engineering", name: "Bob", salary: 90000 },
  { department: "Marketing", name: "Charlie", salary: 70000 },
  { department: "Marketing", name: "David", salary: 75000 },
  { department: "Sales", name: "Eve", salary: 65000 }
]);

multiSortTable.printTable();
console.log("\n");

// Example 9: Complex Filtering
console.log("9. COMPLEX FILTERING");
console.log("=" .repeat(60));

const complexFilterTable = new Table({
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

complexFilterTable.addRows([
  { id: 1, name: "Alice", age: 25, department: "Engineering", salary: 85000 },
  { id: 2, name: "Bob", age: 17, department: "Marketing", salary: 45000 },
  { id: 3, name: "Charlie", age: 30, department: "Sales", salary: 60000 },
  { id: 4, name: "David", age: 22, department: "Engineering", salary: 40000 }
]);

complexFilterTable.printTable();
console.log("\n");

console.log("=== ALL ADVANCED EXAMPLES COMPLETED ==="); 