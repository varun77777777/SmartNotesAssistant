import React from 'react';

type Props = React.PropsWithChildren<{}>;

export const Dialog: React.FC<Props> = ({ children }) => {
  return <div role="dialog">{children}</div>;
};

export default Dialog;
