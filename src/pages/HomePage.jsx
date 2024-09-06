import React, { useRef, useState, useEffect } from 'react';
import VideoBackground from '../components/HomePage/VideoBackground';
import TextOverlay from '../components/General/TextOverlay';
import Button from '../components/General/Buttons/Button';
import SwiperPortfolio from '../components/HomePage/SwiperPortfolio';
import Cursor from '../components/Cursor/Cursor';
import { useScroll, useTransform, motion } from 'framer-motion';
import TextAnimationContainer from '../components/General/TextAnimationContainer';

const HomePage = () => {
    const homepage = useRef();
    const [isSwiperActive, setIsSwiperActive] = useState(false); // Estado para activar swiper
    const { scrollYProgress } = useScroll({
        target: homepage,
        offset: ["start start", "end end"]
    });

    // Animaciones de escala y rotación
    const scale = useTransform(scrollYProgress, [0.5, 1], [1, 0.8]);
    const rotate = useTransform(scrollYProgress, [0.5, 1], [0, -10]);
    
    const inverseScale = useTransform(scrollYProgress, [0.5, 1], [0.8, 1]);
    const inverseRotate = useTransform(scrollYProgress, [0.5, 1], [5, 0]);

    // Monitorear el valor de inverseScale
    useEffect(() => {
        const unsubscribe = inverseScale.onChange((latest) => {
            if (latest === 1) {
                setIsSwiperActive(true); // Activa el swiper cuando inverseScale es 1
            } else {
                setIsSwiperActive(false); // Desactiva el swiper si inverseScale es diferente de 1
            }
        });

        return () => unsubscribe(); // Limpieza cuando el componente se desmonta
    }, [inverseScale]);

    return (
        <div className="homepage position-relative" ref={homepage}>
            <Cursor />
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

            <motion.div style={{ scale, rotate }} className="bg-light position-sticky top-0 py-5 vh-100 align-content-center" scrollyprogress={scrollYProgress}>
                <TextAnimationContainer text="Photography is the art of capturing fleeting moments, turning the transient into something eternal. Through the lens, everyday scenes transform into extraordinary glimpses of life. It allows us to explore perspectives beyond our own, revealing the hidden depths of both nature and humanity." />
            </motion.div>

            <motion.div style={{ scale: inverseScale, rotate: inverseRotate }} scrollyprogress={scrollYProgress} className="position-relative text-center">
                <div className="position-absolute z-3 text-light text-center centered-button">
                    <Button className="text-light" text="Portfolio" /> | <Button className="text-light" text="Editorials" />
                </div>

                {/* Pasamos el estado de isSwiperActive al SwiperPortfolio */}
                <SwiperPortfolio isActive={isSwiperActive} />
            </motion.div>
        </div>
    );
};

export default HomePage;
