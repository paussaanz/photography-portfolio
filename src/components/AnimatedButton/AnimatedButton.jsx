import './AnimatedButton.scss';
import { useRef, useState } from 'react';

const AnimatedButton = () => {
  const buttonRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('');

  const handleMouseEnter = (e) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;  // Coordenada X del mouse respecto al botón
    const mouseY = e.clientY - rect.top;   // Coordenada Y del mouse respecto al botón

    // Cálculo de la dirección de entrada
    if (mouseY >= rect.height * 0.8 && mouseX >= 0 && mouseX <= rect.width) {
      setDirection('bottom'); // Entrando desde la parte inferior
    } else if (mouseX <= rect.width * 0.2) {
      setDirection('right'); // Entrando desde la izquierda
    } else if (mouseY <= rect.height * 0.2) {
      setDirection('top'); // Entrando desde la parte superior
    } else if (mouseX >= rect.width * 0.8) {
      setDirection('left'); // Entrando desde la derecha
    }

    setIsAnimating(true);
  };

  const handleMouseLeave = (e) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;  // Coordenada X del mouse respecto al botón
    const mouseY = e.clientY - rect.top;   // Coordenada Y del mouse respecto al botón

    if (mouseY <= rect.height * 0.2) {
      setDirection('top'); // Saliendo por la parte superior
    } else if (mouseY >= rect.height * 0.8) {
      setDirection('bottom'); // Saliendo por la parte inferior
    } else if (mouseX <= rect.width * 0.2) {
      setDirection('right'); // Saliendo por la izquierda
    } else if (mouseX >= rect.width * 0.8) {
      setDirection('left'); // Saliendo por la derecha
    }
    setIsAnimating(false);
  };

  return (
    <>
      <div
        ref={buttonRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="animated-button"
        style={{ position: 'relative', width: '200px', height: '40px' }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 200 40"
          className={`${isAnimating ? 'animate-in' : 'animate-out'} ${direction}`}
        >
          <path
            id="path"
            d="M 0 40 V 40 Q 100 60 200 40 V 0 H 0 Z"
            fill="currentColor"
          />
        </svg>
      </div>


    </>

  );
};

export default AnimatedButton;
