---
id: doc-color
title: Coloring
sidebar_label: Coloring
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Coloring

You can put color as either entire Row or entire column

```js
import { Table } from 'console-table-printer';

const p = new Table({
  columns: [
    // highlight-next-line
    { name: "index", alignment: "left", color: "yellow" }, // column coloring
    { name: "text", alignment: "right" },
  ],
});

// highlight-next-line
p.addRow({ index: 1, text: "red wine", value: 10.212 }, { color: "green" }); // row coloring

p.addRow({ index: 2, text: "green gemuse", value: 20.0 });
p.addRow(
  { index: 3, text: "gelb bananen", value: 100, is_priority_today: "Y" },
  { color: "yellow" }
);
p.addRow(
  { index: 3, text: "rosa hemd wie immer", value: 100 },
  { color: "cyan" }
);
p.printTable();
```

<img alt="Screenshot" src={useBaseUrl('img/examples/doc-color/screenshot-colored.png')}/>

## Batch Row coloring

```javascript
import { printTable, Table } from 'console-table-printer';

const p = new Table();

p.addRows(
  [
    // adding multiple rows are possible
    { index: 3, text: "green color text1", value: 100 },
    { index: 4, text: "green color text2", value: 300 },
  ],
  // highlight-next-line
  { color: "green" } // multiple rows sharing same properties
);

// print
p.printTable();
```

<img alt="Screenshot" src={useBaseUrl('img/examples/doc-color/screenshot-colored-batch.png')}/>


## possible `color` values for rows/columns

- red
- green
- yellow
- white
- blue
- magenta
- cyan
- white_bold

## Custom Color

You can also choose to have your own colors

```javascript
import { printTable, Table } from 'console-table-printer';

const p = new Table({
  columns: [
    { name: 'index', alignment: 'left', color: 'blue' },
    { name: 'text', alignment: 'right' },
  ],
  colorMap: {
    // highlight-next-line
    custom_green_underscore: '\x1b[4m\x1b[32m', // define customized color
  },
});

p.addRow({ index: 1, text: 'red wine' }, { color: 'green' });
p.addRow(
  { index: 2, text: 'green gemuse'},
  // highlight-next-line
  { color: 'custom_green_underscore' } // your green
);
p.addRow(
  { index: 3, text: 'gelb bananen'},
  { color: 'yellow' }
);
p.addRow(
  { index: 3, text: 'rosa hemd wie immer'},
  { color: 'cyan' }
);
p.printTable();
```

<img alt="Screenshot" src={useBaseUrl('img/examples/doc-color/screenshot-custom-colored-2.png')}/>
