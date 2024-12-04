import { useRef, useEffect } from "react";
import gsap from 'gsap';
import { motion, useScroll } from 'framer-motion';
import ParallaxImages from "../General/ParallaxImages";
import { useMediaQuery } from "../../contexts/MediaQueryContext";
import { useLetterTransforms, getYTransform } from "../../assets/js/animations";

const LoaderPortfolio = ({ images = [], word = "PORTFOLIO" }) => {
    const { isMobile } = useMediaQuery();
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'end center'] // Adjust scroll to focus in the center
    });

    const letterTransforms = useLetterTransforms(word, scrollYProgress);

    // Handle GSAP animations with cleanup

    useEffect(() => {
        const tl = gsap.timeline({ delay: 0 });

        tl.to(".portfolio__hero-images-parallax-loader", {
            opacity: 1,
            stagger: 0.25,
            duration: 2,
            ease: "power4.inOut"
        });

        if (isMobile) {
            tl.to(".portfolio__hero-mobile-title", {
                top: "100%",
                duration: 2,
                ease: "power4.inOut"
            });
        } else {
            tl.to(".portfolio__hero-title-loader", {
                bottom: -65,
                duration: 2,
                delay: -2,
                ease: "power4.inOut"
            });
        }

        return () => {
            tl.kill();
        };
    }, [isMobile]);

    // Conditional JSX content
    const titleContent = isMobile ? (
        <motion.div
            style={{ top: '0%' }}
            className="portfolio__hero-mobile-title m--0 text-transform--uppercase position--absolute text-color--primary overflow--hidden flex flex--a-center flex--j-center"
        >
            <h1 className="portfolio__hero-title">{word}</h1>
        </motion.div>
    ) : (
        <motion.div
            style={{ bottom: '-280px' }}
            className="portfolio__hero-title-loader m--0 text-transform--uppercase position--absolute text-color--primary d--vw-100 overflow--hidden flex flex--a-center flex--j-center"
        >
            {word.split("").map((letter, index) => (
                <motion.h1
                    key={index}
                    style={{ y: letterTransforms[index] }}
                    className="portfolio__hero-title"
                >
                    {letter}
                </motion.h1>
            ))}
        </motion.div>
    );

    return (
        <div ref={container} className="container-bem portfolio__hero">
            <div className="portfolio__hero-images">
                <ParallaxImages images={images} getYTransform={getYTransform(scrollYProgress)} classname="portfolio__hero-images-parallax portfolio__hero-images-parallax-loader" />
            </div>
            <div className="text-color--primary text-align--center flex flex--j-center flex--a-center d--vh-100">
                {titleContent}
            </div>
        </div>
    );
};

export default LoaderPortfolio;
