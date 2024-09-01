import React, { useEffect, useRef } from 'react';
import VideoBackground from '../components/HomePage/VideoBackground';
import TextOverlay from '../components/General/TextOverlay';
import Button from '../components/General/Buttons/Button';
import SwiperPortfolio from '../components/HomePage/SwiperPortfolio';
import Cursor from '../components/Cursor/Cursor';
//import TextAnimation from '../components/General/TextAnimation';
import { useScroll, useTransform, motion } from 'framer-motion';
import TextAnimationContainer from '../components/General/TextAnimationContainer';


const HomePage = () => {
    const homepage = useRef();
    const { scrollYProgress } = useScroll({
            target: homepage,
            offset: ["start start", "end end"]
    })

    const scale = useTransform(scrollYProgress, [ 0.5 , 1 ], [ 1 , 0.9 ])
    const rotate = useTransform(scrollYProgress, [ 0.5 , 1 ], [ 0 , -5 ])
    
    const inverseScale = useTransform(scrollYProgress, [0.5, 1], [0.8, 1]);
    const inverseRotate = useTransform(scrollYProgress, [0.5, 1], [5, 0]);

    return (
        <div className="homepage position-relative ">
            <Cursor />
            <section className="hero-homepage position-relative">
                <VideoBackground videoSrc="/DJI_0155.MP4" height="vh-100" />
                <TextOverlay textColor="text-light" textPosition="text-center" className="text-animated">
                    <h1>
                        <span className='d-block'>Capture</span>
                        <span className="h2 d-block">Brilliance </span>
                    </h1>
                    <Button href="/portfolio" text="See my work" className="text-light" />
                </TextOverlay>
            </section>
            <motion.div style={{scale, rotate}} className="bg-light position-sticky top-0 py-5 vh-100 align-content-center" scrollYProgress={scrollYProgress}>
                <TextAnimationContainer  text=" Photography is the art of capturing fleeting moments, turning the transient into something eternal.
                    Through the lens, everyday scenes transform into extraordinary glimpses of life.
                    It allows us to explore perspectives beyond our own, revealing the hidden depths of both nature and humanity." />
            </motion.div>
            <motion.div style={{scale: inverseScale,rotate: inverseRotate}} scrollYProgress={scrollYProgress} className="position-relative text-center" >
                <div className="position-absolute z-3 text-light text-center centered-button">
                    <Button className="text-light" text="Portfolio" /> | <Button className="text-light" text="Editorials" />
                </div>
                <SwiperPortfolio />
            </motion.div>
        </div>
    );
};

export default HomePage;
