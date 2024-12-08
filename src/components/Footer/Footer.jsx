import { useLayoutEffect, useRef, useState } from 'react';
import InfiniteCarrusel from './InfiniteCarrusel';
import Scene3D from './Scene3D';

const Footer = () => {
    const triggerRef = useRef(null);
    const [hasInteracted, setHasInteracted] = useState(false);

    useLayoutEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasInteracted(true); // Marca como visible
                }
            },
            { threshold: 0, rootMargin: "200px 0px" } // Activa antes de que entre en la vista
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

    console.log('isVisible', hasInteracted);

    return (
        <>
            {!hasInteracted && <div ref={triggerRef} style={{ height: "1px" }} />}
            {hasInteracted && (
                <div className="footer__section">
                    <section className="footer__section-carrusel">
                        <InfiniteCarrusel />
                    </section>
                    <section className="footer__section-3d-logo">
                        <Scene3D />
                    </section>
                    <section className="footer__section-links">
                        <div className="flex flex--j-between p--4 text-color--secondary text-transform--uppercase">
                            <p>Privacy policy</p>
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
