import React from 'react';

type Props = React.PropsWithChildren<{}>;

export const ContextMenu: React.FC<Props> = ({ children }) => {
  return <div role="menu">{children}</div>;
};

export default ContextMenu;
