import Lenis from "lenis";
import { createContext, useEffect, useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const LenisContext = createContext();

export default LenisContext;

export const LenisProvider = ({ children }) => {
  const lenisRef = useRef(null); // Utiliza un ref para manejar la instancia de Lenis
  const location = useLocation(); // Captura la ubicación actual para detectar cambios de ruta

  // Inicializa Lenis solo una vez cuando el componente se monta
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.1,
      duration: 1.2,
    });

    // Guardamos la instancia en el ref
    lenisRef.current = lenis;

    // Función para manejar la animación del scroll
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Limpia la instancia de Lenis al desmontar el componente
    return () => {
      lenis.destroy();
    };
  }, []);

  useLayoutEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    // Reinicia el scroll al cambiar de ruta
    lenis.scrollTo(0, { immediate: true });
  }, [location.pathname]);

  // Creación del valor de contexto, incluyendo las funciones de control
  const lenisContextValue = {
    lenis: lenisRef.current,
    stop: () => lenisRef.current?.stop(),
    start: () => lenisRef.current?.start(),
  };

  return (
    <LenisContext.Provider value={lenisContextValue}>
      {children}
    </LenisContext.Provider>
  );
};
