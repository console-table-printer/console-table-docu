---
id: cli-brew
title: CLI Tool Installation and Usage
sidebar_label: CLI Tool
---

# Console Table Printer CLI

📟🍭 A command-line tool for printing beautiful tables in your terminal.

## Installation

You can install the CLI tool using one of the following methods:

### Using Homebrew

```bash
brew install console-table-printer/homebrew-console-table/ctp
```

### Using npm

```bash
npm install --global table-printer-cli
```

### Using yarn

```bash
yarn global add table-printer-cli
```

## Basic Usage

The CLI tool (`ctp`) accepts JSON input and prints it as a formatted table.

### Show Help

```bash
ctp --help
```

### Basic Example

Print a simple table from JSON string:

```bash
ctp -i '[{ "id":3, "text":"like" }, {"id":4, "text":"tea"}]'
```

### Custom Column Styles

```bash
ctp -i '[{"id":1,"status":"active"},{"id":2,"status":"inactive"}]' --tableOptions '{"columns": [{"name": "status", "color": "green"}]}'
```

### Custom Table Title

```bash
ctp -i '[{"id":1,"name":"John"}]' --tableOptions '{"title": "Users List"}'
```

### Piping Data

You can pipe JSON data from other commands:

```bash
echo '[{"name":"Alice","role":"Developer"},{"name":"Bob","role":"Designer"}]' | ctp -s
```

## Command Options

```
Usage: ctp [options]

Options:
  -i, --input <value>         input string
  -s, --stdin                 read input from stdin
  -t, --tableOptions <value>  table options in JSON format
  -h, --help                  display help for command
```

## Advanced Examples

### 1. Simple Table with Multiple Rows

```bash
ctp -i '[
  {"id": 1, "name": "Product A", "price": 100},
  {"id": 2, "name": "Product B", "price": 200},
  {"id": 3, "name": "Product C", "price": 300}
]'
```

### 2. Colored Table with Custom Alignment

```bash
ctp -i '[
  {"name": "Error", "count": 5, "severity": "high"},
  {"name": "Warning", "count": 10, "severity": "medium"},
  {"name": "Info", "count": 15, "severity": "low"}
]' --tableOptions '{
  "title": "System Logs",
  "columns": [
    {"name": "severity", "color": "red", "alignment": "center"},
    {"name": "count", "color": "yellow", "alignment": "right"}
  ]
}'
```

### 3. Reading from stdin

```bash
cat data.json | ctp -s
```

## Uninstallation

### Homebrew

```bash
brew uninstall ctp
```

### npm

```bash
npm uninstall -g table-printer-cli
```

### yarn

```bash
yarn global remove table-printer-cli
```

## Notes

- Input must be valid JSON
- Table options must be valid JSON format
- Colors and styles are compatible with the console-table-printer library 