import React, { useEffect, useRef } from 'react';
import VideoBackground from '../components/HomePage/VideoBackground';
import TextOverlay from '../components/General/TextOverlay';
import Button from '../components/General/Buttons/Button';
import SwiperPortfolio from '../components/HomePage/SwiperPortfolio';
import { useScroll, useTransform, motion, useMotionValue } from 'framer-motion';
import TextAnimationContainer from '../components/General/TextAnimationContainer';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
    const homepageRef = useRef(); // Renombramos para evitar duplicidad
    const location = useLocation();

    const { scrollYProgress } = useScroll({
        target: homepageRef,
        offset: ["start start", "center center"]
    });

    const scale = useMotionValue(1);
    const rotate = useMotionValue(0);

    useEffect(() => {
        scale.set(1);
        rotate.set(0);

        const unsubscribe = scrollYProgress.onChange((value) => {
            const newScale = 1 - 0.2 * value;
            const newRotate = 0 + 0.5 * value;

            scale.set(newScale);
            rotate.set(newRotate);
        });

        return () => {
            // Limpia el efecto al desmontar
            unsubscribe();
        };
    }, [scrollYProgress, location.pathname, scale, rotate]);

    return (
        <div ref={homepageRef} data-barba="container" className="homepage position-relative barba-container">
            <section className="hero-homepage position-relative">
                <VideoBackground videoSrc="/DJI_0155.MP4" height="vh-100" />
                <TextOverlay textColor="text-light" textPosition="center" className="text-animated text-center">
                    <h1>
                        <span className='d-block'>Capture</span>
                        <span className="h2 d-block">Brilliance</span>
                    </h1>
                    <Button href="/portfolio" text="See my work" className="text-light" />
                </TextOverlay>
            </section>

            <section className="text-animation-homepage swiper-portfolio-homepage">
                <motion.div
                    key={location.pathname}
                    style={{ scale, rotate }}
                    className="position-sticky top-0 py-5 vh-100 align-content-center">
                    <TextAnimationContainer text="Photography is the art of capturing fleeting moments, turning the transient into something eternal. Through the lens, everyday scenes transform into extraordinary glimpses of life. It allows us to explore perspectives beyond our own, revealing the hidden depths of both nature and humanity." />
                </motion.div>

                <SwiperPortfolio />
            </section>
        </div>
    );
};

export default HomePage;
