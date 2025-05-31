---
id: doc-cli-install-quick-start
title: Quick Start
sidebar_label: CLI Quick Start
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Synopsis

Printing Simple Table on your bash terminal. Its useful when you want to present some tables on console.

## Installation

<Tabs defaultValue="npm" values={[
{ label: 'npm', value: 'npm', },
{ label: 'Yarn', value: 'yarn', },
]}>

<TabItem value="npm">

```bash
npm install --global table-printer-cli
```

</TabItem>

<TabItem value="yarn">

```bash
yarn global add table-printer-cli
```

</TabItem>

</Tabs>

## Basic Example

Try this on your terminal.

```bash
ctp -i '[{ "id":3, "text":"like" }, {"id":4, "text":"tea"}]'
```

Output:

<img alt="Screenshot" src={useBaseUrl('img/examples/doc-cli-install-quick-start/quick-print.v3.png')}/>

You can also pipe the input from stdin

```bash
echo '[{ "id":3, "text":"like" }, {"id":4, "text":"tea"}]' | ctp -s
```

## Detailed usage

```text
Usage: ctp [options]

Options:
  -i, --input <value>  input string
  -s, --stdin          read input from stdin
  -h, --help           display help for command
```
