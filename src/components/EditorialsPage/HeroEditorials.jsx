import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ParallaxImages from "../General/ParallaxImages";

const HeroEditorials = ({images = []}) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'end start']
    });

    const xsm = useTransform(scrollYProgress, [0, 1], [0, 180]);
    const sm = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const md = useTransform(scrollYProgress, [0, 1], [0, -450]);
    const lg = useTransform(scrollYProgress, [0, 1], [0, -600]);

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
        <>
            <div ref={container} className="container hero-editorials">
            <div className="images-3 position-relative d-flex w-100 justify-content-center">
                <ParallaxImages images={images} getYTransform={getYTransform} containerNumber={3}/>
            </div>
            <div className="body text-color--primary text-center d-flex justify-content-center align-items-end vh-100">
                <motion.h1 style={{ y: xsm }} className="mb-5 text-uppercase text-color--primary">
                    EDITORIALS
                </motion.h1>
            </div>

            
        </div>
        </>
    );
};

export default HeroEditorials;