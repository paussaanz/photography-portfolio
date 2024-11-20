import { useEffect, useRef } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LoaderAbout = () => {
    const titleRef = useRef(null);
    const imageRef = useRef(null);
    const containerRef = useRef(null);


    useEffect(() => {
        const tl = gsap.timeline({
            delay: 0
        });

        tl.fromTo(".about__hero-image-loader", {
            height: 0
        },
            {
                height: 400,
                duration: 2,
                ease: "power4.inOut"
            });

        tl.to(".about__hero-title-loader", {
            opacity: 1,
            delay: -1,
            duration: 1,
            ease: "power4.inOut"
        })
    })


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

        tl.fromTo(
            titleRef.current,
            { yPercent: 50, fontSize: '12vw' },
            { yPercent: -45, fontSize: '9vw' }
        );

        // Animate the image downwards proportionally
        tl.fromTo(
            imageRef.current,
            { yPercent: 0, height: '400px' }, // Starting position
            { yPercent: 110, width: '100vw', height: "70vh" }, // Final position in sync with title
            0 // Synchronizes with title animation
        );


    }, []);

    return (
        <div ref={containerRef} className="container-bem">
            <div className="text-color--primary text-align--center flex flex--j-center flex--a-center flex--col d--vh-100">
                <img ref={imageRef} className="about__hero-image about__hero-image-loader" src="/images/mid/photoshoots-32.webp" alt="Hero image" loading="lazy"/>
                <h1 ref={titleRef} className="about__hero-title about__hero-title-loader">
                    ABOUT SYP!
                </h1>
            </div>
        </div>
    );
};

export default LoaderAbout;
