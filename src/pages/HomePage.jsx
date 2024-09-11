import React, { useRef } from 'react';
import VideoBackground from '../components/HomePage/VideoBackground';
import TextOverlay from '../components/General/TextOverlay';
import Button from '../components/General/Buttons/Button';
import SwiperPortfolio from '../components/HomePage/SwiperPortfolio';
import { useScroll, useTransform, motion } from 'framer-motion';
import TextAnimationContainer from '../components/General/TextAnimationContainer';

const HomePage = () => {
    const homepageRef = useRef(); // Renombramos para evitar duplicidad
    const { scrollYProgress } = useScroll({
        target: homepageRef,
        offset: ["start start", "center center"]
    });

    // Escalado y rotación basado en el scroll
    const scale = useTransform(scrollYProgress, [0.5, 1], [1, 0.8]);
    const rotate = useTransform(scrollYProgress, [0.5, 1], [0, -5]);

    return (
        <div className="homepage position-relative" >
            <section className="hero-homepage position-relative">
                <VideoBackground videoSrc="/DJI_0155.MP4" height="vh-100" />
                <TextOverlay textColor="text-light" textPosition="text-center" className="text-animated">
                    <h1>
                        <span className='d-block'>Capture</span>
                        <span className="h2 d-block">Brilliance</span>
                    </h1>
                    <Button href="/portfolio" text="See my work" className="text-light" />
                </TextOverlay>
            </section>

            
                <motion.div
                    style={{ scale, rotate }}
                    className="bg-light position-sticky top-0 py-5 vh-100 align-content-center">
                    <TextAnimationContainer text="Photography is the art of capturing fleeting moments, turning the transient into something eternal. Through the lens, everyday scenes transform into extraordinary glimpses of life. It allows us to explore perspectives beyond our own, revealing the hidden depths of both nature and humanity." />
                </motion.div>

                <SwiperPortfolio /> 
                
        </div>
    );
};

export default HomePage;
