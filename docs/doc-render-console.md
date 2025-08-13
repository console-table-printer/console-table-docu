---
id: doc-render-console
title: Render Console Output
sidebar_label: Render Console Output
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Output can be generated as a string so that you can choose to use another shell to send the output to.

```javascript
import { Table } from 'console-table-printer';

const p = new Table();

p.addRow({ index: 1, text: "red wine", value: 10.212 }, { color: "green" });
p.addRow({ index: 2, text: "green gemuse", value: 20.0 });

// highlight-next-line
const tableStr = p.render();

// print it in any other console whereever you like
console.log(tableStr);
```

<img alt="Screenshot" src={useBaseUrl('img/examples/doc-render-console/screenshot.png')}/>
