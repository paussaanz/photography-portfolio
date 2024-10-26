import React, { forwardRef } from 'react';

const TextAnimation = forwardRef(({ children, className, textColor = "text-color--primary" }, ref) => {
  return (
    <div className={`text-container ${className = ''}`}>
      <div ref={ref} className={`split-word fs-2 fw-light text-align--center ${textColor} text-transform--uppercase`}>
        {children}
      </div>
    </div>
  );
});

export default TextAnimation;
