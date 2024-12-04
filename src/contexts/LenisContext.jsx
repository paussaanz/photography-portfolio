import Lenis from "lenis";
import { createContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const LenisContext = createContext();

export default LenisContext;

export const LenisProvider = ({ children }) => {
  const location = useLocation();
  const lenisRef = useRef(null);
  const isLenisActiveRef = useRef(true);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.1,
      duration: 1.2,
    });
    lenisRef.current = lenis;

    // RAF loop
    function raf(time) {
      if (isLenisActiveRef.current && lenis) lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    // Reset scroll position on location change
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(0, { immediate: true });
  }, [location.pathname]);

  const stop = () => {
    isLenisActiveRef.current = false;
  };

  const start = () => {
    isLenisActiveRef.current = true;
  };

  const lenisContextValue = {
    lenis: lenisRef.current,
    stop,
    start,
  };

  return (
    <LenisContext.Provider value={lenisContextValue}>
      {children}
    </LenisContext.Provider>
  );
};
