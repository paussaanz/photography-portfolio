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

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ImageBanner from "./ImageBanner";
import { homeSwiperImages } from '../../assets/js/images';

const SwiperPortfolio = () => {
    const ref = useRef(null);

  const {scrollYProgress} = useScroll({ target: ref});

  const x = useTransform(scrollYProgress, [0,1], ['0%', '-60%'])
    return (
        <section ref={ref} className="relative vh-300 bg-transparent">
            <div className=" position-sticky top-0 d-flex vh-100 align-items-center justify-content-start overflow-hidden ">
                
                    <motion.div className="swiper-images " style={{x}}>
                        {homeSwiperImages.map((image, index) => (
                            <ImageBanner key={index} src={image.src} name={image.name} date={image.date} description={image.description} />
                        ))}
                    </motion.div>
                
            </div>
        </section>
    );
}

export default SwiperPortfolio;
