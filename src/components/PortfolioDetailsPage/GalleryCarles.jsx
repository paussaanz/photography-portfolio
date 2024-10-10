import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './gallery.scss'; // CSS para el diseño

const getRandomPosition = () => {
  const x = Math.random() * 100; // 0 a 100%
  const y = Math.random() * 100; // 0 a 100%
  return { x, y };
};


const GalleryCarles = ({ images }) => {
  const [ordered, setOrdered] = useState(false); // Estado para cambiar el layout

  const handleChangeOrder = () => {
    setOrdered(prev => !prev); // Cambia el orden cuando el botón es presionado
  };

  return (
    <div data-barba="container">
      <div className={`gallery-grid ${ordered ? 'ordered' : 'unordered'}`}>
        {images.slice(0, 3).map((img, index) => (
          <motion.div
            key={index}
            className="gallery-item"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img src={img.src} alt={`img-${index}`} style={{ width: '100%' }} />
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
