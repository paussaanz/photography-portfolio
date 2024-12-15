import { motion, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import ParallaxImages from "../General/ParallaxImages";
import gsap from "gsap";
import { useMediaQuery } from "../../contexts/MediaQueryContext";
import { getYTransform, useLetterTransforms } from "../../assets/js/animations";

const LoaderEditorials = ({ images = [], word = "EDITORIALS" }) => {
    const container = useRef(null);
    const { isMobile } = useMediaQuery();
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'end start']
    });

    const letterTransforms = useLetterTransforms(word, scrollYProgress);

    useEffect(() => {
        const tl = gsap.timeline({ delay: 0 });

        tl.to(".editorials__hero-images-parallax-loader", {
            opacity: 1,
            stagger: 0.25,
            duration: 2,
            ease: "power4.inOut"
        });

        tl.to(".editorials__hero-title-loader", {
            bottom: -65,
            duration: 2,
            delay: -2,
            ease: "power4.inOut"
        });

        tl.to(".portfolio__hero-mobile-title", {
            top: '100%',
            duration: 2,
            delay: -2,
            ease: "power4.inOut"
        });

        return () => tl.kill(); // Cleanup GSAP timeline on unmount
    }, [isMobile]);

    const TitleComponent = isMobile ? (
        <motion.div
            style={{ top: '0%' }}
            className="portfolio__hero-mobile-title m--0 text-transform--uppercase position--absolute text-color--primary overflow--hidden flex flex--a-center flex--j-center"
        >
            <h1 className="portfolio__hero-title">{word}</h1>
        </motion.div>
    ) : (
        <motion.div
            style={{ bottom: '-380px' }}
            className="editorials__hero-title-loader m--0 text-transform--uppercase position--absolute text-color--primary d--vw-100 overflow--hidden flex flex--a-center flex--j-center"
        >
            {word.split("").map((letter, index) => (
                <motion.h1
                    key={index}
                    style={{ y: letterTransforms[index] }}
                    className="editorials__hero-title"
                >
                    {letter}
                </motion.h1>
            ))}
        </motion.div>
    );

    return (
        <>
            <div ref={container} className="container-bem editorials__hero">
                <div className="editorials__hero-images">
                    <ParallaxImages images={images} getYTransform={getYTransform(scrollYProgress)} classname="editorials__hero-images-parallax editorials__hero-images-parallax-loader" />
                </div>
                <div className="text-color--primary text-align--center flex flex--j-center flex--a-end d--vh-100">
                    {TitleComponent}
                </div>
            </div>
        </>
    );
};

export default LoaderEditorials;
