const TextOverlay = ({ children, textColor, textPosition, className }) => {
  const positionClasses = textPosition === 'center'
    ? 'position--top-50 position--left-50 translate--middle'
    : 'position--bottom-0 position--left-50 translate--middle-x';

  return (
    <div className={`text-overlay position--absolute ${positionClasses} ${textColor} ${className}`}>
      {children}
    </div>
  );
};

export default TextOverlay;
