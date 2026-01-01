import React from 'react';

export const Skeleton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => (
  <div {...props} style={{ background: '#eee' }}> </div>
);

export default Skeleton;
