import { createContext, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAnimation, motion } from 'framer-motion';

const TransitionContext = createContext();

export const TransitionProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const controls = useAnimation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleLinkClick = (path) => {
    console.log(path, location.pathname);
    if (path === location.pathname) return;

    if (!isTransitioning) {
      setIsTransitioning(true);
      const startTransition = async () => {
        // Inicia la animación desde la parte inferior y cubre la pantalla
        await controls.start({ y: 0 });

        // Navega a la nueva ruta
        navigate(path);

        // Espera un momento para permitir que la página cargue antes de descubrir
        setTimeout(async () => {
          await controls.start({ y: '-100%' }); // Descubre la pantalla subiendo hacia arriba

          // Vuelve a la posición inicial después de la animación
          await controls.set({ y: '100%' });
          setIsTransitioning(false);
        }, 300); // Ajusta el tiempo si es necesario
      };
      startTransition();
    }
  };

  return (
    <TransitionContext.Provider value={{ handleLinkClick }} >
      {children}
      <motion.div
        initial={{ y: '100%' }} // Empieza desde la parte inferior
        animate={controls}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          top: -15,
          left: -15,
          width: '150%',
          height: '150%',
          zIndex: 100000,
        }}
      >
        <motion.div
          initial={{ y: '100%' }} // Empieza desde la parte inferior
          animate={controls}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            width: '150%',
            height: '150%',
            backgroundColor: 'var(--cor-primary)', 
            // filter: 'blur(10px)',
          }}
        />
          {/* Aqui puedometer texto o algo */}
      </motion.div>
    </TransitionContext.Provider>
  );
};

export const useTransition = () => useContext(TransitionContext);
