import React from 'react';

export const Toggle: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
  <button aria-pressed={props['aria-pressed'] ?? false} {...props} />
);

export default Toggle;
