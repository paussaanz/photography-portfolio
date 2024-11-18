    import { motion } from 'framer-motion';
    import { useState } from 'react';

    const ParallaxImages = ({ images = [], getYTransform, classname }) => {
        const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
        const [hoveredImageIndex, setHoveredImageIndex] = useState(null);

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
                {
                    images.map(({ src, y }, i) => (
                        <motion.div
                            style={{ y: getYTransform(y) }}
                            key={`i_${i}`}
                            className={`${classname} position-relative`}
                            onMouseMove={(e) => handleMouseMove(e, i)}
                            onMouseEnter={() => handleMouseEnter(i)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img
                                src={src}
                                className="parallax__image"
                                alt={`image-${i}`}
                                style={{
                                    zIndex: 1,
                                    filter: hoveredImageIndex === i ? 'blur(10px) contrast(1.2) invert(0.25) saturate(3.25)' : 'none',
                                    transition: 'filter 0.5s ease-out',
                                }}
                                loading="lazy"
                            />
                            <img
                                src={src}
                                className="parallax__image"
                                alt={`image-${i}`}
                                style={{
                                    clipPath: hoveredImageIndex === i
                                    ? `circle(40px at ${mousePosition.x}px ${mousePosition.y}px)`
                                    : 'none',
                                    zIndex: 2,
                                }}
                                loading="lazy"
                            />
                        </motion.div>
                    ))
                }
            </>
        );
    };

    export default ParallaxImages;


    // import { motion } from 'framer-motion';
    // import { useState } from 'react';

    // const ParallaxImages = ({ images = [], getYTransform, classname }) => {
    //     const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    //     const [hoveredImageIndex, setHoveredImageIndex] = useState(null);

    //     const handleMouseMove = (e, index) => {
    //         const rect = e.currentTarget.getBoundingClientRect();
    //         setMousePosition({
    //             x: e.clientX - rect.left,
    //             y: e.clientY - rect.top,
    //         });
    //         setHoveredImageIndex(index);
    //     };

    //     const handleMouseEnter = (index) => setHoveredImageIndex(index);
    //     const handleMouseLeave = () => setHoveredImageIndex(null);

    //     return (
    //         <>
    //             {
    //                 images.map(({ src, y }, i) => (
    //                     <motion.div
    //                         style={{ y: getYTransform(y) }}
    //                         key={`i_${i}`}
    //                         className={`${classname} position-relative`}
    //                         onMouseMove={(e) => handleMouseMove(e, i)}
    //                         onMouseEnter={() => handleMouseEnter(i)}
    //                         onMouseLeave={handleMouseLeave}
    //                     >
    //                         <img
    //                             src={src}
    //                             className="parallax__image"
    //                             alt={`image-${i}`}
    //                             style={{
    //                                 clipPath: hoveredImageIndex === i
    //                                     ? `circle(40px at ${mousePosition.x}px ${mousePosition.y}px)`
    //                                     : 'none',
    //                                 zIndex: 2,
    //                                 filter: hoveredImageIndex === i ? 'blur(10px) contrast(1.2) invert(0.25) saturate(3.25)' : 'none',
    //                                 transition: 'filter 0.5s ease-out',
    //                             }}
    //                         />
    //                         <img
    //                             src={src}
    //                             className="parallax__image"
    //                             alt={`image-${i}`}
    //                             style={{
                                    
    //                             }}
    //                         />
    //                     </motion.div>
    //                 ))
    //             }
    //         </>
    //     );
    // };

    // export default ParallaxImages;
