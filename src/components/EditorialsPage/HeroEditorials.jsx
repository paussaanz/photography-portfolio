import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ParallaxImages from "../General/ParallaxImages";
import { useMediaQuery } from "../../contexts/MediaQueryContext";
import { getYTransform, useLetterTransforms } from "../../assets/js/animations";

const HeroEditorials = ({ images = [], word = "EDITORIALS" }) => {
    const container = useRef(null);
    const { isMobile } = useMediaQuery();
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'end start']
    });

    const yTransforms = getYTransform(scrollYProgress);
    const letterTransforms = useLetterTransforms(word, scrollYProgress);


    return (
        <>
            <div ref={container} className="container-bem editorials__hero">
                <div className="editorials__hero-images">
                    <ParallaxImages images={images} getYTransform={yTransforms}
                        classname="editorials__hero-images-parallax" />
                </div>
                <div className="text-color--primary text-align--center flex flex--j-center flex--a-end d--vh-100">
                    {
                        isMobile ? (
                            <div className="portfolio__hero-mobile-title" >
                                <h1 className="portfolio__hero-title">
                                    {word}
                                </h1>
                            </div>
                        ) : (
                            <motion.div style={{ bottom: '-65px' }} className=" m--0 text-transform--uppercase position--absolute text-color--primary d--vw-100 overflow--hidden flex flex--a-center flex--j-center">
                                {word.split("").map((letter, index) => (
                                    <motion.h1
                                        key={index}
                                        style={{ y: letterTransforms[index] }}
                                        className="editorials__hero-title" // Asignar la transformación correspondiente
                                    >
                                        {letter}
                                    </motion.h1>
                                ))}
                            </motion.div>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default HeroEditorials;

