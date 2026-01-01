import React from 'react';

type Props = React.PropsWithChildren<{}>;

export const Calendar: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default Calendar;
