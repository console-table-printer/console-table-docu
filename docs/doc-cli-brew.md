---
id: doc-cli-brew
title: Homebrew Installation
sidebar_label: Homebrew
---

# ctp - A Homebrew CLI Table Printer

🍻 This is a Homebrew tap for table-printer-cli, a Node.js CLI tool for printing beautiful tables in your terminal.

## 🚀 Quick Install

```bash
brew install console-table-printer/homebrew-console-table/ctp
```

## 📋 Usage

After installation, you can use the `ctp` command in your terminal:

### Show help

```bash
ctp --help
```

### Simple Table

```bash
ctp -i '[{ "id":3, "text":"like" }, {"id":4, "text":"tea"}]'
```

### Use custom column styles

```bash
ctp -i '[{"id":1,"status":"active"},{"id":2,"status":"inactive"}]' --tableOptions '{"columns": [{"name": "status", "color": "green"}]}'
```

### Change table title

```bash
ctp -i '[{"id":1,"name":"John"}]' --tableOptions '{"title": "Users List"}'
```

## 🗑️ Uninstallation

To remove the package:

```bash
brew uninstall ctp
```

## Notes

- Input must be valid JSON
- Table options must be valid JSON format
- Colors and styles are compatible with the console-table-printer library 