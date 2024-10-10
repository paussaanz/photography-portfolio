import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const AnimatedImage = ({
  src,
  colStart,
  colSpan,
  rowSpan,
  rowStart,
  width = "100%",
  height = "100%",
  parallaxSpeed = -40, // Velocidad del efecto de paralaje
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start center", "center start"],
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const yTransform = useTransform(scrollYProgress, [0, 1], [0, parallaxSpeed]);
  const scaleTransform = useTransform(scrollYProgress, [0, 1], [1, 1.3]);


  const handleMouseMove = (e) => {
    const rect = container.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <div
      className="animated-image-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={container}
      style={{
        transition: "all 2s ease",
        gridColumn: `${colStart} / span ${colSpan}`,
        gridRow: `${rowStart} / span ${rowSpan}`,
        overflow: "hidden",
        position: "relative",
        width: `${width}`,
        height: `${height}`,
      }}
    >
      <motion.img
        src={src}
        alt="Project Image"
        initial={{ scale: 1 }}
        animate={{
          marginTop: `-${mousePosition.y * 0.04}px`,
          marginLeft: `-${mousePosition.x * 0.04}px`,
        }}
        transition={{
          type: "spring",
          stiffness: 30,
        }}
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default AnimatedImage;
