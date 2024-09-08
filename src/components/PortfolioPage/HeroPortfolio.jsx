// import React, { useRef } from 'react';
// import { homeSwiperImages } from '../../assets/js/images';
// import { useScroll, useTransform, motion } from 'framer-motion';

// const HeroPortfolio = () => {

//     const word = "PORTFOLIO"

//     const container = useRef(null);
//     const { scrollYProgress } = useScroll({
//         target: container,
//         offset: ['start end', 'end start']
//     })
//     const sm = useTransform(scrollYProgress, [0, 1], [0, -50]);
//     const md = useTransform(scrollYProgress, [0, 1], [0, -150]);
//     const lg = useTransform(scrollYProgress, [0, 1], [0, -250]);


//     return (
//         <div ref={container} className="container text-primary">
//             <div className="images">
//                 {homeSwiperImages.map((image, i) => (
//                     <motion.div
//                         style={{ y: image.y }}
//                         key={`i_${i}`}
//                         className="imageContainer"
//                     >
//                         <img
//                             key={i}
//                             src={image.src}
//                             className="img-fluid"
//                             alt={`image_${i}`}
//                         />
//                     </motion.div>
//                 ))}
//             </div>

//             <div className="body ">
//             <div className="word">
//                     <p>
//                         {
//                             word.split("").map((letter, i) => {
//                                 const y = useTransform(scrollYProgress, [0, 1], [0, Math.floor(Math.random() * -75) - 25])
//                                 return <motion.span style={{top: y}} key={`l_${i}`} >{letter}</motion.span>
//                             })
//                         }
//                     </p>
//                 </div>
//             </div>
//         </div>

//     );
// };

// export default HeroPortfolio;

import { useRef } from "react";
import { portfolioParallaxHero } from '../../assets/js/images';
import { motion, useScroll, useTransform } from 'framer-motion';

const word = "PORTFOLIO";

const HeroPortfolio =() => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'end start']
    })
    const xsm = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const sm = useTransform(scrollYProgress, [0, 1], [0, -220]);
    const md = useTransform(scrollYProgress, [0, 1], [0, -250]);
    const lg = useTransform(scrollYProgress, [0, 1], [0, -400]);

    const getYTransform = (size) => {
        switch (size) {
            case 'sm':
                return sm;
            case 'md':
                return md;
            case 'lg':
                return lg;
            default:
                return 0;
        }
    }

    return (
        <div ref={container} className="container">
            <div className="images position-relative d-flex w-100 justify-content-center">
                {
                    portfolioParallaxHero.map(({ src, y }, i) => {
                        return <motion.div style={{ y: getYTransform(y) }} key={`i_${i}`} className="position-absolute image-container">
                            <img
                                src={src}
                                placeholder="blur"
                                className="h-100 w-100 object-fit-cover"
                                alt="image"
                            />
                        </motion.div>
                    })
                }
            </div>
            <div className="body text-primary text-center d-flex justify-content-center align-items-end vh-100">
                <motion.h1 style={{ y: xsm }} className="m-0 text-uppercase">PORTFOLIO</motion.h1>
            </div>

            
        </div>
    )
}

export default HeroPortfolio;
