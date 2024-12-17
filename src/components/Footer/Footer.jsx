import React, { useState, useEffect, useRef } from "react";
import InfiniteCarrusel from "./InfiniteCarrusel";
import Scene3D from "./Scene3D";
import { useLocation } from "react-router-dom";

const Footer = () => {
    const HIDDEN_ROUTES = ["/contact", "/contact/form"];
    const [isVisible, setIsVisible] = useState(false);
    const triggerRef = useRef(null);
    const { pathname } = useLocation();

    const isHidden = HIDDEN_ROUTES.includes(pathname);

    if (isHidden) {
        return null;
    };

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

    console.log('isvisible', isVisible)
    if (!isVisible) {
        return <div ref={triggerRef} style={{ height: "1px" }} />
    }

    return (
        <>
            {/* Elemento invisible para disparar la aparición del footer */}
            <div ref={triggerRef} style={{ height: "1px" }} />

            {/* Renderiza el footer solo cuando sea visible */}
            {isVisible && (
                <div className="footer__section">
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