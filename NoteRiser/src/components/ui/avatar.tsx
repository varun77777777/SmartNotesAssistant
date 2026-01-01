import React from 'react';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & { size?: number };

export const Avatar: React.FC<Props> = ({ size = 32, style, ...props }) => {
  return (
    <img
      alt={props.alt ?? 'avatar'}
      width={size}
      height={size}
      style={{ borderRadius: '50%', objectFit: 'cover', ...style }}
      {...props}
    />
  );
};

export default Avatar;
