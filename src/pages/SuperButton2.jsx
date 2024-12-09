import { useRef, useState, useEffect } from 'react';
import './SuperButton.scss';
import { motion, transform } from 'framer-motion';
import { button } from 'framer-motion/client';

const SuperButton = ({ width, text, height, link, children }) => {
  const buttonRef = useRef(null);
  const [buttonSize, setButtonSize] = useState({ width: 0, height: 0 });
  const [hoverStyle, setHoverStyle] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const [hoverDirection, setHoverDirection] = useState('');

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

      const direction = getHoverDirection(x, y, rect.width, rect.height + 30);
      setHoverStyle(getHoverStartPosition(direction, rect));
    }
  };

  const handleMouseLeave = (e) => {
    setIsHovered(false);
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const direction = getHoverDirection(x, y, rect.width, rect.height + 30);
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
    setHoverDirection(direction)
    const heightGap = rect.height / 3; // Añadimos un gap para cubrir mejor el botón

    switch (direction) {
      case 'top':
        return {
          top: `-${rect.height + heightGap}px`,
          left: '0',
          width: `${rect.width}px`,
          height: `${rect.height + heightGap}px`,
          clipPath: `path('M0 0 H${rect.width} V${(rect.height + heightGap) * 0.85} Q${rect.width / 2} ${rect.height + heightGap} 0 ${(rect.height + heightGap) * 0.85} Z')`,
        };
      case 'bottom':
        return {
          top: `${rect.height}px`,
          left: '0',
          width: `${rect.width}px`,
          height: `${rect.height + heightGap}px`,
          // Curva en la parte superior
          clipPath: `path('M0 ${heightGap} Q${rect.width / 2} 0 ${rect.width} ${heightGap} V${rect.height + heightGap} H0 Z')`,
        };
      case 'left':
        return {
          top: `-${heightGap / 2}px`,
          left: `-${rect.width}px`,
          width: `${rect.width}px`,
          height: `${rect.height + heightGap}px`,
          borderRadius: 60,
        };
      case 'right':
        return {
          top: `-${heightGap / 2}px`,
          left: `${rect.width}px`,
          width: `${rect.width}px`,
          height: `${rect.height + heightGap}px`,
          borderRadius: 60,
        };
      default:
        return {};
    }
  };


  const getHoverEndPosition = (direction, rect) => {
    setHoverDirection(direction)

    const heightGap = rect.height / 3; // Añadimos un gap para cubrir mejor el botón

    switch (direction) {
      case 'top':
        return {
          top: `-${rect.height + heightGap}px`,
          left: '0',
          width: `${rect.width}px`,
          height: `${rect.height + heightGap}px`,
          clipPath: `path('M0 0 H${rect.width} V${(rect.height + heightGap) * 0.85} Q${rect.width / 2}  ${heightGap * 2} 0 ${(rect.height + heightGap) * 0.85} Z')`,
        };
      case 'bottom':
        return { top: `${rect.height}px`, left: '0', width: `${rect.width}px`, height: `${rect.height + heightGap}px` };
      case 'left':
        return { top: `0px`, left: `-${rect.width}px`, width: `${rect.width}px`, height: `${rect.height + heightGap}px` };
      case 'right':
        return { top: `0px`, left: `${rect.width}px`, width: `${rect.width}px`, height: `${rect.height + heightGap}px` };
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
          initial={isHovered ? hoverStyle : {
            top: '0', left: '0',
            clipPath: `path('M0 0 H${buttonSize.width} V${buttonSize.height} Q${buttonSize.width / 2} ${buttonSize.height} 0 ${buttonSize.height} Z')`,
          }}
          animate={isHovered ? {
            top: hoverDirection === 'top'
              ? '0'
              : hoverDirection === 'bottom'
                ? -(buttonSize.height / 3)
                : -(buttonSize.height / 3) / 2,

            left: '0'
          } : hoverStyle}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 0,
          }}
        />
        {text || children}
      </a>
    </div>
  );
};

export default SuperButton;
