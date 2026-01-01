import React from 'react';

type Props = React.PropsWithChildren<{}>;

export const Accordion: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default Accordion;
