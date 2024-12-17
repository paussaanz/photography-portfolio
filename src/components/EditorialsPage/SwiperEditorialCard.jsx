import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMediaQuery } from "../../contexts/MediaQueryContext";
import { Link } from "react-router-dom";
import { useTransition } from "../../contexts/transitionContext";

const SwiperEditorialCard = ({ images }) => {
  const { isMobile } = useMediaQuery();
  const sectionRef = useRef(null);

  const { handleLinkClick } = useTransition()

  // Dynamic viewport width for responsiveness
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Media-specific constants
  const gap = isMobile ? 16 : 48; // Gap between images
  const imageWidths = {
    start: isMobile ? 300 : 900,
    end: isMobile ? 312 : 940,
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Calculate initial and final positions
  const initialPosition = `${viewportWidth / 2 - imageWidths.start / 2}px`;
  const finalPosition = `-${(images.length - 1) * (imageWidths.end + gap) -
    (viewportWidth / 2 - imageWidths.end / 2)
    }px`;

  // Horizontal position transform
  const xTransform = useTransform(scrollYProgress, [0, 1], [initialPosition, finalPosition]);

  return (
    <motion.div className="d--vh-300 position--sticky" ref={sectionRef}>
      <motion.div
        className="position--sticky position--top-0 flex d--vh-100 flex--a-center flex--j-start g--5 g--3-mbl"
        style={{ x: xTransform }}
      >
        {images.map((image, i) => {

          //CUANDO HAYA MAS SLIDES HABRA QUE CAMBIAR EL START THRESHOLD!!!
          const startThreshold = 0.5 * i;
          const endThreshold = startThreshold + 0.45; // Adjust this value for when scaling should stop
          const scaleTransform = useTransform(scrollYProgress, [startThreshold, endThreshold], [1, 0.2]);

          return (
            <div key={image.url} className="text-decoration--none" aria-label={`View details for ${image.name}`}>
              <motion.div
                key={i}
                className="editorials__cards-slide"
                style={{
                  scale: scaleTransform,
                  width: `${imageWidths.start}px`,
                  marginRight: `${gap}px`,
                }}
              >
                <img
                  data-hover="a"
                  onClick={() => handleLinkClick(image.url)}
                  className="editorials__cards-slide-image"
                  src={image.src}
                  alt={image.alt || `Editorial Slide ${i + 1}`}
                  loading="lazy"
                />
                <div className="flex flex--row flex--j-between flex--a-baseline text-transform--uppercase text-color--primary m--t-3">
                  <p className="m--0 h4">{image.name}</p>
                  <p className="m--0 h6">({image.date})</p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default SwiperEditorialCard;
