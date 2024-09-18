import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navigation/Navbar";
import { useEffect, useState, useRef, Suspense, lazy } from "react";
import Cursor from "./components/Cursor/Cursor";
import Lenis from "lenis";
import { throttle } from "lodash";
import barba from '@barba/core';
import gsap from 'gsap'; // Para animaciones


const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const EditorialsDetailPage = lazy(() => import('./pages/EditorialsDetailPage'));
const EditorialsPage = lazy(() => import('./pages/EditorialsPage'));
const PortfolioDetailPage = lazy(() => import('./pages/PortfolioDetailPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));

function App() {
  const [navVisible, setNavVisible] = useState(true);
  const location = useLocation(); // Captura la ubicación actual para detectar cambios de ruta
  const lenisRef = useRef(null); // Utiliza un ref para manejar la instancia de Lenis

  // Inicializa Lenis solo una vez cuando el componente se monta
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.2,
    });

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
  
  // useEffect(() => {
  //   const lenis = lenisRef.current;
  //   if (!lenis) return;

  //   let lastScrollY = 0;

  //   // Usa throttle para reducir la frecuencia de ejecución de handleScroll
  //   const handleScroll = throttle(({ scroll }) => {
  //     const currentScrollY = scroll;

  //     // Actualiza navVisible solo si cambia la condición
  //     if (
  //       (lastScrollY > currentScrollY || currentScrollY < 30) !== navVisible
  //     ) {
  //       setNavVisible(lastScrollY > currentScrollY || currentScrollY < 30);
  //     }
  //     lastScrollY = currentScrollY;
  //   }, 100); // Ajusta el tiempo en milisegundos para controlar la frecuencia

  //   lenis.on("scroll", handleScroll);

  //   return () => {
  //     lenis.off("scroll", handleScroll);
  //   };
  // }, [navVisible]);



  useEffect(() => {
    // Inicializa Barba.js para manejar transiciones
    barba.init({
      transitions: [
        {
          name: 'fade',
          leave(data) {
            console.log('leave')
            // Animación de salida (antes de cambiar de página)
            return gsap.to(data.current.container, {
              opacity: 0,
              duration: 0.5,
            });
          },
          enter(data) {
            console.log('leave')
            // Animación de entrada (después de cargar la nueva página)
            return gsap.from(data.next.container, {
              opacity: 0,
              duration: 0.5,
            });
          },
        },
      ],
    });
  }, []);

  // Efecto para manejar el comportamiento del scroll y la visibilidad del navbar
  useEffect(() => {

    const lenis = lenisRef.current;
    if (!lenis) return;

    let lastScrollY = 0;

    const handleScroll = throttle(({ scroll }) => {
      console.log('entro')
      const currentScrollY = scroll;
      setNavVisible(lastScrollY > currentScrollY || currentScrollY < 30);
      lastScrollY = currentScrollY;
    }, 200);

    lenis.on("scroll", handleScroll);

    // Limpia el evento de scroll cuando se desmonta el componente
    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, []);

  // Efecto para restablecer el scroll al cambiar de ruta
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true }); // Desplaza al top de manera inmediata al cambiar de ruta
  }, [location.pathname]); // Escucha cambios en la ruta

  return (
    <>
      <div id="barba-wrapper" data-barba="wrapper">
        <div data-barba-namespace="home">
          <Cursor />

          <header className={`fixed-top ${navVisible ? "animated" : "header-hide"}`}>
            <Navbar visible={navVisible} />
          </header>
          <main>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/editorials" element={<EditorialsPage />} />
              <Route path="/portfolio/project" element={<PortfolioDetailPage />} />
              <Route path="/editorials/projects" element={<EditorialsDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </div >
    </>
  );
}

export default App;
