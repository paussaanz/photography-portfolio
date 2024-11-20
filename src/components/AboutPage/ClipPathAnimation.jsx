import React, { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ClipPathAnimation = () => {
    const ref = useRef(null);
    const images = [
        { src: "/images/mid/lifestyle-1.webp", bgColor: "#FFD700" }, // Gold
        { src: "/images/mid/lifestyle-5.webp", bgColor: "#ADD8E6" }, // Light Blue
        { src: "/images/mid/lifestyle-7.webp", bgColor: "#90EE90" }, // Light Green
    ]; // Replace these paths with your actual image paths

    useEffect(() => {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: ref.current,
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        images.forEach((img, index) => {
            timeline.fromTo(ref.current.children[index],
                { clipPath: 'circle(0% at 100% 0%)' }, // Empieza desde un punto pequeño
                { clipPath: 'circle(150% at 100% 0%)', duration: 1 } // Aumenta al tamaño deseado
            );
        });
    }, []);

    return (
        <div className="d--vh-300 position--sticky">
            <div className="position--sticky position--top-0 flex d--vh-100 flex--a-center flex--j-start overflow--clip">
                <div ref={ref} className="overflow--hidden d--vh-100 position--relative" style={{ width: '100%' }}>
                    {images.map((image, index) => (
                        <div key={index} style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: image.bgColor,

                        }}>
                            <div className="flex flex--col d--h-100">
                                <div className="about__work-flex-item">
                                    <img src={image.src} loading="lazy" alt="Descriptive text" className="about__work-flex-item-image object-fit--cover" />
                                </div>
                                <div className="about__work-flex-item">
                                    hola
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClipPathAnimation;
