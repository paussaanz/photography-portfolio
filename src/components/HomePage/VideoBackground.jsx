import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ImageBackground = ({ images, height }) => {
    const containerRef = useRef();

    useEffect(() => {
        const container = containerRef.current;

        const images = container.querySelectorAll('img');

        // Set the initial scale to 1
        gsap.set(images, { scale: 1 });

        // Animate the scale on scroll
        gsap.to(images, {
            scale: 1.5, // Incrementa el tamaño al 150%
            scrollTrigger: {
                trigger: container,
                start: 'top top+=50px', // Comienza cuando el contenedor entra en la vista
                end: 'bottom top',  // Termina cuando el contenedor sale de la vista
                scrub: true,       // Sincroniza con el scroll
            },
            ease: "slow(0.7, 0.7, false)"

        });

        return () => {
            ScrollTrigger.killAll(); // Limpiar ScrollTrigger al desmontar
        };
    }, []);

    return (
        <div ref={containerRef} className={`home__hero-image ${height}`}>
            <img
                className="object-fit--cover d--w-100 d--h-100"
                src="/images/hi/nature-30.webp"
                alt="Background"
            />
        </div>
    );
};

export default ImageBackground;
