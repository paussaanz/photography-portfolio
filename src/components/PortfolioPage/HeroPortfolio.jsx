
import { useRef } from "react";
import { motion, useScroll, useTransform } from 'framer-motion';
import ParallaxImages from "../General/ParallaxImages";

const HeroPortfolio = ({ images = [], word = "PORTFOLIO" }) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'end start']
    });

    const xsm = useTransform(scrollYProgress, [0, 1], [0, 250]);
    const sm = useTransform(scrollYProgress, [0, 1], [0, -220]);
    const md = useTransform(scrollYProgress, [0, 1], [0, -250]);
    const lg = useTransform(scrollYProgress, [0, 1], [0, -400]);

    const getYTransform = (size) => {
        switch (size) {
            case 'sm':
                return sm;
            case 'md':
                return md;
            case 'lg':
                return lg;
            default:
                return 0;
        }
    };

    return (
        <div ref={container} className="container hero-cabecera">
            {/* Sección de las imágenes con efecto parallax */}
            <div className="images-1 position-relative d-flex w-100 justify-content-center">
                <ParallaxImages images={images} getYTransform={getYTransform} containerNumber={1}/>
            </div>
            {/* Texto del portfolio */}
            <div className="body text-primary text-center d-flex justify-content-center align-items-end vh-100">
                <motion.h1 style={{ y: xsm }} className="m-0 text-uppercase text-light">
                    {word}
                </motion.h1>
            </div>

            <div className="images-2 position-relative d-flex w-100 justify-content-center">
                <ParallaxImages images={images} getYTransform={getYTransform} containerNumber={2}/>
            </div>
        </div>
    );
};

export default HeroPortfolio;
