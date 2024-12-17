import React, { useState, useEffect, useRef } from "react";
import InfiniteCarrusel from "./InfiniteCarrusel";
import Scene3D from "./Scene3D";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "../../contexts/MediaQueryContext";
import { motion } from "framer-motion";

const DraggableFooter = () => {
    const footerRef = useRef(null); // Referencia al footer para definir los límites del drag

    const images = [
        "https://via.placeholder.com/100",
        "https://via.placeholder.com/100",
        "https://via.placeholder.com/100",
        "https://via.placeholder.com/100",
        "https://via.placeholder.com/100",
    ];

    return (
        <footer
            ref={footerRef}
            style={{
                height: "100vh",
                width: "100%",
                position: "relative",
                overflow: "hidden",
                backgroundColor: "#f0f0f0",
            }}
        >
            {images.map((src, index) => (
                <motion.div
                    key={index}
                    drag
                    dragConstraints={footerRef} // Define los límites del footer
                    dragMomentum={false} // Evita que la imagen siga moviéndose tras soltarla
                    whileDrag={{ scale: 1.1 }} // Efecto visual al arrastrar
                    style={{
                        width: "100px",
                        height: "100px",
                        position: "absolute",
                        top: `${150 + index * 50}px`, // Posición inicial diferente para cada imagen
                        left: `${50 + index * 60}px`,
                        cursor: "grab",
                    }}
                >
                    <img
                        src={src}
                        alt={`drag-img-${index}`}
                        style={{ width: "100%", height: "100%", borderRadius: "8px" }}
                    />
                </motion.div>
            ))}
        </footer>
    );
};



const Footer = () => {
    const HIDDEN_ROUTES = ["/contact", "/contact/form"];
    const [isVisible, setIsVisible] = useState(false);
    const triggerRef = useRef(null);
    const { pathname } = useLocation();
    const { isMobile } = useMediaQuery()

    const isHidden = HIDDEN_ROUTES.includes(pathname);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (triggerRef.current) {
            observer.observe(triggerRef.current);
        }

        return () => {
            if (triggerRef.current) {
                observer.unobserve(triggerRef.current);
            }
        };
    }, []);

    if (isHidden) {
        return null;
    };

    if (isMobile) {
        return (
            <div className="d--vh-100 background--primary">
                <DraggableFooter />
            </div>
        )
    }


    if (!isVisible) {
        return <div ref={triggerRef} style={{ height: "1px" }} />
    }

    return (
        <>
            {/* Elemento invisible para disparar la aparición del footer */}
            <div ref={triggerRef} style={{ height: "1px" }} />

            {/* Renderiza el footer solo cuando sea visible */}
            {isVisible && (
                <div data-hover="a" className="footer__section">
                    <section className="footer__section-carrusel">
                        <InfiniteCarrusel />
                    </section>
                    <section className="footer__section-3d-logo">
                        <Scene3D />
                    </section>
                    <section className="footer__section-links">
                        <div className="flex flex--j-between p--4 text-color--secondary text-transform--uppercase">
                            <p></p>
                            <p>Social Media Links</p>
                            <p>Site by SYP</p>
                        </div>
                    </section>
                </div>
            )}
        </>
    );
};

export default Footer;
