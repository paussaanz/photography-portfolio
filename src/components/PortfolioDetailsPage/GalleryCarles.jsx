import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import AnimatedImage from './AnimatedImage';
import './gallery.scss';

const GalleryCarles = ({ images }) => {
  const [orderedImages, setOrderedImages] = React.useState(false);

  const handleChange = () => {
    setTimeout(() => {
      setOrderedImages(prev => !prev);
    }, 500);
  };

  return (
    <>
      {/* Este es el contenedor al que haremos scroll */}
      <div id="refdiv" style={{ minHeight: '10px', minWidth: '20px' }}></div>

      <div data-barba="container" className="gallery-container">

        <div className={`project-details d-flex justify-content-center align-items-center`}>
          {images && images.slice(0, 7).map((img, index) => (
            <AnimatedImage
              key={index}
              src={img.src}
              width={!orderedImages ? img.width : '200px'}
              translateX={!orderedImages ? img.translateX : '0'}
              translateY={!orderedImages ? img.translateY : '0'}
            />
          ))}
        </div>

        {/* Botón que activa el cambio de estado */}
        <ScrollLink to="refdiv" smooth={true} duration={500}>
          <button id="change-btn" onClick={handleChange}>

            <button id="scroll-btn">Scroll to Top</button>

          </button>
        </ScrollLink>

        {/* Botón para realizar scroll suave */}

      </div>
    </>
  );
};

export default GalleryCarles;
