import React from 'react';

export const RadioGroup: React.FC<React.FieldsetHTMLAttributes<HTMLFieldSetElement>> = ({ children, ...props }) => {
  return <fieldset {...props}>{children}</fieldset>;
};

export default RadioGroup;
