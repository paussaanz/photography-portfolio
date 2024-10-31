const TextOverlay = ({ children, textColor, textPosition, className, onMouseEnter, onMouseLeave, cursorVisible }) => {
  const positionClasses = textPosition === 'center'
    ? 'position--top-50 position--left-50 translate--middle'
    : 'position--bottom-0 position--left-50 translate--middle-x';

  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} className={`text-overlay position--absolute overlay__text-animated ${positionClasses} ${textColor} ${className}`}>
      {children}
    </div>
  );
};

export default TextOverlay;
