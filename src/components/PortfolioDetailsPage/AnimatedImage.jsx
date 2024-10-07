import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cssNumber } from "jquery";

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
  const [transitionTime, setTransitionTime] = useState('0.5')


  // Define una sola transformación para el paralaje
  const yTransform = useTransform(scrollYProgress, [0, 1], [0, parallaxSpeed]);
  const scaleTransform = useTransform(scrollYProgress, [0, 1], [1, 1.3]); // Escalado de 1 a 1.2

  const handleMouseMove = (e) => {

    const rect = container.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  setTimeout(() => {
    setTransitionTime('none')
  }, 1000 )

  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }


  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
          translateY: yTransform,
          marginTop: `-${mousePosition.y * 0.05}px`, // Aplicar el efecto de paralaje
          marginLeft: `-${mousePosition.x *  0.05}px`, 
          transition: transitionTime + 's',
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
