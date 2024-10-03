// import React, { useEffect, useRef, useState } from "react";
// import gsap from "gsap";

// const SwiperEditorialCard = ({ images }) => {
//     const sliderRef = useRef(null);
//     const sliderWrapperRef = useRef(null);
//     const [target, setTarget] = useState(0);
//     const [current, setCurrent] = useState(0);
//     const ease = 0.1; // Tasa de suavizado más baja para un movimiento más fluido
//     const [maxScroll, setMaxScroll] = useState(0);

//     const lerp = (start, end, factor) => start + (end - start) * factor;

//     const updateScaleAndPosition = () => {
//         const slides = sliderWrapperRef.current?.querySelectorAll('.slide'); // Usar el encadenamiento opcional
//         if (!slides) return; // Salir si no hay slides

//         const windowWidth = window.innerWidth;

//         slides.forEach((slide) => {
//             const rect = slide.getBoundingClientRect();
//             const centerPosition = (rect.left + rect.right) / 2;
//             const distanceFromCenter = centerPosition - windowWidth / 2;
//             let scale, offsetX;

//             // Escalar y ajustar el desplazamiento basado en la distancia desde el centro
//             if (distanceFromCenter > 0) {
//                 scale = Math.min(1.75, 1 + distanceFromCenter / windowWidth);
//                 offsetX = (scale - 1) * 300; // Desplazamiento a la derecha
//             } else {
//                 scale = Math.max(0.5, 1 - Math.abs(distanceFromCenter) / windowWidth);
//                 offsetX = 0; // Sin desplazamiento
//             }

//             gsap.set(slide, { scale: scale, x: offsetX });
//         });
//     };

//     const update = () => {
//         setCurrent((prevCurrent) => {
//             const newCurrent = lerp(prevCurrent, target, ease);
//             if (sliderWrapperRef.current) {
//                 gsap.set(sliderWrapperRef.current, { x: -newCurrent }); // Aplicar desplazamiento negativo
//             }
//             updateScaleAndPosition();
//             return newCurrent;
//         });

//         requestAnimationFrame(update); // Llama a la función de actualización en el siguiente frame
//     };

//     useEffect(() => {
//         const resizeHandler = () => {
//             if (sliderWrapperRef.current) {
//                 setMaxScroll(sliderWrapperRef.current.scrollWidth - window.innerWidth);
//             }
//         };

//         window.addEventListener('resize', resizeHandler);
//         resizeHandler(); // Inicializa maxScroll en el montaje

//         const wheelHandler = (e) => {
//             setTarget((prevTarget) => {
//                 let newTarget = prevTarget + e.deltaY; // Aumentar el objetivo basado en el desplazamiento
//                 newTarget = Math.max(0, Math.min(newTarget, maxScroll)); // Limitar el desplazamiento dentro del rango
//                 return newTarget;
//             });
//         };

//         window.addEventListener('wheel', wheelHandler);
//         update(); // Inicia la animación

//         return () => {
//             window.removeEventListener('resize', resizeHandler);
//             window.removeEventListener('wheel', wheelHandler);
//         };
//     }, [maxScroll]); // Actualiza el efecto cuando cambia maxScroll

//     return (
//         <div ref={sliderRef} className="vh-300 position-sticky">
//             <div className="position-sticky top-0 d-flex vh-100 align-items-center justify-content-start gap-5" ref={sliderWrapperRef}>
//                 {images.map(({ src }, i) => (
//                     <div key={i} className="slide d-flex">
//                         <img src={src} alt={`Slide ${i}`} />
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default SwiperEditorialCard;


import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SwiperEditorialCard = ({ images }) => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    const imageStartWidth = 900; // Image width in pixels
    const imageEndWidth = 940; // Image width in pixels
    const gap = 3 * 16; // 3rem in pixels (1rem = 16px)
    const viewportWidth = window.innerWidth; // Viewport width
    const viewportCenter = viewportWidth / 2; // Center of the viewport
    const totalImages = images.length;
    const totalScrollableWidth = (imageStartWidth + gap) * totalImages;

    // Calculate the final and initial positions for xTransform
    const finalPosition = `-${((totalImages - 1) * (imageEndWidth + gap)) - (viewportWidth / 2 - imageEndWidth / 2)}px`;
    const initialPosition = `${(viewportWidth / 2 - imageStartWidth / 2)}px`;

    // Horizontal position transform for all images
    const xTransform = useTransform(scrollYProgress, [0, 1], [initialPosition, finalPosition]);

    return (
        <motion.div className="vh-300 position-sticky" ref={sectionRef}>
            <motion.div
                className="position-sticky top-0 d-flex vh-100 align-items-center justify-content-start gap-5"
                style={{ x: xTransform }} // Apply the xTransform for horizontal scrolling
            >
                {images.map((image, i) => {
                   // Calculate the center of the current image relative to the total scrollable width
                   const imageCenter = (i + 0.5) * (imageStartWidth + gap); // Center of the image in the scrollable area
                    
                   const startThreshold = (imageCenter - viewportCenter) / totalScrollableWidth; 
                   const endThreshold = startThreshold + 0.2; // Adjust this value for when scaling should stop
                   console.log(imageCenter, "imageCenter")

                   console.log(startThreshold, endThreshold)
                   const scaleTransform = useTransform(scrollYProgress, [startThreshold, endThreshold], [1, 0.6]);

                   return (
                        <motion.div
                            key={i}
                            className="slide d-flex"
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
                            <img src={image.src} alt={`Slide ${i}`} />
                        </motion.div>
                    );
                })}
            </motion.div>
        </motion.div>
    );
};

export default SwiperEditorialCard;


