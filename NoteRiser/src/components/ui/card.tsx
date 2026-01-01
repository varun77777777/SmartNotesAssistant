import React from 'react';

type Props = React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>;

export const Card: React.FC<Props> = ({ children, ...props }) => {
  return (
    <div {...props} style={{ borderRadius: 8, padding: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      {children}
    </div>
  );
};

export default Card;
