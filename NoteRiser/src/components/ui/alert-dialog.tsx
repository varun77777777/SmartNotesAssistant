import React from 'react';

type Props = React.PropsWithChildren<{}>;

export const AlertDialog: React.FC<Props> = ({ children }) => {
  return <div role="alertdialog">{children}</div>;
};

export default AlertDialog;
