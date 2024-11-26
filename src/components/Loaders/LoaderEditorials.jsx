import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import ParallaxImages from "../General/ParallaxImages";
import gsap from "gsap";
import { useMediaQuery } from "../../contexts/MediaQueryContext";

const LoaderEditorials = ({ images = [], word = "EDITORIALS" }) => {
    const container = useRef(null);
    const { isMobile } = useMediaQuery();

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

    useEffect(() => {

        const tl = gsap.timeline({
            delay: 0
        });

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

        })
        tl.to(".portfolio__hero-mobile-title", {
            top: '100%',
            duration: 2,
            delay: -2,
            ease: "power4.inOut"
        })
    }, []);

    // Nuevos valores iniciales de desplazamiento para cada letra (para empezar más abajo)
    const initialYPositions = [700, 720, 680, 740, 750, 710, 690, 760, 730]; // Aumentar más para empezar más abajo

    // Ajuste de los rangos de scroll para que se alineen en el centro de la pantalla
    const scrollRanges = [
        [0, 0.35], // Letras más rápidas
        [0, 0.55],
        [0, 0.45], // Letras que se alinean un poco antes
        [0, 0.55],
        [0, 0.5],
        [0, 0.6],
        [0, 0.4], // Letras más rápidas
        [0, 0.65],
        [0, 0.35] // Las más rápidas
    ];

    // Crear transformaciones para cada letra
    const letterTransforms = word.split("").map((_, index) => {
        const initialY = initialYPositions[index % initialYPositions.length]; // Tomar desplazamiento según el índice
        const [start, end] = scrollRanges[index % scrollRanges.length]; // Tomar el rango de scroll según el índice
        return useTransform(scrollYProgress, [start, end], [initialY, 0]); // Mapeo desde initialY hasta 0 en su rango
    });


    return (
        <>
            <div ref={container} className="container-bem editorials__hero">
                <div className="editorials__hero-images">
                    <ParallaxImages images={images} getYTransform={getYTransform} classname="editorials__hero-images-parallax editorials__hero-images-parallax-loader" />
                </div>
                <div className="text-color--primary text-align--center flex flex--j-center flex--a-end d--vh-100">
                    {
                        isMobile ? (
                            <motion.div
                                style={{ top: '0%' }}
                                className="portfolio__hero-mobile-title  m--0 text-transform--uppercase position--absolute text-color--primary overflow--hidden flex flex--a-center flex--j-center"
                            >
                                <h1 className="portfolio__hero-title">
                                    {word}
                                </h1>

                            </motion.div>
                        ) : (
                            <motion.div style={{ bottom: '-380px' }} className="editorials__hero-title-loader m--0 text-transform--uppercase position--absolute text-color--primary d--vw-100 overflow--hidden flex flex--a-center flex--j-center">
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

export default LoaderEditorials;

