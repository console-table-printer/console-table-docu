---
id: doc-row-divider
title: Row Dividers
sidebar_label: Row Dividers
---

import useBaseUrl from '@docusaurus/useBaseUrl';


You can split your table into logical sections by adding row dividers. This is useful when you want to visually separate different groups of data or create a summary section at the bottom of your table.

### Basic Row Divider

```javascript
import { Table } from 'console-table-printer';

const table = new Table();

table.addRow({ amount: 1, name: "Apple" });
table.addRow({ amount: 2, name: "Pear" });
// highlight-next-line
table.addRow({ amount: 3, name: "Banana" }, { separator: true }); // Adds a divider after this row
table.addRow({ amount: 6, name: "Total" });
table.printTable();
```

<img alt="Screenshot" src={useBaseUrl('img/examples/doc-row-divider/screenshot-basic-divider-1.png')}/>

### Multiple Sections

You can add multiple dividers to create several sections in your table:

```javascript
import { Table } from 'console-table-printer';

const table = new Table();

// Fruits section
table.addRow({ category: "Fruits", item: "Apple", price: 1.0 });
table.addRow({ category: "Fruits", item: "Banana", price: 0.5 });
table.addRow({ category: "Fruits", item: "Orange", price: 0.75 }, { separator: true });

// Vegetables section
table.addRow({ category: "Vegetables", item: "Carrot", price: 0.3 });
table.addRow({ category: "Vegetables", item: "Potato", price: 0.4 });
table.addRow({ category: "Vegetables", item: "Tomato", price: 0.6 }, { separator: true });

// Summary section
table.addRow({ category: "Total Items", item: "6", price: 3.55 });
table.printTable();
```

<img alt="Screenshot" src={useBaseUrl('img/examples/doc-row-divider/screenshot-multiple-sections-1.png')}/>

### Using with Computed Values

Row dividers are particularly useful when displaying summaries or computed values:

```javascript
import { Table } from 'console-table-printer';

const table = new Table();

// Sales data
table.addRow({ quarter: "Q1", sales: 1000, profit: 200 });
table.addRow({ quarter: "Q2", sales: 1500, profit: 350 });
table.addRow({ quarter: "Q3", sales: 1200, profit: 280 });
table.addRow({ quarter: "Q4", sales: 2000, profit: 500 }, { separator: true });

// Yearly summary
table.addRow({ 
  quarter: "Total", 
  sales: 5700, 
  profit: 1330 
});
table.printTable();
```

<img alt="Screenshot" src={useBaseUrl('img/examples/doc-row-divider/screenshot-computed-values-1.png')}/>

The separator option helps create clear visual breaks in your data, making it easier to read and understand the different sections of your table. 