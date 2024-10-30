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
            charClass: 'about-split-char',
        });

        const textMiddle = new SplitType('#marqueeMiddle', {
            types: 'chars',
            tagName: 'span',
            charClass: 'about-split-char',
        });

        const textBottom = new SplitType('#marqueeBottom', {
            types: 'chars',
            tagName: 'span',
            charClass: 'about-split-char',
        });

        const chars = document.querySelectorAll('.about-split-char');

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


        gsap.set(".marquee-about__part-top", { xPercent: 0 });
        gsap.set(".marquee-about__part-middle", { xPercent: 0 });
        gsap.set(".marquee-about__part-bottom", { xPercent: 0 });

        ScrollTrigger.create({
            trigger: marqueeRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress;

                gsap.to(".marquee-about__part-top", {
                    xPercent: -25 * progress,
                    ease: "none",
                });

                gsap.to(".marquee-about__part-middle", {
                    xPercent: 25 * progress,
                    ease: "none",
                });

                gsap.to(".marquee-about__part-bottom", {
                    xPercent: -7 * progress,
                    ease: "none",
                });
            }

        })

    }, []);


    return (
        <div ref={marqueeRef} className="marquee-about dimension--vh-100 position--relative text-transform--uppercase overflow--hidden flex--display flex--justify-center flex--align-center">
            <div className="marquee-about__inner">
                <div id="marqueeTop" className="marquee-about__part marquee-about__part-top">
                    CREATIVE
                </div>
                <div id="marqueeMiddle" className="marquee-about__part marquee-about__part-middle">
                    Freelance
                </div>
                <div id="marqueeBottom" className="marquee-about__part marquee-about__part-bottom">
                    DEVELOPER
                </div>
            </div>
        </div>
    );
};

export default MarqueeAbout;