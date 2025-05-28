import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageHeadLine from '../index';

// Mock the styled-components to prevent styling-related issues in tests
jest.mock('../styles', () => ({
  ColoredWords: ({ children }) => <span data-testid="colored-words">{children}</span>,
  GetStartButton: ({ children }) => <div data-testid="get-start-button">{children}</div>,
  Headline: ({ children }) => <div data-testid="headline">{children}</div>,
  HeadlineSub: ({ children }) => <div data-testid="headline-sub">{children}</div>,
  HeadlineText: ({ children }) => <div data-testid="headline-text">{children}</div>,
  ProductLogoHomePage: (props) => <img data-testid="product-logo" {...props} />,
}));

describe('PageHeadLine', () => {
  it('renders all text elements correctly', () => {
    render(<PageHeadLine />);
    
    // Check for text content
    expect(screen.getByText('Print')).toBeInTheDocument();
    expect(screen.getByText('colorful Tables')).toBeInTheDocument();
    expect(screen.getByText('on Console, directly from')).toBeInTheDocument();
    expect(screen.getByText('JSON string')).toBeInTheDocument();
  });

  it('renders the logo with correct props', () => {
    render(<PageHeadLine />);
    
    const logo = screen.getByTestId('product-logo');
    expect(logo).toHaveAttribute('alt', 'CTP Logo');
    expect(logo).toHaveAttribute('src', 'img/logo.ico');
  });

  it('renders the get started button with correct link', () => {
    render(<PageHeadLine />);
    
    const link = screen.getByText('GET STARTED');
    expect(link).toHaveAttribute('href', 'docs');
  });

  it('renders all structural components', () => {
    render(<PageHeadLine />);
    
    expect(screen.getByTestId('headline')).toBeInTheDocument();
    expect(screen.getByTestId('headline-sub')).toBeInTheDocument();
    expect(screen.getByTestId('headline-text')).toBeInTheDocument();
    expect(screen.getByTestId('get-start-button')).toBeInTheDocument();
  });
}); 