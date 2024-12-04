import { useRef, useMemo } from "react";
import { motion, useScroll } from "framer-motion";
import ParallaxImages from "../General/ParallaxImages";
import { useMediaQuery } from "../../contexts/MediaQueryContext";
import { getYTransform, useLetterTransforms } from "../../assets/js/animations";

const HeroPortfolio = ({ images = [], word = "PORTFOLIO" }) => {
  const container = useRef(null);
  const { isMobile } = useMediaQuery();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end center"],
  });

  // Use memoized transformations to avoid recalculations
  const yTransforms = useMemo(() => getYTransform(scrollYProgress), [scrollYProgress]);
  const letterTransforms = useMemo(() => useLetterTransforms(word, scrollYProgress), [
    word,
    scrollYProgress,
  ]);

  // Memoize hero title style
  const heroTitleStyle = useMemo(
    () => ({ bottom: "-65px" }),
    []
  );

  return (
    <div ref={container} className="container-bem portfolio__hero">
      {/* Parallax Images */}
      <div className="portfolio__hero-images">
        <ParallaxImages
          images={images}
          getYTransform={yTransforms}
          classname="portfolio__hero-images-parallax"
        />
      </div>

      {/* Hero Text */}
      <div className="text-color--primary text-align--center flex flex--j-center flex--a-center d--vh-100">
        {isMobile ? (
          <div className="portfolio__hero-mobile-title">
            <h1 className="portfolio__hero-title">{word}</h1>
          </div>
        ) : (
          <motion.div
            style={heroTitleStyle}
            className="m--0 text-transform--uppercase position--absolute text-color--primary d--vw-100 overflow--hidden flex flex--a-center flex--j-center"
          >
            {word.split("").map((letter, index) => (
              <motion.h1
                key={index}
                style={{ y: letterTransforms[index] }}
                className="portfolio__hero-title"
              >
                {letter}
              </motion.h1>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HeroPortfolio;
