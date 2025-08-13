---
id: doc-border-design
title: Border Design
sidebar_label: Border Design
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can configure the border of the table by passing style in Table constructor

<img alt="Screenshot" src={useBaseUrl('img/examples/doc-border-design/fat.png')}/>

```js
import { Table } from 'console-table-printer';

const p = new Table({
  style: {
    /*
        Style:
        ╔══════╦═════╦══════╗
        ║ hob  ║ foo ║ mia  ║
        ╟══════╬═════╬══════╢
        ║ ball ║ fox ║ mama ║
        ╚══════╩═════╩══════╝
        */
    headerTop: {
      left: "╔",
      mid: "╦",
      right: "╗",
      other: "═",
    },
    headerBottom: {
      left: "╟",
      mid: "╬",
      right: "╢",
      other: "═",
    },
    tableBottom: {
      left: "╚",
      mid: "╩",
      right: "╝",
      other: "═",
    },
    vertical: "║",
  },
  columns: [
    { name: "index", alignment: "left" },
    { name: "text", alignment: "right" },
    { name: "value" },
  ],
});

// add rows with color
p.addRow(
  { index: 1, text: "I would like some red wine please", value: 10.212 },
  { color: "red" }
);
p.addRow(
  { index: 2, text: "I would like some green gemuse please", value: 20.0 },
  { color: "green" }
);
p.addRow(
  { index: 3, text: "I would like some gelb bananen bitte", value: 100 },
  { color: "yellow" }
);

// print
p.printTable();
```

You can also have colored borders combining with 'chalk' library from npm

<img alt="Screenshot" src={useBaseUrl('img/examples/doc-border-design/fat-blue.png')}/>

```js
// highlight-next-line
const chalk = require('chalk'); // use chalk to color the ascii chars of border

// this this style
style: {
  /*
      Style: (blue)
      ╔══════╦═════╦══════╗
      ║ hob  ║ foo ║ mia  ║
      ╟══════╬═════╬══════╢
      ║ ball ║ fox ║ mama ║
      ╚══════╩═════╩══════╝
      */
  headerTop: {
    left: chalk.blue('╔'),
    mid: chalk.blue('╦'),
    right: chalk.blue('╗'),
    other: chalk.blue('═'),
  },
  headerBottom: {
    left: chalk.blue('╟'),
    mid: chalk.blue('╬'),
    right: chalk.blue('╢'),
    other: chalk.blue('═'),
  },
  tableBottom: {
    left: chalk.blue('╚'),
    mid: chalk.blue('╩'),
    right: chalk.blue('╝'),
    other: chalk.blue('═'),
  },
  vertical: chalk.blue('║'),
},
```
