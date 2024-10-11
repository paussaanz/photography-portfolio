import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navigation/Navbar";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import EditorialsDetailPage from "./pages/EditorialsDetailPage";
import EditorialsPage from "./pages/EditorialsPage";
import HomePage from "./pages/HomePage";
import PortfolioDetailPage from "./pages/PortfolioDetailPage";
import PortfolioPage from "./pages/PortfolioPage";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import Cursor from "./components/Cursor/Cursor";
import Lenis from "lenis";
import { throttle } from "lodash";
import barba from '@barba/core';
import gsap from 'gsap'; // Para animaciones
import { portfolioDetails } from "./assets/js/images";
import TextAnimation from "./components/General/TextAnimation";
import GalleryCarles from "./components/PortfolioDetailsPage/GalleryCarles";


function App() {
  const [navVisible, setNavVisible] = useState(true);
  const location = useLocation(); // Captura la ubicación actual para detectar cambios de ruta
  const lenisRef = useRef(null); // Utiliza un ref para manejar la instancia de Lenis

  // Inicializa Lenis solo una vez cuando el componente se monta
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.1,
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



  useEffect(() => {
    // Initialize Barba.js for handling transitions
    barba.init({
      transitions: [
        {
          name: 'fade',
          leave(data) {
            return gsap.to(data.current.container, {
              opacity: 0,
              duration: 0.5,
            });
          },
          enter(data) {
            return gsap.from(data.next.container, {
              opacity: 0,
              duration: 0.5,
            });
          },
          afterEnter() {
            // Ensure scroll reset after transition is done
            const lenis = lenisRef.current;
            if (lenis) {
              lenis.scrollTo(0, { immediate: true });
            }
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
  useLayoutEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    requestAnimationFrame(() => {
      lenis.scrollTo(0, { immediate: true });
    });
  }, [location.pathname]);


  return (
    <>
      <div key={location.pathname} id="barba-wrapper" data-barba="wrapper">
        <div data-barba-namespace="home">
          <Cursor />

          <header id="header" className={`fixed-top inverted ${navVisible ? "animated" : "header-hide"}`}>
            <Navbar visible={navVisible} />
          </header>
          <main>
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/portfolio/photoshoots" element={<PortfolioDetailPage title="photo    shoots" images={portfolioDetails.photoshoots} textAnimation={"A vibrant exploration of identity and expression unfolds in fashion photography, where the lens captures the fleeting essence of style. Each photograph tells a story of creativity and innovation, showcasing the transformative power of clothing as it reflects individuality. Through color, form, and context, these images celebrate the artistry of fashion and its ability to convey emotion and culture."} />} />
              <Route path="/portfolio/music" element={<PortfolioDetailPage title="music" images={portfolioDetails.music} textAnimation={"The essence of sound is distilled into visual form through music photography, where captured moments vibrate with rhythm and emotion. Each image pulsates with the energy of live performances, intertwining the intimate connection between artist and audience. These photographs reveal the electric atmosphere of concerts, celebrating the power of music to unite and inspire."} />} />
              <Route path="/portfolio/nature" element={<PortfolioDetailPage title="nature" images={portfolioDetails.nature} textAnimation={"The intricate dance of light and shadow comes alive in nature photography, where landscapes breathe life into stillness. Each frame becomes a portal to the sublime, showcasing the beauty of flora and fauna often overlooked. These images invite contemplation and appreciation for the delicate balance of ecosystems, reminding us of our connection to the natural world."} />} />
              <Route path="/portfolio/lifestyle" element={<PortfolioDetailPage title="lifestyle" images={portfolioDetails.lifestyle} textAnimation={"Photography serves as a visual language, communicating emotions and hidden truths in every scene. My collection reflects everyday moments transformed into art, showcasing the beauty often overlooked. Each image stands as a testament to the connection between the photographer and their environment, inviting viewers to see the world through my eyes."} />} />
              <Route path="/portfolio/sports" element={<PortfolioDetailPage title="sports" images={portfolioDetails.sports} textAnimation={"In sports photography, dynamic energy transcends the frame, transforming fleeting moments of intensity into echoes of triumph and struggle. Each image resonates with the pulse of competition, capturing not just the action but the spirit that ignites the heart of the game. The lens reveals the determination and passion that drive athletes, inviting viewers to feel the thrill of victory and the weight of defeat."} />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/editorials" element={<EditorialsPage />} />
              <Route path="/editorials" element={<EditorialsDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/gallery" element={<GalleryCarles images={portfolioDetails.photoshoots.projectImages} />} />

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
