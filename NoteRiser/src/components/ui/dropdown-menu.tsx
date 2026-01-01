import React from 'react';

type Props = React.PropsWithChildren<{}>;

export const DropdownMenu: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default DropdownMenu;
