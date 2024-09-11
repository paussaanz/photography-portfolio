import React, { forwardRef } from 'react';

const TextAnimation = forwardRef(({ children, className, textColor = "text-primary" }, ref) => {
  return (
    <div className={`text-container ${className = ''}`}>
      <div ref={ref} className={`split-word fs-2 fw-light text-center ${textColor} text-uppercase`}>
        {children}
      </div>
    </div>
  );
});

export default TextAnimation;
