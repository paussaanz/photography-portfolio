import Lenis from "lenis";
import { createContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const LenisContext = createContext();

export default LenisContext;

export const LenisProvider = ({ children }) => {
  const location = useLocation();
  const [isLenisActive, setIsLenisActive] = useState(true); // Nuevo estado para controlar Lenis
  const [lenisRef, setLenisRef] = useState(null)
  console.log(isLenisActive)
  
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.1,
      duration: 1.2,
    });
    

    if (!isLenisActive) {
console.log("destroy1")
       lenis.destroy();
      }

    // console.log('dntro?')
    setLenisRef(lenis);

    function raf(time) {
      if (isLenisActive) lenis.raf(time); // Solo anima cuando Lenis está activo
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      console.log("destroy")
      lenis.destroy();
    };
  }, [isLenisActive]);


  useLayoutEffect(() => {
    const lenis = lenisRef;
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true });
  }, [location.pathname]);

  const lenisContextValue = {
    lenis: lenisRef,
    stop: () => setIsLenisActive(false), // Cambia el estado a inactivo
    start: () => setIsLenisActive(true), // Cambia el estado a activo
  };

  return (
    <LenisContext.Provider value={lenisContextValue}>
      {children}
    </LenisContext.Provider>
  );
};

//CARLOSSS
//   useEffect(() => {
//     const lenis = new Lenis({
//       smoothWheel: true,
//       lerp: 0.1,
//       duration: 1.2,
//     });
    

//     if (!isLenisActive) lenis.destroy();

//     // console.log('dntro?')
//     lenisRef.current = lenis;

//     function raf(time) {
//       if (isLenisActive) lenis.raf(time); // Solo anima cuando Lenis está activo
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     return () => {
//       lenis.destroy();
//     };
//   }, [isLenisActive]);

// CARLOSSS
//   useLayoutEffect(() => {
//     const lenis = lenisRef.current;
//     if (!lenis) return;
//     lenis.scrollTo(0, { immediate: true });
//   }, [location.pathname]);
