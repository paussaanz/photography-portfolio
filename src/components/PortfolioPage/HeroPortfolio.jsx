import { useRef } from "react";
import { motion, useScroll, useTransform } from 'framer-motion';
import ParallaxImages from "../General/ParallaxImages";

const HeroPortfolio = ({ images = [], word = "PORTFOLIO" }) => {
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

    // Aumentar tamaño de letra
    const scale = useTransform(scrollYProgress, [0, 0.025], [0.8, 1]);

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
        <div ref={container} className="container hero-cabecera">
            <div className="images-1 position-relative d-flex w-100 justify-content-center">
                <ParallaxImages images={images} getYTransform={getYTransform} containerNumber={1} />
            </div>
            <div className="body text-primary text-center d-flex justify-content-center align-items-center vh-100"> {/* Alineación centrada */}
                <motion.div style={{ display: 'flex', position: 'absolute', bottom: '0' }} className="m-0 text-uppercase text-primary">
                    {word.split("").map((letter, index) => (
                        <motion.h1
                            key={index}
                            style={{ y: letterTransforms[index] }} // Asignar la transformación correspondiente
                        >
                            {letter}
                        </motion.h1>
                    ))}
                </motion.div>
            </div>

            {/* <div className="images-2 position-relative d-flex w-100 justify-content-center">
                <ParallaxImages images={images} getYTransform={getYTransform} containerNumber={2}/>
            </div> */}
        </div>
    );
};

export default HeroPortfolio;
