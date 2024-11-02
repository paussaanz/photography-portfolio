const TextOverlay = ({ children, textColor, textPosition, className, onMouseEnter, onMouseLeave, cursorVisible, href }) => {
  const positionClasses = textPosition === 'center'
    ? 'position--top-50 position--left-50 translate--middle'
    : 'position--bottom-0 position--left-50 translate--middle-x';
  
  const Wrapper = href ? 'a' : 'div';  // Determine the wrapper type based on the presence of 'href'
  
  return (
    <Wrapper 
      onMouseEnter={onMouseEnter} 
      onMouseLeave={onMouseLeave} 
      className={`text-overlay position--absolute text__overlay-animated ${positionClasses} ${textColor} ${className}`}
      href={href}  // Only relevant if Wrapper is 'a'
      style={{ cursor: cursorVisible ? 'pointer' : undefined }}  // Optionally control cursor appearance
    >
      {children}
    </Wrapper>
  );
};

export default TextOverlay;
