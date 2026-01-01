import React from 'react';

export const ScrollArea: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div style={{ overflow: 'auto' }} {...props}>{children}</div>
);

export default ScrollArea;
