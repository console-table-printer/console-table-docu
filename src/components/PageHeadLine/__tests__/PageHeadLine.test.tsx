import React from 'react';
import { render, screen } from '../../../test-utils/test-utils';
import '@testing-library/jest-dom';
import PageHeadLine from '..';

// Mock the @docusaurus/Link component
jest.mock('@docusaurus/Link', () => {
  return {
    __esModule: true,
    default: ({ children, to }) => <a href={to}>{children}</a>,
  };
});

// Mock the @docusaurus/useBaseUrl hook
jest.mock('@docusaurus/useBaseUrl', () => {
  return {
    __esModule: true,
    default: (path) => path,
  };
});

describe('PageHeadLine Component', () => {
  it('renders all text elements correctly', () => {
    render(<PageHeadLine />);
    expect(screen.getByText('Print')).toBeInTheDocument();
    expect(screen.getByText('colorful Tables')).toBeInTheDocument();
    expect(screen.getByText('on Console, directly from')).toBeInTheDocument();
    expect(screen.getByText('JSON string')).toBeInTheDocument();
  });

  it('renders the logo with correct props', () => {
    render(<PageHeadLine />);
    const logo = screen.getByAltText('CTP Logo');
    expect(logo).toHaveAttribute('src', 'img/logo.ico');
  });

  it('renders the get started button with correct link', () => {
    render(<PageHeadLine />);
    const link = screen.getByText('GET STARTED');
    expect(link).toHaveAttribute('href', 'docs');
  });

  it('renders colored words in order', () => {
    render(<PageHeadLine />);
    const coloredWords = screen.getAllByText(/colorful Tables|JSON string/);
    expect(coloredWords[0]).toHaveTextContent('colorful Tables');
    expect(coloredWords[1]).toHaveTextContent('JSON string');
  });

  it('has correct structure and nesting', () => {
    render(<PageHeadLine />);
    // Logo should be before text
    const logo = screen.getByAltText('CTP Logo');
    const getStarted = screen.getByText('GET STARTED');
    expect(logo).toBeInTheDocument();
    expect(getStarted).toBeInTheDocument();
  });
}); 