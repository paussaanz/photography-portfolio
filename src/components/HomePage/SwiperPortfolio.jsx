import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ImageBanner from "./ImageBanner";
import { homeSwiperImages, editorialSwiperImages } from '../../assets/js/images';
import Button from "../General/Buttons/Button";

const SwiperPortfolio = () => {
    const sectionRef = useRef(null);
    const [activeContent, setActiveContent] = useState('Portfolio');

    const handleShowPortfolio = () => setActiveContent('Portfolio');
    const handleShowEditorials = () => setActiveContent('Editorials');

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    const rotate = useTransform(scrollYProgress, [0, 0.05], [5, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.025], [0.8, 1]);

    const totalImages = homeSwiperImages.length;
    const finalPosition = `-${(totalImages - 1) * 100}vw`;

    const xTransform = useTransform(scrollYProgress, [0.025, 1], ['5vw', finalPosition]);

    return (
        <motion.div
            ref={sectionRef}
            className="position-sticky vh-300 bg-transparent"
            style={{ height: '300vh', rotate, scale }} // Se le da una altura significativa para permitir el scroll vertical
        >
            <div className="position-sticky top-0 d-flex vh-100 align-items-center justify-content-start">
                <div className="position-absolute z-3 text-light text-center centered-button">
                    <Button className="text-light" text="Portfolio" onClick={handleShowPortfolio} /> |
                     <Button className="text-light" text="Editorials" onClick={handleShowEditorials} />
                </div>
                <motion.div
                    className="swiper-images d-flex"
                    style={{ x: xTransform }} 
                >

                    {activeContent === 'Portfolio' ? (
                        homeSwiperImages.map((image, index) => (
                            <ImageBanner
                                key={index}
                                src={image.src}
                                name={image.name}
                                date={image.date}
                                description={image.description}
                                url={image.url}
                            />
                        ))
                    ) : (
                        editorialSwiperImages.map((image, index) => (
                            <ImageBanner
                                key={index}
                                src={image.src}
                                name={image.name}
                                date={image.date}
                                description={image.description}
                                url={image.url}
                            />
                        ))
                    )}
                </motion.div>
            </div>
        </motion.div >
    );
};

export default SwiperPortfolio;
