import { useEffect, useRef } from "react";
import { useScroll, motion, useMotionValue, useTransform } from "framer-motion";
import { useLocation } from "react-router-dom";

import VideoBackground from "../components/HomePage/VideoBackground";
import TextOverlay from "../components/General/TextOverlay";
import Button from "../components/General/Buttons/Button";
import SwiperPortfolio from "../components/HomePage/SwiperPortfolio";
import TextAnimation from "../components/General/TextAnimation";
import HomeSeo from "./SEO/HomeSeo";
import LoaderHomePage from "../components/Loaders/LoaderHomePage";

const HomePage = ({ isVisited }) => {
  const homepageRef = useRef(null);
  const location = useLocation();

  const { scrollYProgress } = useScroll({
    target: homepageRef,
    offset: ["start start", "center center"],
  });

  const scale = useMotionValue(1);
  const rotate = useMotionValue(0);

  useEffect(() => {
    const updateTransforms = (value) => {
      scale.set(1 - 0.2 * value);
      rotate.set(0 + 0.5 * value);
    };

    const unsubscribe = scrollYProgress.onChange(updateTransforms);

    return () => {
      unsubscribe(); // Clean up the effect on unmount
    };
  }, [scrollYProgress, scale, rotate]);

  return (
    <div ref={homepageRef} data-barba="container">
      <HomeSeo />

      <section className="home__section-hero position--relative d--vh-100 overflow--hidden">
        {isVisited ? (
          <>
            <VideoBackground
              videoSrc="/images/mid/nature-30.webp"
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
                href="/portfolio"
                text="See my work"
                className="text-color--light"
              />
            </TextOverlay>
          </>
        ) : (
          <LoaderHomePage />
        )}
      </section>

      <section className="home__section-swiper-animation">
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
