import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ClipPathAnimation from "./ClipPathAnimation";

gsap.registerPlugin(ScrollTrigger);

const FavoritesAbout = () => {

    const listItemsRef = useRef([]); // Store references to the <li> elements

    const images = [
        { src: "/images/mid/lifestyle-1.webp", name: "MADRID" }, // Gold
        { src: "/images/mid/lifestyle-5.webp", name: "LISBON" }, // Light Blue
        { src: "/images/mid/lifestyle-7.webp", name: "FORMIGAL" }, // Light Green
        { src: "/images/mid/lifestyle-1.webp", name: "MADRID2" }, // Gold
        { src: "/images/mid/lifestyle-5.webp", name: "LISBON2" }, // Light Blue
        { src: "/images/mid/lifestyle-7.webp", name: "FORMIGAL2" }, // Light Green
    ]; // Replace these paths with your actual image paths


    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".favorites-about__text",
                start: "top 30%",
                end: "bottom center",
                scrub: true, // Smooth animation
            },
        });

        tl.to(
                ".favorites-about__text-title ",
                {
                    opacity: 0.25,
                    duration: 1.6,
                },
            ).to(
                ".favorites-about__text-list",
                {
                    opacity: 1,
                    duration: 1.6
                },
            );

    }, []);

    const handleImageChange = (index) => {
        listItemsRef.current.forEach((li, liIndex) => {
            if (li) {
                if (liIndex === index) {
                    // Animate the newly active item
                    gsap.to(li, {
                        color: '#DA6A2D',
                        scale: 1.2, // Scale up the active item
                        duration: 0.2, // Duration of the animation
                        ease: "power2.out",
                    });
                } else {
                    // Animate the inactive items
                    gsap.to(li, {
                        color: '#341116',
                        scale: 1, // Scale down the inactive items
                        duration: 0.2, // Match the duration for consistency
                        ease: "power2.out",
                    });
                }
            }
        });
    };

    return (
        <div style={{ height: '400vh', position: 'relative' }}>
            <div className="d--vh-100 position--sticky position--top-0">
                <div className="flex flex--column flex--j-between d--h-100">
                    <div className="favorites-about__text d--w-100 m--y-auto text-align--center text-color--primary">
                        <h1 className="favorites-about__text-title text-transform--uppercase"><span>SOME OF MY</span> <span className="b1 favorites-about__text-gamilia">Personal <br /> Favorites</span> </h1>
                        <ul className="favorites-about__text-list d--w-100">
                            {images.map(
                                (image, index) => (
                                    <li
                                        key={image.name}
                                        ref={(el) => (listItemsRef.current[index] = el)}
                                        className="favorites-about__text-list-item h5 d--w-100"
                                    >
                                        {image.name}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                    <div className="favorites-about__images d--w-100 flex flex--colum flex--j-center flex--a-center" >
                        <ClipPathAnimation onImageChange={handleImageChange} images={images}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FavoritesAbout;