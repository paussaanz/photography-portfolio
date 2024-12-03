import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";

const AnimatedThumbnailList = ({ getImageAspectRatio, imageList, setSelectedImage, selectedImage, isExiting }) => {
    const containerRef = useRef(null);
    useEffect(() => {
        const lenis = new Lenis({
            wrapper: containerRef.current,
            infinite: false, // Set to false to handle custom looping
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

        // Infinite Scroll Logic
        const handleScroll = () => {
            if (containerRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
                const totalScroll = scrollHeight - clientHeight;

                // Loop from the end back to the start smoothly
                if (scrollTop >= totalScroll - 10) {
                    containerRef.current.scrollTop = 10; // Slight offset to avoid exact start
                } else if (scrollTop <= 10) {
                    containerRef.current.scrollTop = totalScroll - 10;
                }
            }
        };


        containerRef.current.addEventListener("scroll", handleScroll);

        return () => {
            lenis.destroy();
            containerRef.current && containerRef.current.removeEventListener("scroll", handleScroll);
        };
    }, []);


    // Duplicate images at the beginning and end for smooth looping
    const loopedImageList = [...imageList, ...imageList, ...imageList];

    return (
        <motion.div
            style={{
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                height: '100vh'
            }}
            ref={containerRef}
            className="pdetails__container-thumbnails"
            transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
            }}>
            {loopedImageList.map((img, idx) => {
                const isSelected = selectedImage === img.src;

                return (
                    <motion.div
                        key={idx}
                        className={`pdetails__card-thumbnail ${isSelected ? "pdetails__card-thumbnail--selected" : ""}`}
                        onMouseEnter={() => {
                            setSelectedImage(img.src)
                            getImageAspectRatio(img.src)
                        }}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        whileHover={{ opacity: 1 }}
                        transition={{
                            duration: 0.5,
                            ease: "easeInOut",
                            delay: idx * 0.2,
                        }}
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
