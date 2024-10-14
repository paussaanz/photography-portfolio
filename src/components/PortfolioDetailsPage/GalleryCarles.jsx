import { useState } from 'react';
import AnimatedImage from './AnimatedImage';
import Detail from '../Detail/Detail';

const GalleryCarles = ({ images, ordered }) => {
  const [selectedImage, setSelectedImage] = useState(null); // State to manage selected image for overlay

  const handleImageClick = (img) => {
    setSelectedImage(img); // Set the selected image to show in the overlay
  };

  const closeOverlay = () => {
    setSelectedImage(null); // Close overlay when clicked outside or on a close button
  };
  return (
    <>
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
              onImageClick={() => handleImageClick(img)} // Pass click handler

            />
          ))}
        </div>
      </div>
      {selectedImage && images && (
        
            <Detail images={images} />
          
      )}
    </>
  );
};

export default GalleryCarles;
