import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ClipPathAnimation from "./ClipPathAnimation";

gsap.registerPlugin(ScrollTrigger);

const FavoritesAbout = () => {

    const listItemsRef = useRef([]); // Store references to the <li> elements

    const images = [
        { src: "/images/mid/lifestyle-1.webp", name: '"Echoes of Elegance"' }, // Gold
        { src: "/images/mid/nature.webp", name: '"Silent Watcher"' }, // Light Blue
        { src: "/images/mid/photoshoots-31.webp", name: '"Gravity in Motion"' }, // Light Green
        { src: "/images/mid/nature-8.webp", name: '"Roadside Bond"' }, // Gold
        { src: "/images/mid/sports-9.webp", name: '"Chasing Liquid Mountains"' }, // Light Blue
        { src: "/images/mid/lifestyle-13.webp", name: '"Timeless Pause"' }, // Light Green
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
            <div className="d--vh-100 d--vh-navbar position--sticky position--top-0">
                <div className="flex flex--row flex--col-mbl flex--j-between d--h-100 p--t-6-mbl">
                    <div className="favorites-about__text d--w-100 m--y-auto text-align--center text-color--primary">
                        <h1 className="favorites-about__text-title text-transform--uppercase h2-mbl"><span>SOME OF MY</span> <span className="b1 favorites-about__text-gamilia">Personal <br /> Favorites</span> </h1>
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