import Lenis from "lenis";
import { createContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const LenisContext = createContext();

export default LenisContext;

export const LenisProvider = ({ children }) => {
  const lenisRef = useRef(null);
  const location = useLocation();
  const [isLenisActive, setIsLenisActive] = useState(true); // Nuevo estado para controlar Lenis
  console.log(isLenisActive)
  useEffect(() => {

    // No inicializa Lenis si está inactivo

    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.1,
      duration: 1.2,
    });

    if (!isLenisActive) lenis.destroy();

    console.log('dntro?')
    lenisRef.current = lenis;

    function raf(time) {
      if (isLenisActive) lenis.raf(time); // Solo anima cuando Lenis está activo
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isLenisActive]);

  useLayoutEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true });
  }, [location.pathname]);

  const lenisContextValue = {
    lenis: lenisRef.current,
    stop: () => setIsLenisActive(false), // Cambia el estado a inactivo
    start: () => setIsLenisActive(true), // Cambia el estado a activo
  };

  return (
    <LenisContext.Provider value={lenisContextValue}>
      {children}
    </LenisContext.Provider>
  );
};
