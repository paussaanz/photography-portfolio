import { useRef, useState, useEffect } from 'react';
import './SuperButton.scss';
import { motion } from 'framer-motion';

const SuperButton = ({ width = 400, text, height = 100, link, children }) => {
  const buttonRef = useRef(null);
  const [buttonSize, setButtonSize] = useState({ width: 0, height: 0 });
  const [hoverStyle, setHoverStyle] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (buttonRef.current) {
      const { clientWidth, clientHeight } = buttonRef.current;
      setButtonSize({
        width: clientWidth,
        height: clientHeight,
      });
    }
  }, [text, width, height]);

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const direction = getHoverDirection(x, y, rect.width, rect.height);
      setHoverStyle(getHoverStartPosition(direction, rect));
    }
  };

  const handleMouseLeave = (e) => {
    setIsHovered(false);
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const direction = getHoverDirection(x, y, rect.width, rect.height);
      setHoverStyle(getHoverEndPosition(direction, rect));
    }
  };

  const getHoverDirection = (x, y, width, height) => {
    const topDistance = y;
    const bottomDistance = height - y;
    const leftDistance = x;
    const rightDistance = width - x;

    const minDistance = Math.min(topDistance, bottomDistance, leftDistance, rightDistance);

    if (minDistance === topDistance) return 'top';
    if (minDistance === bottomDistance) return 'bottom';
    if (minDistance === leftDistance) return 'left';
    if (minDistance === rightDistance) return 'right';
  };

  const getHoverStartPosition = (direction, rect) => {
    switch (direction) {
      case 'top':
        return { top: `-${rect.height}px`, left: '0' };
      case 'bottom':
        return { top: `${rect.height}px`, left: '0' };
      case 'left':
        return { top: '0', left: `-${rect.width}px` };
      case 'right':
        return { top: '0', left: `${rect.width}px` };
      default:
        return {};
    }
  };

  const getHoverEndPosition = (direction, rect) => {
    switch (direction) {
      case 'top':
        return { top: `-${rect.height}px`, left: '0' };
      case 'bottom':
        return { top: `${rect.height}px`, left: '0' };
      case 'left':
        return { top: '0', left: `-${rect.width}px` };
      case 'right':
        return { top: '0', left: `${rect.width}px` };
      default:
        return {};
    }
  };

  return (
    <div
      className="super-button"
      ref={buttonRef}
      style={{
        width: width || 'auto',
        height: height || 'auto',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a href={link || '#'}>
        <motion.div
          key={isHovered}
          className="hover-element"
          initial={isHovered ? hoverStyle : { top: '0', left: '0' }}
          animate={isHovered ? { top: '0', left: '0' } : hoverStyle}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: '120%',
            height: '120%',
            zIndex: 0,
          }}
        />
        {text || children}
      </a>
    </div>
  );
};

export default SuperButton;
