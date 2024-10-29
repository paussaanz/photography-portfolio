import { useEffect, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HeroAbout = () => {
    const titleRef = useRef(null);
    const imageRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Define a timeline with ScrollTrigger integration
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top", // When the top of the container reaches the top of the viewport
                end: "center top", // When the bottom of the container reaches the top of the viewport
                scrub: 1, // Smooth scrubbing
            }
        });

        // Define animation on the timeline
        tl.fromTo(titleRef.current,
            { bottom: -130, fontSize: '40px' }, // Initial y position
            { bottom: -200, fontSize: '4px'} // Final y position, adjust as needed
        );

        // Define animation for the image to move down
        tl.fromTo(imageRef.current,
            { y: 0, height: '400px' }, // Initial y position for the image
            { y: 700, width: '100vw', height: "50vh" }, // Final y position for the image
            0 // This ensures that the image animation is synced with the title animation on the timeline
        );
    }, []);

    return (
        <div ref={containerRef} className="container-bem hero-about">
            <div className="hero-about__content text-color--primary text-align--center flex--display flex--justify-center flex--align-center flex--column dimension--vh-100">
                <div className="image-wrapper">
                    <img ref={imageRef} className="hero-about__image" src="/images/lifestyle-1.jpg" />
                    <h1 ref={titleRef} className="hero-about__title text-transform--uppercase text-color--primary">
                        ABOUT SYP!
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default HeroAbout;
