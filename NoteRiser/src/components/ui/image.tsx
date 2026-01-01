import React from 'react';
import './image.css';

export const Image: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  return <img className="responsive-image" {...props} />;
};

export default Image;
