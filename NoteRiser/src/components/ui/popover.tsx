import React from 'react';

type Props = React.PropsWithChildren<{ open?: boolean }>;

export const Popover: React.FC<Props> = ({ children, open = false }) => (
  <div aria-hidden={!open}>{children}</div>
);

export default Popover;
