import React from 'react';

export const Switch: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input type="checkbox" role="switch" {...props} />
);

export default Switch;
