import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

export default function useScrollToTop() {
    const { pathname } = useLocation();
    const [lenis, setLenis] = useState(null);

    useEffect(() => {
        // Crear instancia de Lenis si aún no existe
        if (!lenis) {
            const newLenis = new Lenis({
                smoothWheel: true,
                duration: 1.2,
            });
            setLenis(newLenis);
        }

        return () => {
            // Destruir Lenis al desmontar
            if (lenis) {
                lenis.destroy();
            }
        };
    }, [lenis]);

    useEffect(() => {
        // Verificar si Lenis está disponible y utilizar su método específico para hacer scroll
        if (lenis && lenis.scrollTo) {
            lenis.scrollTo(0, 0, { lerp: true }); // Asegúrate de ajustar los parámetros según la documentación de Lenis
        } else {
            // Fallback al comportamiento nativo si Lenis no está disponible
            window.scrollTo(0, 0);
        }
    }, [pathname, lenis]);

    return null;
}
