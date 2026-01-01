import React from 'react';

type Props = React.PropsWithChildren<React.HTMLAttributes<HTMLSpanElement>>;

export const Badge: React.FC<Props> = ({ children, ...props }) => {
  return (
    <span {...props} style={{ display: 'inline-block', padding: '0.125rem 0.5rem', borderRadius: 9999, fontSize: '0.75rem' }}>
      {children}
    </span>
  );
};

export default Badge;
