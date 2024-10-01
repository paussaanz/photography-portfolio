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

    const totalImages = images.length;
    const finalPosition = `-${(totalImages - 1) * 100}vw`;

    // Transformación para el desplazamiento
    const xTransform = useTransform(scrollYProgress, [0, 1], ['0%', finalPosition]);

    return (
        <motion.div className="vh-300 position-sticky" ref={sectionRef}>
            <motion.div 
                className="position-sticky top-0 d-flex vh-100 align-items-center justify-content-start gap-5"
                style={{ x: xTransform }} // Aplicamos el desplazamiento horizontal sincronizado
            >
                {images.map(({ src }, i) => (
                    <motion.div 
                        key={i} 
                        className="slide d-flex" 
                        style={{ display: "inline-block", scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.5]) }} // Escala independiente para cada imagen
                    >
                        <img src={src} alt={`Slide ${i}`} />
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default SwiperEditorialCard;


