import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sources from '../index';
import * as sourcesModule from '../../../utils/sources';

// Mock the styled-components
jest.mock('../styles', () => ({
  FeatureImage: ({ src, alt }) => <img data-testid="feature-image" src={src} alt={alt} />,
  Features: ({ children }) => <div data-testid="features-container">{children}</div>,
}));

describe('Sources', () => {
  it('renders all features correctly', () => {
    render(<Sources />);
    
    // Check if all source titles are rendered
    sourcesModule.default.forEach(source => {
      // Convert React element to string for matching
      const titleText = source.title.props?.children || source.title;
      expect(screen.getByText(titleText)).toBeInTheDocument();
    });

    // Check if all descriptions are rendered
    sourcesModule.default.forEach(source => {
      // Convert React element to string for matching
      const descText = source.description.props?.children || source.description;
      expect(screen.getByText(descText)).toBeInTheDocument();
    });

    // Check if all images are rendered with correct props
    const images = screen.getAllByTestId('feature-image');
    expect(images).toHaveLength(sourcesModule.default.length);
    
    images.forEach((image, index) => {
      expect(image).toHaveAttribute('src', sourcesModule.default[index].imageUrl);
    });
  });

  it('renders with correct layout structure', () => {
    render(<Sources />);
    
    expect(screen.getByTestId('features-container')).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(sourcesModule.default.length);
    expect(screen.getAllByTestId('feature-image')).toHaveLength(sourcesModule.default.length);
  });

  it('renders each feature in a column layout', () => {
    render(<Sources />);
    
    const columns = document.querySelectorAll('.col.col--4');
    expect(columns).toHaveLength(sourcesModule.default.length);
  });
}); 