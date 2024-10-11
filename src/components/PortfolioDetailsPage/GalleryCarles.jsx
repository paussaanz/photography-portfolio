import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './gallery.scss'; // CSS para el diseño

const getRandomPosition = () => {
  const x = Math.random() * 100; // 0 a 100%
  const y = Math.random() * 100; // 0 a 100%
  return { x, y };
};


const GalleryCarles = ({ images }) => {
  const [ordered, setOrdered] = useState(false); // Estado para cambiar el layout


  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start center", "center start"],
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const yTransform = useTransform(scrollYProgress, [0, 1], [0, -40]);
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

  const handleChangeOrder = () => {
    setOrdered(prev => !prev); // Cambia el orden cuando el botón es presionado
  };

  return (
    <div data-barba="container">
      <div className={`gallery-grid ${ordered ? 'ordered' : 'unordered'} `}>
        {images.map((img, index) => (
          <motion.div
            key={index}
            className="gallery-item overflow-hidden"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              gridColumn: !ordered && `${img.colStart} / span ${img.colSpan}`,
              gridRow: !ordered && `${img.rowStart} / span ${img.rowSpan}`,
              width: `${img.width}`,
              height: `${img.height}`,
            }}
          >
            <motion.img
              src={img.src}
              alt={`img-${index}`}
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
                width: "100%",
                height: "100%",
                scale: scaleTransform, 
                translateY: yTransform
              }}
            />
          </motion.div>
        ))}
      </div>
      <button id="change-btn" onClick={handleChangeOrder}>
        {ordered ? 'Desordenar' : 'Ordenar'}
      </button>
    </div>
  );
};

export default GalleryCarles;
