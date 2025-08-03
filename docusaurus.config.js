
module.exports = {
  title: "Console Table Printer", // Title for your website.
  tagline: "A tool to print colorful table on your console",
  url: "https://console-table.netlify.app", // Your website URL
  baseUrl: "/", // Base URL for your project */

  favicon: "img/favicon.ico",
  organizationName: "Console Styles", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.
  themeConfig: {
    announcementBar: {
      id: "support",
      content:
        '⭐️ If you like Console Table Printer, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/console-table-printer/console-table-printer">GitHub</a>! ⭐️',
    },
    navbar: {
      title: "Console Table Printer",
      logo: {
        alt: "CTP",
        src: "img/logo.ico",
      },
      items: [
        {
          href: "https://github.com/console-table-printer/console-table-printer",
          label: "GitHub",
          position: "right",
        },
        {
          href: "https://www.npmjs.com/package/console-table-printer",
          label: "npmjs",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Learn",
          items: [
            {
              label: "Quick Start",
              to: "docs",
            },
            {
              label: "Getting Started With CLI",
              to: "docs/doc-cli-install-quick-start",
            },
          ],
        },
        {
          title: "Decorate",
          items: [
            {
              label: "Color",
              to: "docs/doc-color",
            },
            {
              label: "Border",
              to: "docs/doc-border-design",
            },
            {
              label: "Alignment",
              to: "docs/doc-alignment",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/console-table-printer/console-table-printer",
            },
            {
              label: "Npmjs",
              href: "https://www.npmjs.com/package/console-table-printer",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Nahiyan Kamal under MIT License. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          path: "docs",
          sidebarPath: require.resolve("./sidebars.js"),
          sidebarCollapsible: false,
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), {sync: true}],
          ],
          // this enabled the edit button for documentation
          editUrl:
            "https://github.com/console-table-printer/console-table-docu/blob/master/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
