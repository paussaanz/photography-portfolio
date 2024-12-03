import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/all';
import SplitType from 'split-type';

const MarqueeAbout = () => {
    gsap.registerPlugin(ScrollTrigger);
    const marqueeRef = useRef(null);


    useEffect(() => {
        const textTop = new SplitType('#marqueeTop', {
            types: 'chars',
            tagName: 'span',
            charClass: 'about__marquee-char',
        });

        const textMiddle = new SplitType('#marqueeMiddle', {
            types: 'chars',
            tagName: 'span',
            charClass: 'about__marquee-char',
        });

        const textBottom = new SplitType('#marqueeBottom', {
            types: 'chars',
            tagName: 'span',
            charClass: 'about__marquee-char',
        });

        const chars = document.querySelectorAll('.about__marquee-char');

        chars.forEach((char) => {
            char.addEventListener('mousemove', (e) => {
                const rect = char.getBoundingClientRect();
                const charX = rect.left + rect.width / 2;
                const charY = rect.top + rect.height / 2;

                const distanceX = (e.clientX - charX) / 3;
                const distanceY = (e.clientY - charY) / 4;
                const rotationAngle = (e.clientX - charX) / 7;

                gsap.to(char, {
                    x: distanceX,
                    y: distanceY,
                    rotate: rotationAngle,
                    duration: 0.3,
                    ease: 'power3.out',
                });
            });

            // Reset character position when the mouse leaves
            char.addEventListener('mouseleave', () => {
                gsap.to(char, {
                    x: 0,
                    y: 0,
                    duration: 0.3,
                    ease: 'power3.out',
                });
                gsap.delayedCall(1.5, () => {
                    gsap.to(char, {
                        rotation: 0, // Reset rotation to 0
                        duration: 0.5, // Duration of the reset
                        ease: 'power3.out',
                    });
                });
            });
        });


        gsap.set("#marqueeTop", { xPercent: 0 });
        gsap.set("#marqueeMiddle", { xPercent: 0 });
        gsap.set("#marqueeBottom", { xPercent: 0 });

        ScrollTrigger.create({
            trigger: marqueeRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress;

                gsap.to("#marqueeTop", {
                    xPercent: -25 * progress,
                    ease: "none",
                });

                gsap.to("#marqueeMiddle", {
                    xPercent: 25 * progress,
                    ease: "none",
                });

                gsap.to("#marqueeBottom", {
                    xPercent: -7 * progress,
                    ease: "none",
                });
            }

        })

    }, []);


    return (
        <div ref={marqueeRef} className="d--vh-100 d--h-100-mbl position--relative  flex flex--j-center flex--a-center text-transform--uppercase overflow--hidden">
            <div className="marquee-about__inner">
                <div id="marqueeTop" className="about__marquee-part">
                    CREATIVE
                </div>
                <div id="marqueeMiddle" className="about__marquee-part">
                    Freelance
                </div>
                <div id="marqueeBottom" className="about__marquee-part">
                    DEVELOPER
                </div>
            </div>
        </div>
    );
};

export default MarqueeAbout;