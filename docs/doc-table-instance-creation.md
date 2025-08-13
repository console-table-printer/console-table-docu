---
id: doc-table-instance-creation
title: Create Table Instance
sidebar_label: Create Table Instance
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can also create a new Table instance and print it like this

```javascript
import { Table } from 'console-table-printer';

//Create a table
const p = new Table();

//add rows with color
p.addRow(
  { "LineNr.": 1, text: "red wine please", value: 10.212 },
  { color: "red" }
);
p.addRow(
  { "LineNr.": 2, text: "green gemuse please", value: 20.0 },
  { color: "green" }
);
p.addRows([
  //adding multiple rows are possible
  { "LineNr.": 3, text: "gelb bananen bitte", value: 100 },
  { "LineNr.": 4, text: "update is working", value: 300 },
]);

//print
p.printTable();
```

<img alt="Screenshot" src={useBaseUrl('img/examples/doc-table-instance-creation/screenshot-1.png')}/>

## Table instance creation

There are 3 ways for Table Instance creation

### 1. Simplest way

```javascript
new Table();
```

### 2. Only with column names

```javascript
new Table(["column1", "column2", "column3"]);
```

### 3. More Complex way

```javascript
new Table({
  // Default style will be used (omit style property for default borders)
  columns: [
    { name: "column1", alignment: "left", color: "red" }, //with alignment and color
    { name: "column2", alignment: "right" },
    { name: "column3" },
  ],
  sort: (row1, row2) => row2.column1 - row1.column1, // sorting order of rows (optional)
  filter: (row) => row.column1 < 3, // filtering rows (optional)
});
```

### 4. Bonus example

```javascript
new Table({
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
```

## Functions of table instance

- `addRow(rowObjet, options)` adding single row.
- `addRows(rowObjects, options)` adding multiple rows. array of row object. This case options will be applied to all the objects in row
- `addColumn(columnObject)` adding single column
- `addColumns(columnObjects)` adding multiple columns
- `printTable()` Prints the table on your console
