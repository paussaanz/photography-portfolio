import { Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy, useContext, useEffect, useState } from "react";
import CursorTrail from "./components/Cursor/CursorTrail";
import './assets/sass/style.scss';
import { useMediaQuery } from "./contexts/MediaQueryContext";
import { editorialsDetails, portfolioDetails, portfolioParallaxHero } from "./assets/js/images";
import SwiperEditorialDetail from "./components/EditorialsDetailPage/SwiperEditorialDetail";
import FloatingButton from "./components/FloatingButton/FloatingButton";
import LanguageSwitcher from "./components/General/LanguageSwitcher";
// import WarZone from "./pages/WarZone";

// Lazy-loaded components
const Navbar = lazy(() => import("./components/Navigation/Navbar"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const EditorialsDetailPage = lazy(() => import("./pages/EditorialsDetailPage"));
const EditorialsPage = lazy(() => import("./pages/EditorialsPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const PortfolioDetailPage = lazy(() => import("./pages/PortfolioDetailPage"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const ContactForm = lazy(() => import("./components/ContactPage/ContactForm"));
const LoaderPortfolio = lazy(() => import("./components/Loaders/LoaderPortfolio"));

function App() {
  const location = useLocation(); // Captura la ubicación actual para detectar cambios de ruta
  const [isVisited, setIsVisited] = useState(false); // State to track visit status
  const [initialPath, setInitialPath] = useState(location.pathname); // Tracks the first path user visited
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isMobile } = useMediaQuery();

  // Clear localStorage key on page loadc
  useEffect(() => {
    localStorage.removeItem("visitedWebsite");
    setInitialPath(location.pathname); // Ensure the initial path is set
  }, []);

  // Update localStorage and `isVisited` when user navigates
  useEffect(() => {
    const visitedWebsite = localStorage.getItem("visitedWebsite") === "true";
    if (!visitedWebsite && location.pathname !== initialPath) {
      localStorage.setItem("visitedWebsite", "true");
      setIsVisited(true);
    }
  }, [location.pathname, initialPath]);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if ('serviceWorker' in navigator) {

      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('hola?', event.data.type)
        if (event.data.type === 'install-progress') {
          console.log(`Progreso de instalación: ${event.data.progress}%`);
          setProgress(event.data.progress);
        }
      });
    }
  }, []);


  return (
    <>
      <div key={location.pathname} id="barba-wrapper" data-barba="wrapper">
        <FloatingButton />
        {/* <LanguageSwitcher /> */}
        {!isMobile && <CursorTrail />}

        <div data-barba-namespace="home">
          <header id="header" className={`header--fixed-top ${isMenuOpen ? '' : 'header--inverted'}`}>
            <Suspense fallback={<div>Loading...</div>}>
              <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            </Suspense>
          </header>



          <main>
            <Suspense fallback={<div className="d--vh-100"></div>}>
              <Routes location={location}>
                <Route path="/" element={<HomePage isVisited={isVisited} />} />
                <Route
                  path="/portfolio/photoshoots"
                  element={
                    <PortfolioDetailPage
                      title="photo   shoots"
                      images={portfolioDetails.photoshoots}
                      textAnimation={
                        isMobile
                          ? "Fashion photography captures identity and expression, showcasing creativity, innovation, and artistry, vividly highlighting the transformative power of clothing to reflect individuality."
                          : "A vibrant exploration of identity and expression unfolds in fashion photography, where the lens captures the fleeting essence of style. Each photograph tells a story of creativity and innovation, showcasing the transformative power of clothing as it reflects individuality. Through color, form, and context, these images celebrate the artistry of fashion and its ability to convey emotion and culture."
                      }
                      number="01"
                      subtitle="THE WORLD LOOKS BETTER WHEN YOU’RE LOOKING FOR THE SHOT"
                    />
                  }
                />
                <Route
                  path="/portfolio/music"
                  element={
                    <PortfolioDetailPage
                      title="music"
                      images={portfolioDetails.music}
                      textAnimation={
                        isMobile
                          ? "Music photography transforms sound into visuals, capturing rhythmic moments and emotional energy. Each image conveys live performance vibrancy and the bond between artist and audience."
                          : "The essence of sound is distilled into visual form through music photography, where captured moments vibrate with rhythm and emotion. Each image pulsates with the energy of live performances, intertwining the intimate connection between artist and audience. These photographs reveal the electric atmosphere of concerts, celebrating the power of music to unite and inspire."
                      }
                      number="02"
                      subtitle="STOP AND SHOOT—BECAUSE THE BEST MOMENTS WON’T WAIT"
                    />
                  }
                />
                <Route
                  path="/portfolio/nature"
                  element={
                    <PortfolioDetailPage
                      title="nature"
                      images={portfolioDetails.nature}
                      textAnimation={isMobile
                        ? "Nature photography captures the delicate dance of light and shadow, bringing landscapes to life. Each frame reveals sublime beauty, vividly highlighting the intricate details of flora and fauna often overlooked."
                        : "The intricate dance of light and shadow comes alive in nature photography, where landscapes breathe life into stillness. Each frame becomes a portal to the sublime, showcasing the beauty of flora and fauna often overlooked. These images invite contemplation and appreciation for the delicate balance of ecosystems, reminding us of our connection to the natural world."
                      }
                      number="03"
                      subtitle="NATURE DOESN’T POSE, BUT IT ALWAYS DELIVERS."
                    />
                  }
                />
                <Route
                  path="/portfolio/lifestyle"
                  element={
                    <PortfolioDetailPage
                      title="lifestyle"
                      images={portfolioDetails.lifestyle}
                      textAnimation={
                        isMobile
                          ? "Photography is a visual language, turning moments into art. My collection captures beauty, revealing emotions, truths, and the photographer’s connection to their environment while inviting fresh perspectives."
                          : "Photography serves as a visual language, communicating emotions and hidden truths in every scene. My collection reflects everyday moments transformed into art, showcasing the beauty often overlooked. Each image stands as a testament to the connection between the photographer and their environment, inviting viewers to see the world through my eyes."
                      }
                      number="04"
                      subtitle="SEEING THE WORLD IN 24MM MAKES IT FEEL LIMITLESS"
                    />
                  }
                />
                <Route
                  path="/portfolio/sports"
                  element={
                    <PortfolioDetailPage
                      title="sports"
                      images={portfolioDetails.sports}
                      textAnimation={
                        isMobile
                          ? "Sports photography captures dynamic energy, turning fleeting moments into echoes of triumph and struggle. Each image reflects the pulse of competition, showcasing the action and spirit driving the game."
                          : "In sports photography, dynamic energy transcends the frame, transforming fleeting moments of intensity into echoes of triumph and struggle. Each image resonates with the pulse of competition, capturing not just the action but the spirit that ignites the heart of the game. The lens reveals the determination and passion that drive athletes, inviting viewers to feel the thrill of victory and the weight of defeat."
                      }
                      number="05"
                      subtitle="PHOTOGRAPHY MAKES THE UNSEEN IMPOSSIBLE TO IGNORE"
                    />
                  }
                />

                <Route path="/portfolio" element={<PortfolioPage isVisited={isVisited} isMobile={isMobile} />} />
                <Route path="/editorials" element={<EditorialsPage isVisited={isVisited} />} />
                <Route path="/editorials/greece" element={<EditorialsDetailPage images={editorialsDetails.greece} />} />
                <Route path="/editorials/tanzania" element={<EditorialsDetailPage images={editorialsDetails.tanzania} />} />
                <Route path="/editorials/dolomites" element={<EditorialsDetailPage images={editorialsDetails.dolomites} />} />
                <Route path="/aboutsyp!" element={<AboutPage isVisited={isVisited} />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/contact/form" element={<ContactForm />} />
                <Route path="/portfolio/loader" element={<LoaderPortfolio images={portfolioParallaxHero} />} />
                <Route path="/editorials/swiper" element={<SwiperEditorialDetail />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
