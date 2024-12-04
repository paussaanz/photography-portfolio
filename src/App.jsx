import { Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import ThemeButton from "./components/General/Buttons/ThemeButton";
import CursorTrail from "./components/Cursor/CursorTrail";
import './assets/sass/style.scss';
import { useMediaQuery } from "./contexts/MediaQueryContext";
import { portfolioDetails, portfolioParallaxHero } from "./assets/js/images";

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

  // Clear localStorage key on page load
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

  return (
    <>
      <div key={location.pathname} id="barba-wrapper" data-barba="wrapper">
        <div data-barba-namespace="home">
          <header id="header" className={`header--fixed-top ${isMenuOpen ? '' : 'header--inverted'}`}>
            <Suspense fallback={<div>Loading...</div>}>
              <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            </Suspense>
          </header>

          {!isMobile && <CursorTrail />}

          <main>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes location={location}>
                <Route path="/" element={<HomePage isVisited={isVisited} />} />
                <Route
                  path="/portfolio/photoshoots"
                  element={
                    <PortfolioDetailPage
                      title="photo   shoots"
                      images={portfolioDetails.photoshoots}
                      textAnimation={"A vibrant exploration of identity and expression unfolds in fashion photography, where the lens captures the fleeting essence of style. Each photograph tells a story of creativity and innovation, showcasing the transformative power of clothing as it reflects individuality. Through color, form, and context, these images celebrate the artistry of fashion and its ability to convey emotion and culture."}
                    />
                  }
                />
                <Route
                  path="/portfolio/music"
                  element={
                    <PortfolioDetailPage
                      title="music"
                      images={portfolioDetails.music}
                      textAnimation={"The essence of sound is distilled into visual form through music photography, where captured moments vibrate with rhythm and emotion. Each image pulsates with the energy of live performances, intertwining the intimate connection between artist and audience. These photographs reveal the electric atmosphere of concerts, celebrating the power of music to unite and inspire."}
                    />
                  }
                />
                <Route
                  path="/portfolio/nature"
                  element={
                    <PortfolioDetailPage
                      title="nature"
                      images={portfolioDetails.nature}
                      textAnimation={"The intricate dance of light and shadow comes alive in nature photography, where landscapes breathe life into stillness. Each frame becomes a portal to the sublime, showcasing the beauty of flora and fauna often overlooked. These images invite contemplation and appreciation for the delicate balance of ecosystems, reminding us of our connection to the natural world."}
                    />
                  }
                />
                <Route
                  path="/portfolio/lifestyle"
                  element={
                    <PortfolioDetailPage
                      title="lifestyle"
                      images={portfolioDetails.lifestyle}
                      textAnimation={"Photography serves as a visual language, communicating emotions and hidden truths in every scene. My collection reflects everyday moments transformed into art, showcasing the beauty often overlooked. Each image stands as a testament to the connection between the photographer and their environment, inviting viewers to see the world through my eyes."}
                    />
                  }
                />
                <Route
                  path="/portfolio/sports"
                  element={
                    <PortfolioDetailPage
                      title="sports"
                      images={portfolioDetails.sports}
                      textAnimation={"In sports photography, dynamic energy transcends the frame, transforming fleeting moments of intensity into echoes of triumph and struggle. Each image resonates with the pulse of competition, capturing not just the action but the spirit that ignites the heart of the game. The lens reveals the determination and passion that drive athletes, inviting viewers to feel the thrill of victory and the weight of defeat."}
                    />
                  }
                />
                <Route path="/portfolio" element={<PortfolioPage isVisited={isVisited} isMobile={isMobile} />} />
                <Route path="/editorials" element={<EditorialsPage isVisited={isVisited} />} />
                <Route path="/editorials/detail" element={<EditorialsDetailPage />} />
                <Route path="/aboutsyp!" element={<AboutPage isVisited={isVisited} />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/contact/form" element={<ContactForm />} />
                <Route path="/portfolio/loader" element={<LoaderPortfolio images={portfolioParallaxHero} />} />
              </Routes>
            </Suspense>
          </main>
          <ThemeButton />
        </div>
      </div>
    </>
  );
}

export default App;
