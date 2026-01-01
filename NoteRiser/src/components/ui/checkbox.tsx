import React from 'react';

export const Checkbox: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <input type="checkbox" {...props} />;
};

export default Checkbox;
