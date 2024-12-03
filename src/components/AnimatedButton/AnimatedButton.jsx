import { useRef, useState, useEffect } from 'react';
import './AnimatedButton.scss';

const generateKeyframes = (width, height, uniqueId) => {
  const curveOffset = height * 0.8;

  return `
    @keyframes morph-in-top-${uniqueId} {
      0% {
        d: path(
        
          "M -10 ${height} V 0 Q ${width / 2} 0 ${width} 0 V 0 H 0 Z"
        );
      }
      100% {
        d: path(
          "M -10 ${height} V ${height} Q ${width / 2} ${height + curveOffset * 5} ${width} ${height} V 0 H 0 Z"
        );
      }
    }

    @keyframes morph-in-bottom-${uniqueId} {
      0% {
        d: path(
          "M -10 ${height} V ${height} Q ${width} ${width * 1.5} ${width} ${width * 1.5} V ${height} Q ${width / 2} 0 0 ${height} H 0 Z"
        );
      }
      100% {
        d: path(
          "M -10 ${height} V ${height} Q ${width} ${width * 1.5} ${width} ${width * 1.5} V 0 Q ${width / 2} 0 0 0 H 0 Z"
        );
      }
    }

    @keyframes morph-in-left-${uniqueId} {
      0% {
        d: path(
          "M ${width} 0 Q ${width - curveOffset} ${height / 2} ${width} ${height} L ${width} ${height} V 0 L ${width / 5}  0 Z"
        );
      }
      100% {
        d: path(
          "M -10 0 Q 0 ${height / 2} 0 ${height} L ${width} ${height} V 0 L ${width / 5} 0 Z"
        );
      }
    }

    @keyframes morph-in-right-${uniqueId} {
      0% {
        d: path(
          "M -10 0 Q ${curveOffset} ${height / 2} 0 ${height} L 0 ${height} V 0 L ${width - curveOffset} 0 Z"
        );
      }
      100% {
        d: path(
          "M ${width} 0 Q ${width} ${height / 2} ${width} ${height} L 0 ${height} V 0 L ${width - curveOffset} 0 Z"
        );
      }
    }

    /* Animaciones de salida */
    @keyframes morph-out-top-${uniqueId} {
      0% {
        d: path(
          "M -10 ${height} V ${height} Q ${width / 2} ${curveOffset / 5} ${width} ${height} V 0 H 0 Z"
        );
      }
      100% {
        d: path(
          "M -10 ${height} V 0 Q ${width / 2} 0 ${width} 0 V 0 H 0 Z"
        );
      }
    }

    @keyframes morph-out-bottom-${uniqueId} {
      0% {
        d: path(
          "M -10 ${height} V ${height} Q ${width / 2} ${height} ${width} ${height} V 0 Q 60 0 0 0 H 0 Z"
        );
      }
      100% {
        d: path(
          "M -10 ${height} V ${height} Q ${width / 2} ${height} ${width} ${height} V ${height} Q ${width / 2} ${height + 60} 0 ${height} H 0 Z"
        );
      }
    }

    @keyframes morph-out-left-${uniqueId} {
      0% {
        d: path(
          "M -10 0 Q ${curveOffset} ${height / 2} 0 ${height} L ${width} ${height} V 0 L ${width / 5} 0 Z"
        );
      }
      100% {
        d: path(
          "M ${width} 0 Q ${width} ${height / 2} ${width} ${height} L ${width} ${height} V 0 L ${width / 5} 0 Z"
        );
      }
    }

    @keyframes morph-out-right-${uniqueId} {
      0% {
        d: path(
          "M ${width - curveOffset} 0 Q ${width - 2 * curveOffset} ${height / 2} ${width - curveOffset} ${height} L 0 ${height} V 0 L ${width - curveOffset} 0 Z"
        );
      }
      100% {
        d: path(
          "M -10 0 Q 0 ${height / 2} 0 ${height} L 0 ${height} V 0 L ${width - curveOffset} 0 Z"
        );
      }
    }
  `;
};

const AnimatedButton = ({
  width = 200,
  height = 30,
  text,
  onClick,
  // onSubmit,
  // isSubmit = false,
  isSelected = false
}) => {
  const buttonRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('');
  const uniqueId = useRef(`${width}-${height}-${Math.random().toString(36).substr(2, 5)}`).current;

  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = generateKeyframes(width, height, uniqueId);
    document.head.appendChild(styleSheet);

    return () => document.head.removeChild(styleSheet);
  }, [width, height, uniqueId]);

  const handleMouseEnter = (e) => {
    const rect = buttonRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (mouseY >= rect.height * 0.8) {
      setDirection('bottom');
    } else if (mouseX <= rect.width * 0.2) {
      setDirection('right');
    } else if (mouseY <= rect.height * 0.2) {
      setDirection('top');
    } else if (mouseX >= rect.width * 0.8) {
      setDirection('left');
    }

    setIsAnimating(true);
  };


  const handleMouseLeave = (e) => {
    if (e.type !== 'mouseleave') return;
    const rect = buttonRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (mouseY <= rect.height * 0.2) {
      setDirection('top');
    } else if (mouseY >= rect.height * 0.8) {
      setDirection('bottom');
    } else if (mouseX <= rect.width * 0.2) {
      setDirection('right');
    } else if (mouseX >= rect.width * 0.8) {
      setDirection('left');
    }
    setIsAnimating(false);
  };

  return (
    <div
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`animated__button flex--s-0 ${isSelected ? 'selected' : ''}`}
      style={{ position: 'relative', width, height }}
    >
      <p className={`${isAnimating ? 'text-white' : ''} animated__button-text`}>{text}</p>
      <svg
        width="105%"
        height="105%"
        viewBox={`4 0 ${width} ${height}`}
        className={`${isAnimating ? 'animate-in' : 'animate-out'} ${direction}`}
      >
        <path
          fill="currentColor"
          style={{
            animation: isAnimating
              ? `morph-in-${direction}-${uniqueId} 0.2s ease-in forwards`
              : `morph-out-${direction}-${uniqueId} 0.2s ease-out forwards`,
          }}
        />
      </svg>
    </div>
  );
};

export default AnimatedButton;
