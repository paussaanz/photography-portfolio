import { useRef, useState, useEffect } from 'react';
import './SuperButton.scss';
import { motion } from 'framer-motion';

const SuperButton = ({ width = 400, text, height = 100, link, children }) => {
  const buttonRef = useRef(null);
  const hoverRef = useRef(null);
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
    const hoverRefWidth = hoverRef.current.clientWidth;
    const hoverRefHeight = hoverRef.current.clientHeight;

    switch (direction) {
      case 'top':
        return { top: `-${hoverRefHeight}px`, left: `-${(hoverRefWidth - rect.width) / 2}px` };
      case 'bottom':
        return { top: `${hoverRefHeight}px`, left: `-${(hoverRefWidth - rect.width) / 2}px` };
      case 'left':
        return { top: `-${(hoverRef.current?.clientHeight - buttonSize.height) / 2}px`, left: `-${hoverRefWidth}px` };
      case 'right':
        return { top: `-${(hoverRef.current?.clientHeight - buttonSize.height) / 2}px`, left: `${hoverRefWidth}px` };
      default:
        return {};
    }
  };

  const getHoverEndPosition = (direction, rect) => {
    const hoverRefWidth = hoverRef.current.clientWidth;
    const hoverRefHeight = hoverRef.current.clientHeight;

    switch (direction) {
      case 'top':
        return { top: `-${hoverRefHeight}px`, left: `-${(hoverRefWidth - rect.width) / 2}px` };
      case 'bottom':
        return { top: `${rect.height}px`, left: `-${(hoverRefWidth - rect.width) / 2}px` };
      case 'left':
        return { top: `-${(hoverRef.current?.clientHeight - buttonSize.height) / 2}px`, left: `-${hoverRefWidth}px` };
      case 'right':
        return { top: `-${(hoverRef.current?.clientHeight - buttonSize.height) / 2}px`, left: `${rect.width}px` };
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
          ref={hoverRef}
          key={isHovered}
          className="hover-element"
          initial={isHovered ? hoverStyle :
            {
              top: `-${(hoverRef.current?.clientHeight - buttonSize.height) / 2}px`,
              left: `-${(hoverRef.current?.clientWidth - buttonSize.width) / 2}px`
            }}
          animate={isHovered ?
            {
              top: `-${(hoverRef.current?.clientHeight - buttonSize.height) / 2}px`,
              left: `-${(hoverRef.current?.clientWidth - buttonSize.width) / 2}px`
            }
            : hoverStyle}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: '120%',
            height: '160%',
            zIndex: 0,
          }}
        />
        {text || children}
      </a>
    </div>
  );
};

export default SuperButton;
