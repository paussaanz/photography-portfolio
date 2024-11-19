import gsap from "gsap";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from 'framer-motion';
import ParallaxImages from "../General/ParallaxImages";



const LoaderPortfolio = ({ images = [], word = "PORTFOLIO" }) => {

    useEffect(() => {

        const tl = gsap.timeline({
            delay: 0
        });

        tl.to(".portfolio__hero-images-parallax-loader", {
            opacity: 1,
            stagger:0.25,
            duration: 2,
            ease: "power4.inOut"
        });

        tl.to(".portfolio__hero-title-loader", {
            bottom: -65,
            duration: 2,
            delay: -2,
            ease: "power4.inOut"
        });

    }, []);


    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'end center'] // Ajuste de scroll para enfocar en el centro
    });

    // Parámetros para las imágenes en parallax
    const xsm = useTransform(scrollYProgress, [0, 1], [0, 250]);
    const sm = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const md = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const lg = useTransform(scrollYProgress, [0, 1], [0, -400]);

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
        <div ref={container}className="container-bem portfolio__hero">
            <div className="portfolio__hero-images">
                <ParallaxImages images={images} getYTransform={getYTransform} classname="portfolio__hero-images-parallax portfolio__hero-images-parallax-loader" />
            </div>
            <div className="text-color--primary text-align--center flex flex--j-center flex--a-center d--vh-100"> {/* Alineación centrada */}
                <motion.div style={{ bottom: '-380px' }} className="portfolio__hero-title-loader m--0 text-transform--uppercase position--absolute text-color--primary d--vw-100 overflow--hidden flex flex--a-center flex--j-center">
                    {word.split("").map((letter, index) => (
                        <motion.h1
                            key={index}
                            style={{ y: letterTransforms[index] }}
                            className="portfolio__hero-title" // Asignar la transformación correspondiente
                        >
                            {letter}
                        </motion.h1>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default LoaderPortfolio;