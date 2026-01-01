import React from 'react';

type Props = { children: React.ReactNode };

export const MemberProtectedRoute: React.FC<Props> = ({ children }) => {
  // placeholder: integrate auth logic as needed
  return <>{children}</>;
};

export default MemberProtectedRoute;
