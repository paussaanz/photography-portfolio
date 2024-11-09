import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";

const AnimatedThumbnailList = ({ imageList, setSelectedImage, selectedImage, isExiting }) => {
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
            containerRef.current.removeEventListener("scroll", handleScroll);
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
            {loopedImageList.map((img, idx) => (
                <motion.div
                    key={idx}
                    className={`pdetails__card-thumbnail ${selectedImage === img.src
                        ? "pdetails__card-thumbnail--selected"
                        : ""
                        }`}
                    onClick={() => setSelectedImage(img.src)}
                    initial={{ opacity: 0, y: 0 }}
                    animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
                    exit={{ opacity: 0, y: 50 }}
                    whileHover={{ opacity: 0.8 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{
                        width: "130px",
                        height: "150px",
                        backgroundImage: `url(${img.src})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        cursor: "pointer",
                    }}
                />
            ))}
        </motion.div>
    );
};

export default AnimatedThumbnailList;
