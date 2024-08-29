import React from 'react';

const TextOverlay = ({ children, textColor, textPosition }) => {
  return (
    <div className={`text-overlay position-absolute top-50 start-50 translate-middle ${textPosition} ${textColor}`}>
      {children}
    </div>
  );
};

export default TextOverlay;
