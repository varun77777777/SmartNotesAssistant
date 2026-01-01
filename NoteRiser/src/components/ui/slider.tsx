import React from 'react';

export const Slider: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input type="range" {...props} />
);

export default Slider;
