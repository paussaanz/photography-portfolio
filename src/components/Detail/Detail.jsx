import { useState } from 'react';
import { motion } from 'framer-motion';

import './Detail.scss';

const Detail = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0].src);

  return (
    <div data-barba="container" className="gallery-container">
      <motion.div
        className="background-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
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

      <motion.div className="scroll-container" >
        <motion.div className="thumbnails-container" animate="visible" >

          {images.map((img, index) => {
            return (
              <motion.div
                key={index}
                className={`thumbnail-card ${selectedImage === img.src ? 'selected' : ''}`}
                onClick={() => { setSelectedImage(img.src) }}
                whileHover={{ scale: 1.1 }}
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
            )
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Detail;
