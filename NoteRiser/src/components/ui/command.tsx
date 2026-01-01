import React from 'react';

type Props = React.PropsWithChildren<{}>;

export const Command: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default Command;
