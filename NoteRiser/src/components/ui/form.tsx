import React from 'react';

export const Form: React.FC<React.FormHTMLAttributes<HTMLFormElement>> = ({ children, ...props }) => {
  return (
    <form {...props}>
      {children}
    </form>
  );
};

export default Form;
