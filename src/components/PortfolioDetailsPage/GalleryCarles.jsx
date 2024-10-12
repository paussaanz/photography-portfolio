import AnimatedImage from './AnimatedImage';

const GalleryCarles = ({ images, ordered }) => {

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
    </div>
  );
};

export default GalleryCarles;
