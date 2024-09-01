import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ImageBanner from "./ImageBanner";
import "swiper/css";
import { homeSwiperImages } from '../../assets/js/images';


export default function App() {
    return (
        <>
            <Swiper 
             loop={true}
             className="mySwiper">
                {homeSwiperImages.map((image, index) => (
                    <SwiperSlide key={index}>
                        <ImageBanner src={image.src} name={image.name} date={image.date} description={image.description} />
                    </SwiperSlide>
                ))}

            </Swiper>
        </>
    );
}
