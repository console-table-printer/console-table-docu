import React from 'react';

export default function Link({ to, children, ...props }) {
  return (
    <a href={to} data-testid="docusaurus-link" {...props}>
      {children}
    </a>
  );
} 