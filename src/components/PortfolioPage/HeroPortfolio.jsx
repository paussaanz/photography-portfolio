import { useRef } from "react";
import { portfolioParallaxHero } from '../../assets/js/images';
import { motion, useScroll, useTransform } from 'framer-motion';

const word = "PORTFOLIO";

const HeroPortfolio =() => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'end start']
    })
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
    }

    return (
        <div ref={container} className="container hero-cabecera">
            <div className="images position-relative d-flex w-100 justify-content-center">
                {
                    portfolioParallaxHero.map(({ src, y }, i) => {
                        return <motion.div style={{ y: getYTransform(y) }} key={`i_${i}`} className="position-absolute image-container">
                            <img
                                src={src}
                                placeholder="blur"
                                className="h-100 w-100 object-fit-cover"
                                alt="image"
                            />
                        </motion.div>
                    })
                }
            </div>
            <div className="body text-primary text-center d-flex justify-content-center align-items-end vh-100">
                <motion.h1 style={{ y: xsm }} className="m-0 text-uppercase text-light">PORTFOLIO</motion.h1>
            </div>

            <div className="images-2 position-relative d-flex w-100 justify-content-center">
                {
                    portfolioParallaxHero.map(({ src, y }, i) => {
                        return <motion.div style={{ y: getYTransform(y) }} key={`i_${i}`} className="position-absolute image-container-2">
                            <img
                                src={src}
                                placeholder="blur"
                                className="h-100 w-100 object-fit-cover"
                                alt="image"
                            />
                        </motion.div>
                    })
                }
            </div>
        </div>
    )
}

export default HeroPortfolio;
