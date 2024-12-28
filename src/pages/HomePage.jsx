import { useEffect, useRef } from "react";
import { useScroll, motion, useMotionValue } from "framer-motion";
import { useLocation } from "react-router-dom";
import TextOverlay from "../components/General/TextOverlay";
import Button from "../components/General/Buttons/Button";
import SwiperPortfolio from "../components/HomePage/SwiperPortfolio";
import TextAnimation from "../components/General/TextAnimation";
import HomeSeo from "./SEO/HomeSeo";
import LoaderHomePage from "../components/Loaders/LoaderHomePage";
import { useTransition } from "../contexts/transitionContext";
import ImageBackground from "../components/HomePage/VideoBackground";
import { useMediaQuery } from "../contexts/MediaQueryContext";
import { useTranslation } from "react-i18next";


const HomePage = ({ isVisited }) => {
  const homepageRef = useRef(null);
  const location = useLocation();
  const { handleLinkClick } = useTransition();
  const { isMobile } = useMediaQuery();
  const { scrollYProgress } = useScroll({
    target: homepageRef,
    offset: ["start start", "center center"],
  });

  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language; // Obtiene el idioma actual
  const scale = useMotionValue(1);
  const rotate = useMotionValue(0);

  useEffect(() => {
    const updateTransforms = (value) => {
      const scaleFactor = isMobile ? 0.1 : 0.2; // Less aggressive on mobile
      const rotateFactor = isMobile ? 0.4 : 0.7; // Adjust rotation intensity

      scale.set(1 - scaleFactor * value);
      rotate.set(0 + rotateFactor * value);
    };

    const unsubscribe = scrollYProgress.onChange(updateTransforms);

    return () => {
      unsubscribe(); // Clean up the effect on unmount
    };
  }, [scrollYProgress, scale, rotate]);

  return (
    <div ref={homepageRef} data-barba="container">
      <HomeSeo />

      <section
        className="home__section-hero position--fixed d--vh-100 overflow--hidden"
        style={{
          top: 0, // Sticks the hero to the top of the viewport
          left: 0, // Ensures it covers the full width
          width: "100%",
          zIndex: 1, // Base layer, so the next section can scroll over
        }}
      >
        {isVisited ? (
          <>
            <ImageBackground
              height="d--vh-100"
            />
            <TextOverlay
              textColor="text-color--overlay"
              textPosition="center"
              className="text-align--center"
            >
              <h1>
                <span className="block--display">{t('home.hero.title.firstLine')}</span>
                <span className="h2 block--display">{t('home.hero.title.secondLine')}</span>
              </h1>
              <Button
                onClick={() => handleLinkClick("/portfolio")}
                text={t('home.hero.callToAction')}
                className="text-color--overlay"
              />
            </TextOverlay>
          </>
        ) : (
          <LoaderHomePage />
        )}
      </section>

      <section
        className="home__section-swiper-animation background--light"
        style={{
          zIndex: 2, // Layer above the hero section
          position: "relative", // Allows it to scroll normally
          marginTop: "100vh", // Starts below the hero
        }}
      >
        <motion.div
          key={location.pathname}
          style={{ scale, rotate, willChange: "transform" }}
          className="position--sticky position--top-0 p--y-5 d--vh-100 align-content--center"
        >
          <TextAnimation key={currentLanguage} text={t("home.section.textAnimation")} />
        </motion.div>
        <SwiperPortfolio />
      </section>
    </div>

  );
};

export default HomePage;
