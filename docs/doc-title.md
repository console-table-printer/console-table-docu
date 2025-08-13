---
id: doc-title
title: Table Title
sidebar_label: Table Title
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Currently all table Titles will be White Bold style and aligned center

```javascript
import { printTable, Table } from 'console-table-printer';

const p = new Table({
  // highlight-next-line
  title: "Analysis Results",
  columns: [{ name: "red_amount" }, { name: "blue_amount" }],
});

// add rows
p.addRows([
  {
    red_amount: 2,
    blue_amount: 3,
  },
  {
    red_amount: 1,
    blue_amount: 1,
  },
  {
    red_amount: 5,
    blue_amount: 6,
  },
]);

// print
p.printTable();
```

<img alt="Screenshot" src={useBaseUrl('img/examples/doc-title/screenshot.2.png')}/>
