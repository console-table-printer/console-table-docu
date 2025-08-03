import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Console Table Printer',
  tagline: 'A tool to print colorful table on your console',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://console-table.netlify.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'console-table-printer', // Usually your GitHub org/user name.
  projectName: 'console-table-docu', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          sidebarCollapsible: false,
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
          ],
          // this enabled the edit button for documentation
          editUrl: 'https://github.com/console-table-printer/console-table-docu/blob/master/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/logo.svg',
    announcementBar: {
      id: 'support',
      content:
        '⭐️ If you like Console Table Printer, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/console-table-printer/console-table-printer">GitHub</a>! ⭐️',
    },
    navbar: {
      title: 'Console Table Printer',
      logo: {
        alt: 'Console Table Printer',
        src: 'img/logo.ico',
      },
      items: [
        {
          href: 'https://github.com/console-table-printer/console-table-printer',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://www.npmjs.com/package/console-table-printer',
          label: 'npmjs',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
          items: [
            {
              label: 'Quick Start',
              to: 'docs',
            },
            {
              label: 'Getting Started With CLI',
              to: 'docs/doc-cli-install-quick-start',
            },
          ],
        },
        {
          title: 'Decorate',
          items: [
            {
              label: 'Color',
              to: 'docs/doc-color',
            },
            {
              label: 'Border',
              to: 'docs/doc-border-design',
            },
            {
              label: 'Alignment',
              to: 'docs/doc-alignment',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/console-table-printer/console-table-printer',
            },
            {
              label: 'Npmjs',
              href: 'https://www.npmjs.com/package/console-table-printer',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Nahiyan Kamal under MIT License. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;