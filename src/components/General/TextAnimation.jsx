import React, { forwardRef } from 'react';

const TextAnimation = forwardRef(({ children, className }, ref) => {
  return (
    <div className={`text-container ${className = ''}`}>
      <div ref={ref} className="split-word fs-2 fw-light text-center text-primary text-uppercase">
        {children}
      </div>
    </div>
  );
});

export default TextAnimation;
