import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AnimatedImage = ({
  src,
  colStart,
  colSpan,
  rowSpan,
  rowStart,
  width = "100%",
  height = "100%",
  ordered,
  parallaxSpeed = -40,
  index
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start center", "center start"],
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const yTransform = useTransform(scrollYProgress, [0, 1], [0, parallaxSpeed]);
  const scaleTransform = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const navigate = useNavigate();

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


    <motion.div
      onClick={() => navigate('/detail')}
      className="gallery-item overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={container}
      layout
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        marginTop: !ordered ? '0' : `-${mousePosition.y * 0.3}px`,
        marginLeft: !ordered ? '0' : `-${mousePosition.x * 0.3}px`,
      }}
      transition={{
        duration: 0.75,
        type: "tween",
        stiffness: 100,
      }}
      style={{
        gridColumn: !ordered && `${colStart} / span ${colSpan}`,
        gridRow: !ordered && `${rowStart} / span ${rowSpan}`,
        width: `${width}`,
        height: `${height}`,
      }}
    >
      <motion.img
        src={src}
        alt={`img-${index}`}
        initial={{ scale: 1 }}
        animate={{
          marginTop: ordered ? '0' : `-${mousePosition.y * 0.04}px`,
          marginLeft: ordered ? '0' : `-${mousePosition.x * 0.04}px`,
        }}
        transition={{
          type: "tween",
          stiffness: 30,
        }}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          scale: !ordered && scaleTransform,
          translateY: !ordered && yTransform
        }}
      />
    </motion.div>

  );
};

export default AnimatedImage;
