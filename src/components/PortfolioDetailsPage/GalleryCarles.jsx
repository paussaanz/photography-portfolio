import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './gallery.scss'; // CSS para el diseño
import AnimatedImage from './AnimatedImage';


const getRandomPosition = () => {
  const x = Math.random() * 100; // 0 a 100%
  const y = Math.random() * 100; // 0 a 100%
  return { x, y };
};


const GalleryCarles = ({ images, ordered }) => {


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



  return (
    <div data-barba="container">
      <div className={`gallery-grid ${ordered ? 'ordered' : 'unordered'} `}>
        {images.map((img, index) => (
          <AnimatedImage
            key={index}
            src={img.src}
            colStart={img.colStart}
            colSpan={img.colSpan}
            rowSpan={img.rowSpan}
            rowStart={img.rowStart}
            width={img.width}
            height={img.height}
            parallaxSpeed={-40}
            ordered={ordered}
            index={index}
          />
        ))}
      </div>
      {/* <button id="change-btn" onClick={handleChangeOrder}>
        {ordered ? 'Desordenar' : 'Ordenar'}
      </button> */}
    </div>
  );
};

export default GalleryCarles;
