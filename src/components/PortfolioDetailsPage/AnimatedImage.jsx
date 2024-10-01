import React, { useRef } from "react";
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

  // Define una sola transformación para el paralaje
  const yTransform = useTransform(scrollYProgress, [0, 1], [0, parallaxSpeed]);
  const scaleTransform = useTransform(scrollYProgress, [0, 1], [1, 1.3]); // Escalado de 1 a 1.2

  return (
    <div
      ref={container}
      style={{
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
        style={{
          translateY: yTransform, // Aplicar el efecto de paralaje
          scale: scaleTransform, // Aplicar el escalado
          objectFit: "cover",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default AnimatedImage;
