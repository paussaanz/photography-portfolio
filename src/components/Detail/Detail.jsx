import { useState } from 'react';
import { motion } from 'framer-motion';


const Detail = ({ images, closeOverlay }) => {



  const [selectedImage, setSelectedImage] = useState(images[0].src);


  return (
    <div data-barba="container" className="gallery-container">
      <motion.div
        className="background-overlay bg-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      <motion.div
        className="main-image-container"
        key={selectedImage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.img
          src={selectedImage}
          alt="Selected"
          className="main-image"
        />
      </motion.div>

      <button
        className="close-overlay-button"
        onClick={closeOverlay}
        aria-label="Close Overlay"
      >
        &times;
      </button>

      <motion.div className="scroll-container">
        <motion.div className="thumbnails-container" animate="visible">
          {images.map((img, index) => (
            <motion.div
              key={index}
              className={`thumbnail-card ${selectedImage === img.src ? 'selected' : ''}`}
              onHoverStart={() => setSelectedImage(img.src)}
              initial={{ opacity: 0 }}
              animate={{ opacity: selectedImage === img.src ? 1 : 0.3, scale: 1 }}
              transition={{
                opacity: { duration: 0.4, delay: index * 0.1 },
                scale: { duration: 0.4 }
              }}
              style={{
                backgroundImage: `url(${img.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Detail;
