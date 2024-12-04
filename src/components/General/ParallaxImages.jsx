import { motion } from "framer-motion";
import { useState } from "react";
import { useMediaQuery } from "../../contexts/MediaQueryContext";

const ParallaxImages = ({ images = [], getYTransform, classname }) => {
  const [hoverState, setHoverState] = useState({ index: null, x: 0, y: 0 });
  const { isMobile } = useMediaQuery();

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoverState({
      index,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const resetHoverState = () => setHoverState({ index: null, x: 0, y: 0 });

  const getHoverStyle = (index) => {
    const isHovered = hoverState.index === index && !isMobile;

    return {
      firstImage: {
        filter: isHovered
          ? "blur(10px) contrast(1.2) invert(0.25) saturate(3.25)"
          : "none",
        transition: "filter 0.5s ease-out",
      },
      secondImage: {
        clipPath: isHovered
          ? `circle(40px at ${hoverState.x}px ${hoverState.y}px)`
          : "none",
      },
    };
  };

  return (
    <>
      {images.map(({ src, y }, i) => {
        const hoverStyle = getHoverStyle(i);

        return (
          <motion.div
            key={`i_${i}`}
            className={`${classname} position-relative`}
            style={{ y: getYTransform(y) }}
            {...(!isMobile && {
              onMouseMove: (e) => handleMouseMove(e, i),
              onMouseEnter: () => setHoverState((state) => ({ ...state, index: i })),
              onMouseLeave: resetHoverState,
            })}
          >
            {/* Blurred Image */}
            <img
              src={src}
              className="parallax__image"
              alt={`image-${i}`}
              style={{ zIndex: 1, ...hoverStyle.firstImage }}
              loading="lazy"
            />
            {/* Hover Circle Image */}
            <img
              src={src}
              className="parallax__image"
              alt={`image-${i}`}
              style={{ zIndex: 2, ...hoverStyle.secondImage }}
              loading="lazy"
            />
          </motion.div>
        );
      })}
    </>
  );
};

export default ParallaxImages;
