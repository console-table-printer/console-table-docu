import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../index';

// Mock the Docusaurus hooks and components
jest.mock('@docusaurus/useDocusaurusContext', () => () => ({
  siteConfig: {
    title: 'Test Title',
    tagline: 'Test Tagline',
  },
}));

jest.mock('@theme/Layout', () => ({
  __esModule: true,
  default: ({ children, title, description }) => (
    <div data-testid="layout" data-title={title} data-description={description}>
      {children}
    </div>
  ),
}));

// Mock our components
jest.mock('../../components/PageHeadLine', () => ({
  __esModule: true,
  default: () => <div data-testid="page-headline">Mock PageHeadLine</div>,
}));

jest.mock('../../components/Sources', () => ({
  __esModule: true,
  default: () => <div data-testid="sources">Mock Sources</div>,
}));

describe('Home', () => {
  it('renders with correct layout props', () => {
    const { getByTestId } = render(<Home />);
    const layout = getByTestId('layout');
    
    expect(layout).toHaveAttribute('data-title', 'Test Title');
    expect(layout).toHaveAttribute('data-description', 'Test Tagline');
  });

  it('renders all main components', () => {
    const { getByTestId } = render(<Home />);
    
    expect(getByTestId('page-headline')).toBeInTheDocument();
    expect(getByTestId('sources')).toBeInTheDocument();
  });

  it('renders components in correct order', () => {
    const { container } = render(<Home />);
    const main = container.querySelector('main');
    
    expect(main).toBeInTheDocument();
    expect(main?.children[0]).toHaveAttribute('data-testid', 'page-headline');
    expect(main?.children[1]).toHaveAttribute('data-testid', 'sources');
  });
}); 