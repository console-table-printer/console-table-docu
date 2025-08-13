---
id: doc-install-quick-start
title: Install and Quick start
sidebar_label: Install and Quick start
slug: /
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Installation

```bash npm2yarn
npm install --save console-table-printer
```

## Basic Example

```javascript
import { printTable } from 'console-table-printer';

//Create a table
const testCases = [
  { Type: "Wish", text: "I would like some gelb bananen bitte", value: 100 },
  { Type: "Hope", text: "I hope batch update is working", value: 300 },
];

//print
printTable(testCases);
```

Output:

<img alt="Screenshot" src={useBaseUrl('img/examples/doc-install-quick-start/quick-print-1.png')}/>
