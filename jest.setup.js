import React from 'react';
import '@testing-library/jest-dom';

// Mock Docusaurus hooks and utilities
jest.mock('@docusaurus/Link', () => ({
  __esModule: true,
  default: jest.fn(({ to, children }) => <a href={to}>{children}</a>),
}));

jest.mock('@docusaurus/useBaseUrl', () => ({
  __esModule: true,
  default: jest.fn((url) => url),
}));

jest.mock('@docusaurus/theme-common', () => ({
  useColorMode: jest.fn(() => ({
    colorMode: 'light',
    setColorMode: jest.fn(),
  })),
})); 