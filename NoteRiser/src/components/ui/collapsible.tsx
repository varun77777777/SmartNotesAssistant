import React from 'react';

type Props = React.PropsWithChildren<{ open?: boolean }>;

export const Collapsible: React.FC<Props> = ({ children, open = false }) => {
  return (
    <div aria-hidden={!open} style={{ display: open ? 'block' : 'none' }}>
      {children}
    </div>
  );
};

export default Collapsible;
