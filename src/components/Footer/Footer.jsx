import React, { useState, useEffect, useRef } from "react";
import InfiniteCarrusel from "./InfiniteCarrusel";
import Scene3D from "./Scene3D";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "../../contexts/MediaQueryContext";
import { motion } from "framer-motion";
import { useTransition } from "../../contexts/transitionContext";

const DraggableFooter = () => {
    const footerRef = useRef(null); // Referencia al footer para definir los límites del drag
    const { handleLinkClick } = useTransition()

    // Array de imágenes con URL y rotación máxima aleatoria
    const images = [
        { url: "/images/stickers/connect-sticker.svg", rotation: "20deg", top: '250px', left: '0px', scale: 1.2 },
        { url: "/images/stickers/syp-sticker.svg", rotation: "-30deg", top: '400px', left: '0px', scale: 1.2 },
        { url: "/images/stickers/tortoise-sticker.svg", rotation: "10deg", top: '300px', left: '100px', scale: 1.2 },
        { url: "/images/stickers/face-sticker.svg", rotation: "-50deg", top: '400px', left: '0px', scale: 0.8 },
        { url: "/images/stickers/syp-sticker-2.svg", rotation: "0deg", top: '350px', left: '100px', scale: 1.25 },
    ];


    const contactLinks = [
        {
            text: "LINKEDIN",
            logoClass: "icon-linkedin",
            href: "https://www.linkedin.com/in/paula-sanz-perez/",
        },
        {
            text: "GITHUB",
            logoClass: "icon-github",
            href: "https://github.com/paussaanz",
        },
        {
            text: "INSTAGRAM",
            logoClass: "icon-instagram",
            href: "https://www.instagram.com/sypcreative/",
        },
        {
            text: "BEHANCE",
            logoClass: "icon-behance",
            href: "https://www.behance.net/paulasanz1",
            logoSize: "h6",
        },
    ];



    return (
        <footer
            className="footer__section-mobile d--vh-100 background-primary"
            ref={footerRef}
            style={{
                height: "100dvh",
                width: "100%",
                position: "relative",
                overflow: "hidden",
                padding: '20px'
            }}
        >
            <h1
                onClick={() => handleLinkClick('/contact')}
                className="text-color--secondary"
                style={{
                    marginTop: "30px",
                    fontWeight: 400,
                    fontSize: '50px',
                    lineHeight: '70px'
                }}>LET’s HAVE A CHAT
                <span data-hover="a" className="contact__logo-circle icon-arrow b6 text-color--secondary" />
            </h1>

            {images.map((image, index) => (
                <motion.div
                    key={index}
                    drag
                    dragMomentum={false} // Evita que la imagen siga moviéndose tras soltarla
                    whileDrag={{ scale: image.scale + 0.1 }} // Efecto visual al arrastrar
                    style={{
                        rotate: `${image.rotation}`, // Usa la rotación del objeto
                        position: "absolute",
                        minWidth: 200,
                        scale: `${image.scale}`,
                        top: `${image.top}`, // Posición inicial diferente para cada imagen
                        left: `${image.left}`,
                        cursor: "grab",
                    }}
                >
                    <img
                        src={image.url}
                        alt={`drag-img-${index}`}
                        style={{ width: "100%", height: "100%", borderRadius: "8px" }}
                    />
                </motion.div>
            ))}

            <div className="footer__section-mobile__social">
                <div className="footer__section-mobile__social--links">
                    {contactLinks.map((contact) => {
                        return (
                            <a className="text-decoration--none" key={contact.href} href={contact.href} target="_blank" rel="noreferrer">
                                <span data-hover="a" className={`contact__logo-circle ${contact.logoClass} h5`}></span>
                            </a>
                        )
                    })}
                </div>
            </div>
            <div className="footer__section-mobile__site-by-syp text-color--secondary">
                SITE BY SYP
            </div>
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
