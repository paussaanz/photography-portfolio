import React from 'react';

const TextOverlay = ({ children, textColor, textPosition, className }) => {
  return (
    <div className={`text-overlay position-absolute top-50 start-50 translate-middle ${textPosition} ${textColor} ${className}`}>
      {children}
    </div>
  );
};

export default TextOverlay;
