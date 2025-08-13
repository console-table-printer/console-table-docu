---
id: doc-limit-line-width
title: Limit Column Width
sidebar_label: Limit Column Width
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## maxLen

Limit the max Length of each column using this.

By default all lines are printed in single line. But in case you want to put max width of column lines will be splitted into multiples.

```javascript
import { Table } from 'console-table-printer';

const p = new Table({
  columns: [
    { name: "Index", alignment: "left", color: "red" },
    {
      name: "right_align_text",
      alignment: "right",
      maxLen: 10,
      title: "maxLen10",
    },
    { name: "green", alignment: "center", color: "green" },
  ],
});

// add rows with color
p.addRow(
  {
    Index: 2,
    right_align_text: "This row is blue",
    green: 10.212,
  },
  { color: "blue" }
);
p.addRow(
  {
    Index: 3,
    right_align_text: "I would like some red wine please",
    green: 10.212,
  },
  { color: "red" }
);

// print
p.printTable();
```

<img alt="Screenshot" src={useBaseUrl('img/examples/doc-limit-line-width/screenshot1.png')}/>

## minLen

You can also use minLen accordingly

```javascript
import { Table } from 'console-table-printer';

const p = new Table({
  columns: [
    {
      name: "Index",
      alignment: "left",
      color: "red",
      minLen: 15,
      title: "minLen15",
    },
    {
      name: "right_align_text",
      alignment: "right",
      maxLen: 15,
      title: "maxLen15",
    },
    {
      name: "green",
      alignment: "center",
      color: "green",
      minLen: 20,
      title: "minLen20",
    },
  ],
});

// add rows with color
p.addRow(
  {
    Index: 2,
    right_align_text: "This row is blue",
    green: 10.212,
  },
  { color: "blue" }
);
p.addRow(
  {
    Index: 3,
    right_align_text: "I would like some red wine please",
    green: 10.212,
  },
  { color: "red" }
);

// print
p.printTable();
```

<img alt="Screenshot" src={useBaseUrl('img/examples/doc-limit-line-width/screenshot2.png')}/>
