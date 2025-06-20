---
id: doc-sort-filter
title: Sort and Filter
sidebar_label: Sort and Filter
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Sort

This is an optional param. Pass the sort function that will be used on each row to sort them. This sort function is simple Array element sort function

```javascript
const { Table } = require("console-table-printer");

const p = new Table({
  columns: [{ name: "index" }, { name: "text" }, { name: "value" }],
  // highlight-next-line
  sort: (row1, row2) => +row2.value - +row1.value, // desc sorting order of rows (optional),
});

p.addRow({ index: 1, text: "red wine", value: 11 }, { color: "green" });
p.addRow({ index: 2, text: "green gemuse", value: 21 });
p.addRow({ index: 3, text: "gelb bananen", value: 10 });
p.addRow({ index: 3, text: "rosa hemd wie immer", value: 13 });

p.addRow({ index: 4, text: "some more shit", value: 20 }, { color: "cyan" });

p.printTable();
```

<img alt="Screenshot" src={useBaseUrl('img/examples/doc-sort-filter/sort.png')}/>

## Filter

This is an optional param. Pass the filter function that will be used on each row to filter them

```javascript
const { Table } = require("console-table-printer");

const p = new Table({
  columns: [{ name: "index" }, { name: "text" }, { name: "value" }],
  // highlight-next-line
  filter: (row) => +row.value < 20, // filter rows with value < 20
});

p.addRow({ index: 1, text: "red wine", value: 11 }, { color: "green" });
p.addRow({ index: 2, text: "green gemuse", value: 21 });
p.addRow({ index: 3, text: "gelb bananen", value: 10 });
p.addRow({ index: 3, text: "rosa hemd wie immer", value: 13 });

p.addRow({ index: 4, text: "some more shit", value: 20 }, { color: "cyan" });

p.printTable();
```

<img alt="Screenshot" src={useBaseUrl('img/examples/doc-sort-filter/filter.png')}/>

## Advanced Sorting and Filtering

### Multi-Level Sorting

```javascript
const { Table } = require("console-table-printer");

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

<img alt="Screenshot" src={useBaseUrl('img/examples/doc-sort-filter/multi-level-sort.png')}/>

### Complex Filtering

```javascript
const { Table } = require("console-table-printer");

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

<img alt="Screenshot" src={useBaseUrl('img/examples/doc-sort-filter/complex-filter.png')}/>
