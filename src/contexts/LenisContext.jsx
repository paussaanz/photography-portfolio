import Lenis from "lenis";
import { createContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const LenisContext = createContext();

export default LenisContext;

export const LenisProvider = ({ children }) => {
  const location = useLocation();
  const lenisRef = useRef(null); // Instancia de Lenis

  useEffect(() => {
    // Crear instancia de Lenis una vez
    if (!lenisRef.current) {
      lenisRef.current = new Lenis({
        smoothWheel: true,
        lerp: 0.1,
        duration: 1.2,
      });

      const raf = (time) => {
        lenisRef.current?.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }

    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  const lenisContextValue = {
    lenis: lenisRef.current,
    stop: () => lenisRef.current?.stop(), // Detener el scroll con Lenis
    start: () => lenisRef.current?.start(), // Reactivar el scroll con Lenis
  };

  return (
    <LenisContext.Provider value={lenisContextValue}>
      {children}
    </LenisContext.Provider>
  );
};
