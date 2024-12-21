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


const HomePage = ({ isVisited }) => {
  const homepageRef = useRef(null);
  const location = useLocation();
  const { handleLinkClick } = useTransition();

  const { scrollYProgress } = useScroll({
    target: homepageRef,
    offset: ["start start", "center center"],
  });

  const scale = useMotionValue(1);
  const rotate = useMotionValue(0);

  useEffect(() => {
    const updateTransforms = (value) => {
      scale.set(1 - 0.2 * value);
      rotate.set(0 + 0.7 * value);
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
              textColor="text-color--light"
              textPosition="center"
              className="text-align--center"
            >
              <h1>
                <span className="block--display">Capture</span>
                <span className="h2 block--display">Brilliance</span>
              </h1>
              <Button
                onClick={() => handleLinkClick("/portfolio")}
                text="See my work"
                className="text-color--light"
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
          style={{ scale, rotate }}
          className="position--sticky position--top-0 p--y-5 d--vh-100 align-content--center"
        >
          <TextAnimation
            text="SYP! is where creativity and technology collide. With a focus on design, programming, and photography, I turn ideas into visually striking and functionally seamless experiences that leave a mark. It’s not just about what’s created—it’s about how it connects, inspires, and stands out."
          />
        </motion.div>
        <SwiperPortfolio />
      </section>
    </div>

  );
};

export default HomePage;
