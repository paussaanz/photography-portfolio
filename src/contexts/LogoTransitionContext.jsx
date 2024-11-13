import { createContext, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LogoTransitionContext = createContext();

export const LogoTransitionProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [isRevealing, setIsRevealing] = useState(false);

  const handleLogoTransition = (path, event) => {
    if (path === location.pathname || isTransitioning) return;

    // Captura la posición del clic
    setClickPosition({ x: event.clientX, y: event.clientY });
    setIsTransitioning(true);

    setTimeout(() => {
      // Navega a la nueva ruta después de un retraso para que la animación inicial termine
      navigate(path);
      setIsRevealing(true);

      // Finaliza el efecto de revelado después de la animación
      setTimeout(() => {
        setIsRevealing(false);
        setIsTransitioning(false);
      }, 700); // Duración de la animación de revelado
    }, 1000); // Ajusta el tiempo según la duración de la animación de entrada
  };

  return (
    <LogoTransitionContext.Provider value={{ handleLogoTransition }}>
      {children}

      {/* Círculo de entrada con borde */}
      {isTransitioning && !isRevealing && (
        <motion.div
          initial={{
            scale: 0,
            borderWidth: '0px',
            borderColor: 'var(--cor-primary)',
            borderStyle: 'solid',
            borderRadius: '50%',
            x: clickPosition.x,
            y: clickPosition.y,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: 1,
            borderWidth: '100vw', // Incrementa el tamaño del borde para cubrir toda la pantalla
          }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '20px', // Tamaño inicial del círculo
            height: '20px',
            backgroundColor: 'transparent', // Fondo transparente
            zIndex: 100000,
          }}
        />
      )}

      {/* Expansión completa en transición de salida */}
      {isRevealing && (
        <motion.div
          initial={{
            width: '0px',
            height: '0px',
            borderRadius: '50%',
            borderWidth: '100vw', // Mantiene el borde grande en la animación de salida
            borderColor: 'var(--cor-primary)',
            borderStyle: 'solid',
            x: clickPosition.x,
            y: clickPosition.y,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            width: '200vw', // Crece hasta cubrir toda la pantalla
            height: '200vw',
            borderWidth: 0, // Desaparece el borde a medida que crece
          }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            backgroundColor: 'transparent',
            zIndex: 100001,
          }}
        />
      )}
    </LogoTransitionContext.Provider>
  );
};

export const useLogoTransition = () => useContext(LogoTransitionContext);
