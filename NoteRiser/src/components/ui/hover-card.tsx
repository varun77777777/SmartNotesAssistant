import React from 'react';

type Props = React.PropsWithChildren<{}>;

export const HoverCard: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default HoverCard;
