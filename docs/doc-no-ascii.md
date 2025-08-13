---
id: doc-no-ascii
title: Disable all colors and special chars
sidebar_label: Disable special chars
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This way you can render just the pure output as Array of string without any kind of special chars included.

```js
import { Table } from 'console-table-printer';

const p = new Table({
  columns: [
    { name: "Serial", alignment: "left", color: "yellow" },
    { name: "text", alignment: "right" },
  ],
  // highlight-next-line
  shouldDisableColors: true, // Disabling all Special chars and also colors
});

p.addRow({ Serial: 1, text: "red wine", value: 10.212 }, { color: "green" });

p.addRow({ Serial: 2, text: "green Veggies", value: 20.0 });
p.addRow(
  { Serial: 3, text: "Yellow Bananas", value: 100, is_priority_today: "Y" },
  { color: "yellow" }
);
p.addRow({ Serial: 3, text: "Cyan things", value: 100 }, { color: "cyan" });
const ret = p.render();

console.log(ret);
```

<img alt="Screenshot" src={useBaseUrl('img/examples/doc-no-ascii/screenshot-1.png')}/>
