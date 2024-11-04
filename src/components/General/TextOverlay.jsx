import { useTransition } from "../../contexts/transitionContext";

const TextOverlay = ({ children, textColor, textPosition, className, onMouseEnter, onMouseLeave, cursorVisible, href }) => {
  const positionClasses = textPosition === 'center'
    ? 'position--top-50 position--left-50 translate--middle'
    : 'position--bottom-0 position--left-50 translate--middle-x';
  
    const { handleLinkClick } = useTransition();

  
  return (
    <div 
      onMouseEnter={onMouseEnter} 
      onMouseLeave={onMouseLeave} 
      className={`text-overlay position--absolute text__overlay-animated ${positionClasses} ${textColor} ${className}`}
      onClick={() => href && handleLinkClick(href)}  // Only relevant if Wrapper is 'a'
      style={{ cursor: cursorVisible ? 'pointer' : undefined }}  // Optionally control cursor appearance
    >
      {children}
    </div>
  );
};

export default TextOverlay;
