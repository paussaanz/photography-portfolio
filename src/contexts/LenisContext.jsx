import Lenis from "lenis";
import { createContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const LenisContext = createContext();

export default LenisContext;

export const LenisProvider = ({ children }) => {
  const location = useLocation();
  const lenisRef = useRef(null); // Lenis instance
  const [isLenisReady, setIsLenisReady] = useState(false); // Track readiness

  useEffect(() => {
    if (!lenisRef.current) {
      // Initialize Lenis
      lenisRef.current = new Lenis({
        smoothWheel: true,
        smoothTouch: true, // Ensure smooth scrolling on touch devices
        lerp: 0.15,
        duration: 1,
      });

      const raf = (time) => {
        lenisRef.current?.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);

      setIsLenisReady(true); // Mark as ready
    }

    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      setIsLenisReady(false);
    };
  }, []);

  useEffect(() => {
    if (isLenisReady && lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [location.pathname, isLenisReady]);

  // Ensure `lenis` is only provided when ready
  const lenisContextValue = {
    lenis: isLenisReady ? lenisRef.current : null,
    stop: () => lenisRef.current?.stop(),
    start: () => lenisRef.current?.start(),
  };

  return (
    <LenisContext.Provider value={lenisContextValue}>
      {children}
    </LenisContext.Provider>
  );
};
