import React from 'react';

export const Menubar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return <div role="menubar" {...props}>{children}</div>;
};

export default Menubar;
