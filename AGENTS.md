# AGENTS.md

This guide is for future agents and maintainers working in this documentation repository. It summarizes how the Docusaurus site is organized, how documentation changes should be made, and which checks matter before handing work back.

## Project Overview

`console-table-docu` is the Docusaurus documentation site for the `console-table-printer` package. The site documents library features, CLI usage, API reference pages, screenshots, and examples. It is deployed to Netlify and built from Markdown docs plus a small React homepage.

The sibling implementation repos are usually checked out next to this repo:

- `../console-table-printer`: source of truth for public exports, TypeScript option types, tested rendering behavior, and library README examples.
- `../table-printer-cli`: source of truth for the `ctp` command, CLI flags, package metadata, README examples, and CLI screenshots.

## Repository Map

- `docs/`: user-facing documentation pages.
  - `docs/doc-*.md`: feature and workflow guides.
  - `docs/api/`: API reference pages for functions, table methods, and configuration.
- `sidebars.js`: Docusaurus sidebar structure. New docs pages must be added here to be discoverable.
- `docusaurus.config.js`: site metadata, navbar/footer links, docs plugin config, edit URL, and custom CSS wiring.
- `src/pages/index.tsx`: homepage entry point.
- `src/components/`: homepage components.
- `src/css/`: custom theme CSS and CSS variables.
- `src/utils/sources.tsx`: homepage feature-card content.
- `src/__mocks__/`: Jest mocks for Docusaurus, theme, CSS, and static assets.
- `src/test-utils/`: React Testing Library helpers.
- `cypress/e2e/`: integration tests for navigation, links, pages, images, and URLs.
- `static/img/`: favicon, logos, homepage images, and documentation screenshots.
- `examples.ts`: local example script for console-table-printer scenarios. Keep examples consistent with docs when editing it.
- `netlify.toml`: Netlify build settings. The build command is `yarn build` and the publish directory is `build/`.

## Development Commands

Use Yarn for this repository.

```bash
yarn
yarn start
yarn build
yarn test
yarn test:coverage
yarn test-integration
```

Useful targeted checks:

```bash
yarn test src/pages/__tests__/index.test.tsx
yarn test src/components/Sources/__tests__/Sources.test.tsx
yarn cy:run
```

Notes:

- `yarn start` runs Docusaurus locally, normally at `http://localhost:3000`.
- `yarn build` catches Docusaurus build errors, broken imports, malformed Markdown/MDX, and missing static assets.
- `yarn test` runs Jest in `jsdom` using `jest.config.js`.
- `yarn test-integration` starts the Docusaurus dev server and runs Cypress against `http://localhost:3000`.
- Netlify currently uses Node `22.16.0` from `netlify.toml`.

## Documentation Workflow

When adding or changing docs:

1. Start from the implementation source of truth. For library behavior, use `../console-table-printer`, especially `index.ts`, `src/models/external-table.ts`, and feature tests under `test/features/`. For CLI behavior, use `../table-printer-cli`, especially `index.ts`, `src/service.ts`, `package.json`, `README.md`, and tests under `test/readmeExamples/`.
2. Decide whether the behavior deserves a standalone guide page, an API reference update, or both.
3. Add or edit Markdown under `docs/`.
4. If adding a new page, add its document id to `sidebars.js`.
5. If the page has screenshots, store them under `static/img/examples/<doc-id>/` and reference them through `useBaseUrl`.
6. Update Cypress page/link/url expectations when the sidebar label, page title, URL, required headings, or screenshot counts change.
7. Keep examples runnable and aligned with the current package API.

Prefer practical, task-oriented docs. A feature page should show the smallest useful example first, then one or two realistic variations. API reference pages should be complete and precise about signatures, options, return values, defaults, and edge cases.

## Feature Declaration Checklist

A user-facing feature is not fully declared until the relevant documentation surface exists. Before considering a feature documented, check for:

- A discoverable guide page in `docs/` when the behavior is more than a small option.
- `docs/api/core-functions.md` updates for top-level helpers such as `printTable` and `renderTable`.
- `docs/api/table-methods.md` updates for `Table` instance methods.
- `docs/api/configuration.md` updates for constructor options, column options, row options, callbacks, enums, and supported value types.
- `docs/doc-cli-install-quick-start.md` and `docs/doc-cli-brew.md` updates when `ctp` install steps, flags, stdin/input behavior, table-options examples, help output, or screenshots change.
- A `sidebars.js` entry for every new guide page.
- Cypress updates in `cypress/e2e/link_tests.cy.ts`, `page_tests.cy.ts`, and `url_tests.cy.ts` when navigation, labels, URLs, or required headings change.
- Screenshots for visual output changes, with stable paths under `static/img/examples/`.
- Cross-links from nearby topics so users can find related behavior.

Common gaps to watch for:

- Public exports in the library that are absent from API docs.
- Public constructor options in `ComplexOptions` that appear only in a broad example.
- Feature tests in `../console-table-printer/test/features/` that have no dedicated guide or API section.
- CLI flags or README examples in `../table-printer-cli` that are absent from CLI docs.
- Docs that describe the implementation inaccurately, such as saying an option disables border characters when it only disables ANSI colors.

## Page And Sidebar Conventions

Each docs page should have frontmatter:

```md
---
id: doc-example-id
title: Human Page Title
sidebar_label: Sidebar Label
---
```

Use `doc-*` ids for feature guides and place API reference docs under `docs/api/`. Keep sidebar labels short and stable because Cypress tests assert them directly.

For pages with images:

```md
import useBaseUrl from '@docusaurus/useBaseUrl';

<img alt="Screenshot" src={useBaseUrl('img/examples/doc-example-id/screenshot.png')}/>
```

Keep screenshot filenames descriptive enough to understand the scenario from the path. If a screenshot changes because output intentionally changed, update the file and verify image-loading Cypress tests still pass.

## Testing Guidance

Choose checks based on the change:

- Markdown-only edits to an existing page: usually run `yarn build` when imports, links, images, or MDX syntax changed.
- New docs page or sidebar movement: run `yarn build` and update/run the relevant Cypress tests.
- Homepage/component changes: run `yarn test` and consider `yarn build`.
- Link, navbar, footer, sidebar, image, or URL changes: run `yarn test-integration` or the relevant Cypress spec through `yarn cy:run`.
- Config or deployment changes: run `yarn build` and inspect `netlify.toml`/`docusaurus.config.js` carefully.

Cypress tests intentionally duplicate page titles, sidebar labels, URLs, and required headings. When editing those strings in docs or config, update the corresponding test data in `cypress/e2e/` in the same change.

## Style And Content

- Keep examples concrete and aligned with real `console-table-printer` APIs.
- Prefer JavaScript or TypeScript examples that users can paste with minimal surrounding code.
- Use consistent import style: `import { Table, printTable, renderTable } from 'console-table-printer';` as appropriate.
- Do not document behavior only in screenshots; include a short explanation and code.
- Avoid inventing options or aliases that are not present in the library.
- Keep page titles and headings descriptive because they are used by Cypress tests and by users scanning the sidebar.
- Use ASCII in new text unless the page specifically demonstrates console borders, emoji, or non-ASCII output.

## Before Finishing A Change

For small documentation edits, inspect the Markdown and run no command only when there are no imports, links, images, or sidebar changes.

For new pages, sidebars, links, images, homepage changes, or API reference rewrites, usually run:

```bash
yarn build
yarn test
```

For navigation-sensitive changes, also run:

```bash
yarn test-integration
```

If tests are not run, say so in the handoff and identify the highest-risk unchecked area.
