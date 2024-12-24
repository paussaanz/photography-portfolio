import React, { useRef, useState, useEffect, useContext } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import AnimatedThumbnailList from "./AnimatedImageThumbnails";
import { useMediaQuery } from "../../contexts/MediaQueryContext";

const AnimatedImage = ({
  images,
  colStart,
  colSpan,
  rowSpan,
  rowStart,
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
  const [isVertical, setIsVertical] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const { isMobile } = useMediaQuery();
  const [initialPosition, setInitialPosition] = useState({
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  });
  const [selectedImage, setSelectedImage] = useState(images[0].srcH);
  const [clipPath, setClipPath] = useState("");
  const lastScrollYRef = useRef(0); // Use a ref to track scroll position
  const touchStartX = useRef(null);

  const yTransform = useTransform(scrollYProgress, [0, 1], [0, parallaxSpeed]);

  const calculateClipPath = (scrollY) => {
    if (isMobile) return; // Skip calculation on mobile

    const containerElement = container.current;
    if (!containerElement) return;

    const { width: actualWidth, height: actualHeight } = containerElement.getBoundingClientRect();
    const deltaY = scrollY - lastScrollYRef.current; // Access last scroll value from the ref
    const direction = deltaY > 0 ? 1 : -1;
    const velocity = Math.min(Math.abs(deltaY), 20); // cambiar este valor para establecer el maximo de curva como quieras

    const topCurve = direction * velocity * 2 + 10;
    const bottomCurve = actualHeight + direction * velocity * 2;

    setClipPath(
      `path("M0 10 Q${actualWidth / 2} ${topCurve}, ${actualWidth} 10 L${actualWidth} ${actualHeight} Q${actualWidth / 2} ${bottomCurve}, 0 ${actualHeight} Z")`
    );

    lastScrollYRef.current = scrollY; // Update the ref directly
  };

  useEffect(() => {
    if (isMobile) {
      // Reset clipPath if on mobile
      setClipPath("");
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      calculateClipPath(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    calculateClipPath(window.scrollY);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    getImageAspectRatio(img.srcH)
    setSelectedImage(img.srcH);
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

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;

    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;

    if (deltaX > 50) {
      // Swipe Right
      handlePrevImage();
    } else if (deltaX < -50) {
      // Swipe Left
      handleNextImage();
    }

    touchStartX.current = null; // Reset for next swipe
  };

  const handleNextImage = () => {
    const currentIndex = images.findIndex((image) => image.srcH === selectedImage);
    const nextIndex = (currentIndex + 1) % images.length;
    getImageAspectRatio(images[nextIndex].srcH)
    setSelectedImage(images[nextIndex].srcH);
  };

  const handlePrevImage = () => {
    const currentIndex = images.findIndex((image) => image.srcH === selectedImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    getImageAspectRatio(images[prevIndex].srcH)
    setSelectedImage(images[prevIndex].srcH);
  };


  const getImageAspectRatio = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        setIsVertical(aspectRatio < 1);

      };

      img.onerror = () => reject("Error loading image");
    });
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
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
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
                    top: isMobile ? "45%" : "50%",
                    left: isMobile ? "50%" : "45%",
                    width: isVertical ? 500 : 1000,
                    height: isVertical ? 800 : 700,
                    width: isMobile ? '90%' : (isVertical ? 500 : 1000),
                    height: isMobile ? (isVertical ? '60%' : '30%') : (isVertical ? 800 : 700),
                    x: "-50%",
                    y: "-50%",
                    opacity: 1,
                  }
              }
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                position: "fixed",
                zIndex: 2000,
              }}
              onClick={handleZoomOut}
              onAnimationComplete={handleAnimationComplete}
            >
              <AnimatePresence key={selectedImage} mode="wait">
                <motion.img
                  data-hover="a"
                  src={selectedImage}
                  alt={`img-${index}`}
                  loading="lazy"
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

            <AnimatedThumbnailList
              getImageAspectRatio={getImageAspectRatio}
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
        ref={container}
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.75,
          type: "tween",
          stiffness: 100,
        }}
        style={{
          gridColumn: !isMobile && !ordered && `${colStart} / span ${colSpan}`,
          gridRow: !isMobile && !ordered && `${rowStart} / span ${rowSpan}`,
          clipPath: !isMobile && !ordered && clipPath,
          WebkitClipPath: !isMobile && !ordered && clipPath,
        }}
      >
        <motion.img
          src={img.srcM}
          alt={`img-${index}`}
          loading="lazy"
          initial={{ scale: 1 }}
          transition={{
            type: "tween",
            stiffness: 30,
          }}
          data-hover="a"
          className="gallery-grid__item-image"
          style={{
            translateY: !ordered && yTransform,
          }}
        />
      </motion.div>
    </>
  );
};

export default AnimatedImage;