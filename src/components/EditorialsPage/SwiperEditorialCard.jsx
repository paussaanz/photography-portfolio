import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMediaQuery } from "../../contexts/MediaQueryContext";

const SwiperEditorialCard = ({ images }) => {
    const { isMobile } = useMediaQuery();

    const sectionRef = useRef(null);
    
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    const imageStartWidth = isMobile ? 300 : 900; // Image width in pixels
    const imageEndWidth = isMobile ? 312 : 940; // Image width in pixels
    const gap = isMobile ? 16 : 48;; // 3rem in pixels (1rem = 16px)
    const viewportWidth = window.innerWidth; // Viewport width
    const totalImages = images.length;

    // Calculate the final and initial positions for xTransform
    const finalPosition = `-${((totalImages - 1) * (imageEndWidth + gap)) - (viewportWidth / 2 - imageEndWidth / 2)}px`;
    const initialPosition = `${(viewportWidth / 2 - imageStartWidth / 2)}px`;

    // Horizontal position transform for all images
    const xTransform = useTransform(scrollYProgress, [0, 1], [initialPosition, finalPosition]);

    return (
        <motion.div className="d--vh-300 position--sticky" ref={sectionRef}>
            <motion.div
                className="position--sticky position--top-0 flex d--vh-100 flex--a-center flex--j-start g--5 g--3-mbl"
                style={{ x: xTransform }} // Apply the xTransform for horizontal scrolling
            >
                {images.map((image, i) => {

                    const startThreshold = 0.25 * i;
                    const endThreshold = startThreshold + 0.2; // Adjust this value for when scaling should stop

                    const scaleTransform = useTransform(scrollYProgress, [startThreshold, endThreshold], [1, 0.2]);

                    return (
                        <motion.div
                            key={i}
                            className="editorials__cards-slide"
                            style={{
                                scale: scaleTransform, // Apply individual scaling for each image
                                width: `${imageStartWidth}px`, // Image width
                                marginRight: `${gap}px`, // Add gap between images
                                transition: {
                                    duration: 2, // Adjust the duration for smooth scaling
                                    ease: "easeInOut" // Add ease-in-out for smoother transitions
                                },
                            }}
                        >
                            <img className="editorials__cards-slide-image" src={image.src} alt={`Slide ${i}`} loading="lazy"/>
                        </motion.div>
                    );
                })}
            </motion.div>
        </motion.div>
    );
};

export default SwiperEditorialCard;
