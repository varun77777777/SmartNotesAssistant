import React from 'react';

type Props = React.PropsWithChildren<{}>;

export const Alert: React.FC<Props> = ({ children }) => {
  return <div role="alert">{children}</div>;
};

export default Alert;
