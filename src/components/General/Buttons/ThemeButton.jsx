import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../../contexts/ThemeContext";

const ThemeButton = () => {
    const { theme, toggleTheme } = useTheme();
    const isDarkMode = theme === "dark-theme";
    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;
    }, []);

    const svgVariants = {
        moon: { rotate: 40 },
        sun: { rotate: 90 },
    };

    const circleVariants = {
        moon: { r: 9 },
        sun: { r: 5 },
    };

    const maskedCircleVariants = {
        moon: { cx: 12, cy: 4 }, // Definimos todos los atributos
        sun: { cx: 30, cy: 0 },
    };

    const linesVariants = {
        moon: { opacity: 0 },
        sun: { opacity: 1 },
    };

    return (
        <div className="theme__button-container">
            <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={isDarkMode ? "var(--cor-secondary)" : "var(--cor-secondary)"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={svgVariants}
                animate={isDarkMode ? "moon" : "sun"}
                transition={{
                    duration: mounted.current ? 0.5 : 0,
                    ease: [0.42, 0, 0.58, 1],
                }}
                style={{ cursor: "pointer" }}
                onClick={() => toggleTheme((prev) => !prev)}
            >
                <mask id="mask">
                    <rect x="0" y="0" width="100%" height="100%" fill="white" />
                    <motion.circle
                        variants={maskedCircleVariants}
                        animate={isDarkMode ? "moon" : "sun"}
                        transition={{
                            duration: mounted.current ? 0.5 : 0,
                            ease: [0.42, 0, 0.58, 1],
                        }}
                        initial={{
                            cx: 12, // Valor inicial seguro
                            cy: 4, // Valor inicial seguro
                            r: 9,  // Valor inicial seguro
                        }}
                        fill="black"
                    />
                </mask>
                <motion.circle
                    variants={circleVariants}
                    animate={isDarkMode ? "moon" : "sun"}
                    transition={{
                        duration: mounted.current ? 0.5 : 0,
                        ease: [0.42, 0, 0.58, 1],
                    }}
                    initial={{
                        cx: 12, // Valor inicial seguro
                        cy: 12, // Valor inicial seguro
                        r: 9,  // Valor inicial seguro
                    }}
                    fill={isDarkMode ? "var(--cor-secondary)" : "var(--cor-secondary)"}
                    cx="12" // Respaldo de seguridad
                    cy="12" // Respaldo de seguridad
                    r="9" // Respaldo de seguridad
                    mask="url(#mask)"
                />

                <motion.g
                    variants={linesVariants}
                    animate={isDarkMode ? "moon" : "sun"}
                    transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
                    fill="currentColor"
                >
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </motion.g>
            </motion.svg>
        </div>
    );
};

export default ThemeButton;
