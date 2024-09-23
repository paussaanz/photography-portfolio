const TextOverlay = ({ children, textColor, textPosition, className }) => {
  const positionClasses = textPosition === 'center'
    ? 'top-50 start-50 translate-middle'
    : 'bottom-0 start-50 translate-middle-x';

  return (
    <div className={`text-overlay position-absolute ${positionClasses} ${textColor} ${className}`}>
      {children}
    </div>
  );
};

export default TextOverlay;
