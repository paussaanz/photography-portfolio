import { motion } from 'framer-motion';
import { useState } from 'react';

const ParallaxImages = ({ images = [], getYTransform, classname }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e) => {
        const rect = e.target.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    return (
        <>
            {
                images.map(({ src, y }, i) => (
                    <motion.div
                        style={{ y: getYTransform(y) }}
                        key={`i_${i}`}
                        className={`${classname}`}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img
                            src={src}
                            className="parallax__image-blur d--h-100 d--w-100 object-fit--cover"
                            alt={`image-${i}`}
                        />
                        {/* <img
                            src={src}
                            className=" d--h-100 d--w-100 object-fit--cover"
                            alt={`image-${i}`}
                            style={{
                                clipPath: isHovering
                                    ? `circle(100px at ${mousePosition.x}px ${mousePosition.y}px)`
                                    : 'none',
                            }}
                        /> */}
                    </motion.div>
                ))
            }
        </>
    );
};

export default ParallaxImages;
