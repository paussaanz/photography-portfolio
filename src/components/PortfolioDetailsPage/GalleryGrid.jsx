import AnimatedImage from './AnimatedImage';
import { useMediaQuery } from "../../contexts/MediaQueryContext";


const GalleryGrid = ({ images, ordered, handleImageClick, closeOverlay }) => {
  const { isMobile } = useMediaQuery();

  return (
    <>
      <div data-barba="container">
        <div className={`gallery-grid ${ordered && !isMobile ? 'gallery-grid__ordered' : ''} ${isMobile ? 'gallery-grid__mbl' : ''}`}>
          {images.map((img, index) => (
            <AnimatedImage
              key={index}
              src={img.srcM}
              colStart={img.colStart}
              colSpan={img.colSpan}
              rowSpan={img.rowSpan}
              rowStart={img.rowStart}
              width={img.width}
              height={img.height}
              parallaxSpeed={-40}
              ordered={ordered}
              index={index}
              images={images}
              img={img}
              closeOverlay={closeOverlay}
              onImageClick={() => handleImageClick(img)} // Pass click handler
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default GalleryGrid;
