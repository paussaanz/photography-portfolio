import { useState } from 'react';
import { motion } from 'framer-motion';


const Detail = ({ images, closeOverlay }) => {



  const [selectedImage, setSelectedImage] = useState(images[0].src);


  return (
    <div data-barba="container">
      <div className="pdetails__container-detail">
        <motion.div
          className="pdetails__container-background--overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        <motion.div
          className="pdetails__container-image"
          key={selectedImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            src={selectedImage}
            alt="Selected"
            className="d--w-100 d--h-100 object-fit--cover"
          />
        </motion.div>

        <button
          className="pdetails__button-close-overlay"
          onClick={closeOverlay}
          aria-label="Close Overlay"
        >
          &times;
        </button>

        <motion.div className="pdetails__container-thumbnails-scroll">
          <motion.div className="pdetails__container-thumbnails" animate="visible">
            {images.map((img, index) => (
              <motion.div
                key={index}
                className={`pdetails__card-thumbnail ${selectedImage === img.src ? 'pdetails__card-thumbnail--selected' : ''}`}
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
    </div>
  );
};

export default Detail;
