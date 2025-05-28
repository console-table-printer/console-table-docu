import React from 'react';

export default function Layout({ children, title, description }) {
  return (
    <div data-testid="layout" data-title={title} data-description={description}>
      {children}
    </div>
  );
} 