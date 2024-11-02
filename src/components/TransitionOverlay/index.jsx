import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const TransitionOverlay = () => {
  const location = useLocation();
  const controls = useAnimation();
  const navigate = useNavigate();

  const [nextRoute, setNextRoute] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (nextRoute) {
      const handleTransition = async () => {
        setIsTransitioning(true);
        // Inicia la animación para cubrir la pantalla
        await controls.start({ y: 0 });

        // Navega a la siguiente ruta después de cubrir
        navigate(nextRoute);

        // Retrasa la animación para descubrir la pantalla después del cambio de ruta
        setTimeout(async () => {
          await controls.start({ y: '-100%' });
          setIsTransitioning(false);
          setNextRoute(null);
        }, 300); // Ajusta el tiempo si es necesario
      };

      handleTransition();
    }
  }, [nextRoute, controls, navigate]);
  console.log(isTransitioning)
  // Función para capturar la ruta de destino
  const handleLinkClick = (path) => {
    if (!isTransitioning) {
      setNextRoute(path);
    }
  };

  useEffect(() => {
    // Start the transition when the route changes
    const handleRouteChange = async () => {
      setIsTransitioning(true);
      await controls.start({ y: 0 });
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay during route change
      await controls.start({ y: '-100%' });
      setIsTransitioning(false);
    };

    handleRouteChange();
  }, [location, controls]);

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={controls}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        zIndex: 1000,
      }}
    />
  );
};

export default TransitionOverlay;
