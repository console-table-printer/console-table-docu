---
id: doc-enable-disable-col
title: Enable and Disable Columns
sidebar_label: Enable and Disable Columns
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Enable

Optional param. Pass the names of columns as a list. Use it when your JSON data contains extra fields and you want only a few columns to be visible.

```javascript
import { Table } from 'console-table-printer';

const p = new Table({
  // highlight-next-line
  enabledColumns: ["id", "text"],
});

// add rows with color
p.addRows([
  {
    id: 2,
    text: "This row is some shit",
    garbages: 10.212,
  },
  {
    id: 3,
    text: "I would like some more text",
    garbages: 10.212,
  },
  {
    id: 4,
    text: "I would like some text",
    garbages: "some garbase shit that I dont want to see",
  },
]);

p.printTable();
```

<img alt="Screenshot" src={useBaseUrl('img/examples/doc-enable-disable-col/enable.png')}/>

## Disable

This one is good in case you have a short list of disabled columns.

```javascript
import { Table } from 'console-table-printer';

const p = new Table({
  // highlight-next-line
  disabledColumns: ["garbages"],
});

// add rows with color
p.addRows([
  {
    good_text: "This row is some shit",
    id: "1",
    garbages: 10.212,
  },
  {
    id: "2",
    good_text: "I would like some more text",
    garbages: 10.212,
  },
  {
    id: "3",
    good_text: "I would like some text",
    garbages: "some garbase shit that I dont want to see",
  },
]);

p.printTable();
```

<img alt="Screenshot" src={useBaseUrl('img/examples/doc-enable-disable-col/disable.png')}/>
