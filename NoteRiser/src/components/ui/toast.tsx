import React from 'react';

export const Toast: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => (
  <div role="status" {...props}>{children}</div>
);

export default Toast;
