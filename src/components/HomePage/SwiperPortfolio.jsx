// import React, { useRef, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import ImageBanner from "./ImageBanner";
// import "swiper/css";
// import { homeSwiperImages } from '../../assets/js/images';


// export default function App() {
//     return (
//         <>

//             <Swiper 
//              loop={true}
//              className="mySwiper">
//                 {homeSwiperImages.map((image, index) => (
//                     <SwiperSlide key={index}>
//                         <ImageBanner src={image.src} name={image.name} date={image.date} description={image.description} />
//                     </SwiperSlide>
//                 ))}

//             </Swiper>
//         </>
//     );
// }

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ImageBanner from "./ImageBanner";
import { homeSwiperImages } from '../../assets/js/images';

const SwiperPortfolio = ({ inverseScale }) => {
    const ref = useRef(null);
    const [canScroll, setCanScroll] = useState(false);

    const { scrollYProgress } = useScroll({ target: ref });

    // Definimos useTransform sin condicionales
    const x = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);

    useEffect(() => {
        console.log("CURRENT", inverseScale);
        // Comprobamos el valor de inverseScale.current en lugar de inverseScale
        if (inverseScale === 1) {
            setCanScroll(true);
        } else {
            // setCanScroll(false);
        }
    }, [inverseScale]);

    return (
        <section ref={ref} className="relative vh-300 bg-transparent">
            <div className="position-sticky top-0 d-flex vh-100 align-items-center justify-content-start overflow-hidden">
                
                <motion.div 
                    className="swiper-images" 
                    // Si canScroll es false, x es '0%'
                    style={{ x: canScroll ? x : '0%' }}  
                >
                    {homeSwiperImages.map((image, index) => (
                        <ImageBanner 
                            key={index} 
                            src={image.src} 
                            name={image.name} 
                            date={image.date} 
                            description={image.description} 
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default SwiperPortfolio;
