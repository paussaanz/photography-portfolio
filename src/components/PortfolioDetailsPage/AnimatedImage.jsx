import React, { useRef, useState, useEffect, useContext } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { createPortal } from "react-dom";
import Lenis from "lenis";
import LenisContext from "../../contexts/LenisContext";
import AnimatedImageThumbnails from "./AnimatedImageThumbnails";
import AnimatedThumbnailList from "./AnimatedImageThumbnails";

const AnimatedImage = ({
  images,
  colStart,
  colSpan,
  rowSpan,
  rowStart,
  width = "100%",
  height = "100%",
  ordered,
  parallaxSpeed = -40,
  index,
  img,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start center", "center start"],
  });

  const { stop, start } = useContext(LenisContext);

  const [isZoomed, setIsZoomed] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [initialPosition, setInitialPosition] = useState({
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  });
  const [selectedImage, setSelectedImage] = useState(images[0].src);
  const [imageSize, setImageSize] = useState({ width: "auto", height: "auto" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [blurValue, setBlurValue] = useState(10);

  const yTransform = useTransform(scrollYProgress, [0, 1], [0, parallaxSpeed]);
  const scaleTransform = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const blurAmount = useTransform(scrollYProgress, [0, 0.0001], [blurValue, 0]); // Ajusta [0, 10] para la cantidad de desenfoque que necesites

  const MAX_WIDTH = 800;
  const MAX_HEIGHT = 700;


  // Escuchar cambios en scrollYProgress para actualizar blurValue en tiempo real
  useMotionValueEvent(blurAmount, "change", (latest) => {
    setBlurValue(latest);
  });

  useEffect(() => {

    return () => start();
  }, []);


  useEffect(() => {
    const img = new Image();
    img.src = selectedImage;
    img.onload = () => {
      const ratio = img.width / img.height;
      let width = img.width;
      let height = img.height;

      if (width > MAX_WIDTH) {
        width = MAX_WIDTH;
        height = MAX_WIDTH / ratio;
      }
      if (height > MAX_HEIGHT) {
        height = MAX_HEIGHT;
        width = MAX_HEIGHT * ratio;
      }
      setImageSize({ width, height });
    };
  }, [selectedImage]);

  const handleZoomIn = () => {
    if (container.current) {
      const rect = container.current.getBoundingClientRect();
      setInitialPosition({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    }
    setSelectedImage(img.src);
    setIsZoomed(true);
  };

  const handleZoomOut = () => {
    setIsExiting(true);
  };

  const handleAnimationComplete = () => {
    if (isExiting) {
      setIsZoomed(false);
      setIsExiting(false);
    }
  };

  const zoomedImage = (
    <AnimatePresence>
      {(isZoomed || isExiting) && (
        <>
          <motion.div
            className="pdetails__container-background--overlay"
            initial={{ opacity: 0 }}
            animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          <div className="pdetails__container-detail">
            <motion.button
              initial={{ opacity: 0 }}
              animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pdetails__button-close-overlay"
              onClick={handleZoomOut}
              aria-label="Close Overlay"
            >
              &times;
            </motion.button>
            <motion.div
              className="zoomed-image"
              initial={{
                top: initialPosition.top,
                left: initialPosition.left,
                width: initialPosition.width,
                height: initialPosition.height,
                opacity: 1,
              }}
              animate={
                isExiting
                  ? { opacity: 0, y: 100 }
                  : {
                    top: "50%",
                    left: "45%",
                    width: imageSize.width,
                    height: imageSize.height,
                    x: "-50%",
                    y: "-50%",
                    opacity: 1,
                  }
              }
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                position: "fixed",
                zIndex: 20,
              }}
              onClick={handleZoomOut}
              onAnimationComplete={handleAnimationComplete}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={selectedImage}
                  alt={`img-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </AnimatePresence>
            </motion.div>

            {/* <AnimatedImageThumbnails imagesArray={images}/> */}

            <AnimatedThumbnailList
              imageList={images}
              setSelectedImage={setSelectedImage}
              selectedImage={selectedImage}
              isExiting={isExiting}
            />
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {isZoomed && createPortal(zoomedImage, document.body)}

      <motion.div
        onClick={handleZoomIn}
        className="gallery-grid__item"
        onMouseMove={(e) => {
          const rect = container.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          setMousePosition({ x, y });
        }}
        onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
        ref={container}
        layout
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          marginTop: !ordered ? "0" : `-${mousePosition.y * 0.3}px`,
          marginLeft: !ordered ? "0" : `-${mousePosition.x * 0.3}px`,
        }}
        transition={{
          duration: 0.75,
          type: "tween",
          stiffness: 100,
        }}
        style={{
          gridColumn: !ordered && `${colStart} / span ${colSpan}`,
          gridRow: !ordered && `${rowStart} / span ${rowSpan}`,
          width: `${width}`,
          height: `${height}`,
          filter:  !ordered && `blur(${blurValue}px)`, // Aplica el desenfoque dinámico basado en scroll

        }}
      >

        
        <motion.img
          src={img.src}
          alt={`img-${index}`}
          initial={{ scale: 1 }}
          animate={{
            filter: !ordered &&  `blur(${blurValue}px)`, // Aplica el desenfoque dinámico basado en scroll
          }}
          transition={{
            type: "tween",
            stiffness: 30,
          }}
          className="gallery-grid__item-image"
          style={{
            scale: !ordered && scaleTransform,
            translateY: !ordered && yTransform,
          }}
        />
      </motion.div>
    </>
  );
};

export default AnimatedImage;
