import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: 'rgb(50, 120, 230)',
  },
};

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render }; 