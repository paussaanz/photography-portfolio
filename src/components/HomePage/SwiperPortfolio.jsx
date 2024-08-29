import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ImageBanner from "./ImageBanner";
import "swiper/css";
import { homeSwiperImages } from '../../../public/images';


export default function App() {
    return (
        <>
            <Swiper className="mySwiper">
                {homeSwiperImages.map((image, index) => (
                    <SwiperSlide key={index}>
                        <ImageBanner src={image.src} name={image.name} date={image.date} description={image.description} />
                    </SwiperSlide>
                ))}

            </Swiper>
        </>
    );
}
