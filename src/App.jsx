import { Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import CursorTrail from "./components/Cursor/CursorTrail";
import './assets/sass/style.scss';
import { useMediaQuery } from "./contexts/MediaQueryContext";
import { editorialsDetails, portfolioDetails, portfolioParallaxHero } from "./assets/js/images";
import SwiperEditorialDetail from "./components/EditorialsDetailPage/SwiperEditorialDetail";
import FloatingButton from "./components/FloatingButton/FloatingButton";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
                      textAnimation={t(`portfolio.detail.photoshoots.textAnimation.${isMobile ? "mobile" : "desktop"}`)}
                      number="01"
                      subtitle={t("portfolio.detail.photoshoots.subtitle")}
                    />
                  }
                />

                <Route
                  path="/portfolio/music"
                  element={
                    <PortfolioDetailPage
                      title={t("portfolio.detail.music.title")}
                      images={portfolioDetails.music}
                      textAnimation={t(`portfolio.detail.music.textAnimation.${isMobile ? "mobile" : "desktop"}`)}
                      number="02"
                      subtitle={t("portfolio.detail.music.subtitle")}
                    />
                  }
                />
                <Route
                  path="/portfolio/nature"
                  element={
                    <PortfolioDetailPage
                      title={t("portfolio.detail.nature.title")}
                      images={portfolioDetails.nature}
                      textAnimation={t(`portfolio.detail.nature.textAnimation.${isMobile ? "mobile" : "desktop"}`)}
                      number="03"
                      subtitle={t("portfolio.detail.nature.subtitle")}
                    />
                  }
                />
                <Route
                  path="/portfolio/lifestyle"
                  element={
                    <PortfolioDetailPage
                      title={t("portfolio.detail.lifestyle.title")}
                      images={portfolioDetails.lifestyle}
                      textAnimation={t(`portfolio.detail.lifestyle.textAnimation.${isMobile ? "mobile" : "desktop"}`)}
                      number="04"
                      subtitle={t("portfolio.detail.lifestyle.subtitle")}
                    />
                  }
                />
                <Route
                  path="/portfolio/sports"
                  element={
                    <PortfolioDetailPage
                      title={t("portfolio.detail.sports.title")}
                      images={portfolioDetails.sports}
                      textAnimation={t(`portfolio.detail.sports.textAnimation.${isMobile ? "mobile" : "desktop"}`)}
                      number="05"
                      subtitle={t("portfolio.detail.sports.subtitle")}
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
