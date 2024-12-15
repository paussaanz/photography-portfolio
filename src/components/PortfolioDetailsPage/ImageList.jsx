import { useRef, useEffect, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";
import { useMediaQuery } from "../../contexts/MediaQueryContext";

const ImageList = ({
  extendedList,
  imageList,
  getImageAspectRatio,
  setSelectedImage,
  selectedImage,
}) => {
  const containerRef = useRef(null);
  const lenisRef = useRef(null);
  const itemHeight = 150; // Altura fija de cada elemento
  const { isMobile } = useMediaQuery();

  // Inicializar Lenis
  useEffect(() => {
    if (!containerRef.current) return;

    const lenis = new Lenis({
      wrapper: containerRef.current,
      smoothWheel: true,
      smoothTouch: false,
      lerp: 0.1,
      duration: 1.2,
    });

    lenisRef.current = lenis;

    const animate = (time) => {
      lenis.raf(time);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Detectar límites para scroll infinito
  useEffect(() => {
    if (!lenisRef.current) return;

    const lenis = lenisRef.current;
    const container = containerRef.current;

    const handleInfiniteScroll = () => {
      const scrollPos = lenis.scroll || 0;
      const totalHeight = extendedList.length * itemHeight;
      const threshold = imageList.length * itemHeight;

      if (scrollPos < threshold) {
        lenis.scrollTo(scrollPos + imageList.length * itemHeight, { immediate: true });
      } else if (scrollPos > totalHeight - threshold) {
        lenis.scrollTo(scrollPos - imageList.length * itemHeight, { immediate: true });
      }
    };

    container.addEventListener("scroll", handleInfiniteScroll);

    return () => {
      container.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, [extendedList, imageList]);

  // Realizar el scroll inicial para centrar la imagen seleccionada
  useEffect(() => {
    if (!lenisRef.current || extendedList.length === 0) return;

    const lenis = lenisRef.current;
    const middleSectionStart = imageList.length;
    const selectedIdx = imageList.findIndex((img) => img.srcH === selectedImage);
    const scrollToIdx = middleSectionStart + (selectedIdx >= 0 ? selectedIdx : 0);

    setTimeout(() => {
      lenis.scrollTo(scrollToIdx * itemHeight, { immediate: true });
    }, 300);
  }, [extendedList, itemHeight]);


  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { delay: 0.3, duration: 0.5 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.5 } }, // Animación de salida
  };

  return (
    <motion.div
      ref={containerRef}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="pdetails__thumbnails-scrollbar"
      style={{ 
        display: "flex",
        flexDirection:  isMobile ? "row" : "column",
        overflowY: "auto",
        height: isMobile ? "auto" : "100vh",
      }}
    >
      {extendedList.map((img, idx) => {
        const isSelected = selectedImage === img.srcH;

        return (
          <motion.div
            key={idx}
            className={`pdetails__card-thumbnail ${isSelected ? "pdetails__card-thumbnail--selected" : ""
              }`}
            onMouseEnter={() => {
              setSelectedImage(img.srcH);
              getImageAspectRatio(img.srcM);
            }}
            style={{
              width: "130px",
              height: `${itemHeight}px`,
              backgroundImage: `url(${img.srcM})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              cursor: "pointer",
              opacity: isSelected ? 1 : 0.9,
              filter: isSelected ? "none" : "brightness(0.4)",
              transition: "opacity 0.5s ease, filter 0.5s ease",
            }}
          />
        );
      })}
    </motion.div>
  );
};

export default ImageList;
