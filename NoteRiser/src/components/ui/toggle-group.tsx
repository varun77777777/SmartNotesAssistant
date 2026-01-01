import React from 'react';

export const ToggleGroup: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div role="group" {...props}>{children}</div>
);

export default ToggleGroup;
