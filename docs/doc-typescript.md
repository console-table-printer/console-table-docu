---
id: doc-typescript
title: Typescript
sidebar_label: Typescript
---

You can easily import these in typescript. All basic functions Table and printTable are typed

```typescript
// highlight-next-line
import { printTable, Table } from 'console-table-printer';
```

There are types for ALIGNMENT and color

```typescript
// highlight-next-line
import { COLOR, Table, ALIGNMENT } from "../index";

// highlight-start
const red_color: COLOR = "red";
const green_color: COLOR = "green";
const left_alignment: ALIGNMENT = "left";
const center_alignment: ALIGNMENT = "center";
// highlight-end

const p = new Table({
  columns: [
    {
      name: "red_left_align_index",
      alignment: "left",
      color: red_color,
    },
    { name: "right_align_text", alignment: left_alignment },
    {
      name: "green_value_center",
      alignment: center_alignment,
      color: green_color,
    },
  ],
});
```
