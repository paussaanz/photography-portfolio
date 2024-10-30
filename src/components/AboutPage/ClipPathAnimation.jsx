import React, { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ClipPathAnimation = () => {
    const ref = useRef(null);
    const images = [
        "/images/lifestyle-1.jpg",
        "/images/lifestyle-5.jpg",
        "/images/lifestyle-7.jpg",
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
                { clipPath: 'polygon(100% 0px, 100% 0px, 100% 100%, 150% 100%)' },
                { clipPath: 'polygon(-100% 0%, 100% 0%, 100% 100%, -25% 100%)', duration: 1 },
            );
        });
    }, []);

    return (
        <div className="dimension--vh-300 position--sticky">
            <div className="position--sticky position--top-0 flex--display dimension--vh-100 flex--align-center flex--justify-start overflow--clip">
                <div ref={ref} className="overflow--hidden dimension--vh-100 position--relative" style={{ width: '100%' }}>
                    {images.map((src, index) => (
                        <div key={index} style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundImage: `url(${src})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            clipPath: 'polygon(100% 0px, 100% 0px, 100% 100%, 150% 100%)' // Initial clip path
                        }} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClipPathAnimation;
