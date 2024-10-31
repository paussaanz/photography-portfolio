import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ParallaxImages from "../General/ParallaxImages";

const HeroEditorials = ({ images = [] }) => {
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
            <div ref={container} className="container-bem editorials__hero">
                <div className="editorials__hero-images">
                    <ParallaxImages images={images} getYTransform={getYTransform}  classname="editorials__hero-images-parallax" />
                </div>
                <div className="text-color--primary text-align--center flex flex--j-center flex--a-end d--vh-100">
                    <motion.h1 style={{ y: xsm }} 
                    className="editorials__hero-title m--b-5">
                        EDITORIALS
                    </motion.h1>
                </div>


            </div>
        </>
    );
};

export default HeroEditorials;