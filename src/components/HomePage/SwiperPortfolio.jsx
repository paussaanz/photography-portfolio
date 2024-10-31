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
            className="position--sticky d--vh-300 background--transparent"
            style={{ rotate, scale }} // Se le da una altura significativa para permitir el scroll vertical
        >
            <div className="position--sticky position--top-0 flex d--vh-100 flex--a-center flex--j-start overflow--clip">
                <div className="home__swiper-animation-button--centered position--absolute text-align--center text-color--light">
                    <Button className="text-color--light" text="Portfolio" onClick={handleShowPortfolio} /> |
                    <Button className="text-color--light" text="Editorials" onClick={handleShowEditorials} />
                </div>
                <motion.div
                    className="home__swiper-animation-images"
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
