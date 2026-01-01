import React from 'react';

type Props = React.PropsWithChildren<{ ratio?: number }>;

export const AspectRatio: React.FC<Props> = ({ children, ratio = 16 / 9 }) => {
  const padding = `${100 / ratio}%`;
  return (
    <div style={{ position: 'relative', width: '100%', paddingTop: padding }}>
      <div style={{ position: 'absolute', inset: 0 }}>{children}</div>
    </div>
  );
};

export default AspectRatio;
