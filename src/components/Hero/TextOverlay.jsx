import React from 'react';

const TextOverlay = ({ children, textColor }) => {
  return (
    <div className={`text-overlay ${textColor}`}>
      {children}
    </div>
  );
};

export default TextOverlay;
