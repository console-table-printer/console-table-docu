---
id: doc-transform
title: Transform Functions
sidebar_label: Transform Functions
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Transform functions allow you to format cell values before display without modifying the original data. This is useful for currency formatting, date conversion, string manipulation, and any other display transformations.

## Basic String Transform

```javascript
import { Table } from 'console-table-printer';

const p = new Table({
  columns: [
    { name: 'original', alignment: 'left' },
    {
      name: 'uppercase',
      alignment: 'left',
      // highlight-next-line
      transform: (value) => String(value).toUpperCase()
    },
  ],
});

p.addRow({ original: 'hello', uppercase: 'hello' });
p.addRow({ original: 'world', uppercase: 'world' });
p.addRow({ original: 'test', uppercase: 'test' });

p.printTable();
```

The `uppercase` column displays the transformed values while the original data remains unchanged.

## Currency Formatting

One of the most common use cases is formatting numbers as currency:

```javascript
import { Table } from 'console-table-printer';

const p = new Table({
  columns: [
    { name: 'item', alignment: 'left' },
    {
      name: 'price',
      alignment: 'right',
      // highlight-next-line
      transform: (value) => `$${Number(value).toFixed(2)}`
    },
  ],
});

p.addRows([
  { item: 'Coffee', price: 3.5 },
  { item: 'Sandwich', price: 7.99 },
  { item: 'Water', price: 1 },
]);

p.printTable();
```

This transforms raw numbers like `3.5` into formatted currency like `$3.50`.
