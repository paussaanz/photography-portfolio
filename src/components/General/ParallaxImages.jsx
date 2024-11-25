import { motion } from 'framer-motion';
import { useState } from 'react';
import { useMediaQuery } from '../../contexts/MediaQueryContext';

const ParallaxImages = ({ images = [], getYTransform, classname }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
    const { isMobile } = useMediaQuery(); // Check if the device is mobile

    const handleMouseMove = (e, index) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
        setHoveredImageIndex(index);
    };

    const handleMouseEnter = (index) => setHoveredImageIndex(index);
    const handleMouseLeave = () => setHoveredImageIndex(null);

    return (
        <>
            {images.map(({ src, y }, i) => (
                <motion.div
                    style={{ y: getYTransform(y) }}
                    key={`i_${i}`}
                    className={`${classname} position-relative`}
                    // Skip hover event handlers on mobile
                    onMouseMove={!isMobile ? (e) => handleMouseMove(e, i) : undefined}
                    onMouseEnter={!isMobile ? () => handleMouseEnter(i) : undefined}
                    onMouseLeave={!isMobile ? handleMouseLeave : undefined}
                >
                    <img
                        src={src}
                        className="parallax__image"
                        alt={`image-${i}`}
                        style={{
                            zIndex: 1,
                            filter: !isMobile && hoveredImageIndex === i
                                ? 'blur(10px) contrast(1.2) invert(0.25) saturate(3.25)'
                                : 'none',
                            transition: 'filter 0.5s ease-out',
                        }}
                        loading="lazy"
                    />
                    <img
                        src={src}
                        className="parallax__image"
                        alt={`image-${i}`}
                        style={{
                            clipPath: !isMobile && hoveredImageIndex === i
                                ? `circle(40px at ${mousePosition.x}px ${mousePosition.y}px)`
                                : 'none',
                            zIndex: 2,
                        }}
                        loading="lazy"
                    />
                </motion.div>
            ))}
        </>
    );
};

export default ParallaxImages;
