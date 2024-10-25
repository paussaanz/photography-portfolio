import './AnimatedButton.scss';
import { useRef, useState } from 'react';

const AnimatedButton = () => {
  const buttonRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('');

  // Umbrales de detección
  const thresholdX = 0.5;  // Umbral horizontal (50%)
  const thresholdY = 0.5;  // Umbral vertical (50%)

  const handleMouseEnter = (e) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;  // Coordenada X del mouse respecto al botón
    const mouseY = e.clientY - rect.top;   // Coordenada Y del mouse respecto al botón

    // Mostrar las coordenadas para depuración
    console.log(`MouseEnter - MouseX: ${mouseX}, MouseY: ${mouseY}, Button Width: ${rect.width}, Button Height: ${rect.height}`);

    // Cálculo de la dirección de entrada
    if (mouseY < rect.height * thresholdY) {
      setDirection('top'); // Entrando desde la parte superior
    } else if (mouseY > rect.height * (1 - thresholdY)) {
      setDirection('bottom'); // Entrando desde la parte inferior
    } else if (mouseX < rect.width * thresholdX) {
      setDirection('left'); // Entrando desde la izquierda
    } else if (mouseX > rect.width * (1 - thresholdX)) {
      setDirection('right'); // Entrando desde la derecha
    }

    setIsAnimating(true);
  };

  const handleMouseLeave = (e) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;  // Coordenada X del mouse respecto al botón
    const mouseY = e.clientY - rect.top;   // Coordenada Y del mouse respecto al botón

    // Mostrar las coordenadas para depuración
    console.log(`MouseLeave - MouseX: ${mouseX}, MouseY: ${mouseY}`);

    // Cálculo de la dirección de salida
    if (mouseY < rect.height * thresholdY) {
      setDirection('top'); // Saliendo por la parte superior
    } else if (mouseY > rect.height * (1 - thresholdY)) {
      setDirection('bottom'); // Saliendo por la parte inferior
    } else if (mouseX < rect.width * thresholdX) {
      setDirection('left'); // Saliendo por la izquierda
    } else if (mouseX > rect.width * (1 - thresholdX)) {
      setDirection('right'); // Saliendo por la derecha
    }

    setIsAnimating(false);
  };

  return (
    <div
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="animated-button"
      style={{ position: 'relative', width: '200px', height: '40px' }} // Asegúrate de que el botón tenga un tamaño fijo
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
  );
};

export default AnimatedButton;
