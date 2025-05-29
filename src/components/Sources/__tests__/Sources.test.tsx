import React from 'react';
import { render, screen } from '../../../test-utils/test-utils';
import '@testing-library/jest-dom';
import Sources from '..';
import sourcesData from '../../../utils/sources';

describe('Sources', () => {
  it('renders all features correctly', () => {
    render(<Sources />);
    expect(screen.getByText('Light and Fast')).toBeInTheDocument();
    expect(screen.getByText('Free')).toBeInTheDocument();
    expect(screen.getByText('Typed')).toBeInTheDocument();
  });

  it('renders feature descriptions', () => {
    render(<Sources />);
    expect(screen.getByText(/It contains very minimal dependencies/i)).toBeInTheDocument();
    expect(screen.getByText(/Console Table Printer is free and open source/i)).toBeInTheDocument();
    expect(screen.getByText(/Use it happily with typescript and Javascript/i)).toBeInTheDocument();
  });

  it('renders feature images with correct attributes', () => {
    render(<Sources />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
    expect(images[0]).toHaveAttribute('src', 'img/undraw_floating_61u6.svg');
    expect(images[1]).toHaveAttribute('src', 'img/undraw_gift1_sgf8.svg');
    expect(images[2]).toHaveAttribute('src', 'img/undraw_powerful_26ry.svg');
  });

  it('renders features in correct order', () => {
    render(<Sources />);
    const titles = ['Light and Fast', 'Free', 'Typed'];
    const headings = screen.getAllByRole('heading', { level: 3 });
    headings.forEach((heading, index) => {
      expect(heading).toHaveTextContent(titles[index]);
    });
  });

  it('renders correct number of features', () => {
    render(<Sources />);
    const features = sourcesData;
    const columns = screen.getAllByRole('heading', { level: 3 });
    expect(columns).toHaveLength(features.length);
  });

  it('has accessible images', () => {
    render(<Sources />);
    const images = screen.getAllByRole('img');
    images.forEach((image) => {
      const img = image as HTMLImageElement;
      expect(typeof img.alt).toBe('string');
    });
  });
}); 