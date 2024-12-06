import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";

const AnimatedThumbnailList = ({
    getImageAspectRatio,
    imageList,
    setSelectedImage,
    selectedImage,
}) => {
    const containerRef = useRef(null);
    const thumbnailRefs = useRef([]); // Referencias dinámicas para thumbnails
    const newListRef = useRef(true);
    const [newImageList, setNewImageList] = useState([]);
    console.log(selectedImage)
    useEffect(() => {
        // Configuración de Lenis para scroll suave
        const lenis = new Lenis({
            wrapper: containerRef.current,
            smoothWheel: true,
            smoothTouch: false,
            lerp: 0.1,
            duration: 1.2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    if (newListRef.current) {
        const selectedIdx = imageList.findIndex((img) => img.src === selectedImage);

        const start = imageList.slice(selectedIdx); // Desde la seleccionada hasta el final
        const end = imageList.slice(0, selectedIdx); // Desde el inicio hasta la seleccionada

        setNewImageList([...start, ...end, ...start]);

        newListRef.current = false;
    }


    return (
        <motion.div
            style={{
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                height: "100vh",
            }}
            ref={containerRef}
            className="pdetails__container-thumbnails"
        >
            {newImageList.map((img, idx) => {
                const isSelected = selectedImage === img.src; // La imagen reorganizada seleccionada siempre es la primera

                return (
                    <motion.div
                        ref={(el) => (thumbnailRefs.current[idx] = el)} // Guardar la referencia
                        key={idx}
                        className={`pdetails__card-thumbnail ${isSelected ? "pdetails__card-thumbnail--selected" : ""
                            }`}
                        onMouseEnter={() => {
                            setSelectedImage(img.src);
                            getImageAspectRatio(img.src);
                        }}
                        initial={{ opacity: 1 }} // Sin animación inicial
                        style={{
                            width: "130px",
                            height: "150px",
                            backgroundImage: `url(${img.src})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            cursor: "pointer",
                            opacity: isSelected ? 1 : 0.6,
                            filter: isSelected ? "none" : "brightness(0.4)",
                            transition: "opacity 0.5s ease, filter 0.5s ease",
                        }}
                    />
                );
            })}
        </motion.div>
    );
};

export default AnimatedThumbnailList;
