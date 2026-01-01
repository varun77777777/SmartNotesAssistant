import React from 'react';

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => {
  return <select {...props} />;
};

export default Select;
