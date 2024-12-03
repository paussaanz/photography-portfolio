import React, { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ClipPathAnimation = ({ onImageChange, images }) => {
    const ref = useRef(null);

    
    useEffect(() => {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: ref.current,
                start: "top top",
                end: "bottom+=200vh top",
                scrub: true,
                onUpdate: (self) => {
                    const progress = self.progress; // Progress from 0 to 1
                    const index = Math.min(Math.floor(progress * images.length), images.length - 1); // Cap the index
                    onImageChange(index); 
                },
            },
        });

        images.forEach((img, index) => {
            timeline.fromTo(
                ref.current.children[index],
                { clipPath: "circle(0% at 100% 0%)" }, // Start from a small point
                { clipPath: "circle(150% at 100% 0%)", duration: 1 } // Expand to desired size
            );
        });


    }, [onImageChange]);

    return (
        <>
            <div className="favorites-about__clip-path">
                <div ref={ref} className="overflow--hidden d--vh-100 d--w-100">
                    {images.map((image, index) => (
                        <div key={index} style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                        }}>
                            <div className="flex flex--col d--h-100">
                                <div className="favorites-about__clip-path-item">
                                    <img src={image.src} loading="lazy" alt={`Favorite Image ${index}`} className="favorites-about__clip-path-item-image object-fit--cover" />
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ClipPathAnimation;
