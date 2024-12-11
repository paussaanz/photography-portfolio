import { useRef, useState, useEffect } from 'react';
import './SuperButton.scss';
import { motion } from 'framer-motion';
import { image } from 'framer-motion/client';

const SuperButton = ({ width, text, height, link, children }) => {
  const buttonRef = useRef(null);
  const hoverRef = useRef(null);
  const [buttonSize, setButtonSize] = useState({ width: 0, height: 0 });
  const [hoverStyle, setHoverStyle] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const [hoverDirection, setHoverDirection] = useState('');


  const getBackgroundImage = () => {
    const state = isHovered ? 'entering' : 'exiting';
    const imageName = `superbutton-${hoverDirection}-${state}.png`;
    console.log(imageName);
    return `/images/${imageName}`;
  };


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
      setHoverDirection(direction);
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
      setHoverDirection(direction);
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
    console.log(hoverRefWidth, hoverRefHeight, rect.width, rect.height);
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
    console.log(hoverRefWidth, hoverRefHeight);
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
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: '120%',
            height: '160%',
            zIndex: 0,
            backgroundImage: `url(${getBackgroundImage()})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {text || children}
      </a>
    </div>
  );
};

export default SuperButton;
