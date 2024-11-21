import { useEffect, useContext } from "react";
import gsap from "gsap";
import TextOverlay from "../General/TextOverlay.jsx";
import Button from "../General/Buttons/Button.jsx";
import LenisContext from "../../contexts/LenisContext.jsx";
import { useTransition } from "../../contexts/transitionContext.jsx";

// Constants for image data
const imageColumns = [
    ["/images/thumbnails/nature-1.webp", "/images/thumbnails/nature-2.webp", "/images/thumbnails/nature-3.webp", "/images/thumbnails/nature-4.webp", "/images/thumbnails/nature-5.webp"],
    ["/images/thumbnails/nature-6.webp", "/images/thumbnails/nature-7.webp", "/images/thumbnails/nature-8.webp", "/images/thumbnails/nature-9.webp", "/images/thumbnails/nature-10.webp"],
    ["/images/thumbnails/nature-11.webp", "/images/thumbnails/nature-12.webp", "/images/mid/nature-30.webp", "/images/thumbnails/nature-14.webp", "/images/thumbnails/nature-15.webp"],
    ["/images/thumbnails/nature-16.webp", "/images/thumbnails/nature-17.webp", "/images/thumbnails/nature-18.webp", "/images/thumbnails/nature-19.webp", "/images/thumbnails/nature-20.webp"],
    ["/images/thumbnails/nature-21.webp", "/images/thumbnails/nature-22.webp", "/images/thumbnails/nature-23.webp", "/images/thumbnails/nature-24.webp", "/images/thumbnails/nature-7.webp"],
];

const LoaderHomePage = () => {
    const { handleLinkClick } = useTransition();
    const { stop, start } = useContext(LenisContext);

    useEffect(() => {

        const tl = gsap.timeline({ delay: 0 });

        tl.to(".loader__images-col", {
            top: 0,
            duration: 2,
            ease: "power4.inOut"
        });
        
        // Animate columns
        imageColumns.forEach((_, colIndex) => {
            const stagger = colIndex % 2 === 0 ? 0.25 : -0.25;
            tl.to(`.loader__images-col-${colIndex + 1} .loader__images-image`, {
                top: 0,
                stagger,
                duration: 2,
                ease: "power4.inOut",
            }, colIndex === 0 ? 0 : "-=4");
        });

        // Additional animations
        tl.to(".loader__images-section", {
            scale: 6,
            duration: 3,
            ease: "power4.inOut",
        }, "-=2");

        tl.to(".loader__text", {
            opacity: 1,
            stagger: 0.095,
            duration: 1.5,
            ease: "power3.out",
        }, "-=1");

        // Start smooth scroll
        const timer = setTimeout(start, 3000);
        return () => clearTimeout(timer);
    }, [stop, start]);

    // Render column images
    const renderImageColumns = () =>
        imageColumns.map((images, colIndex) => (
            <div key={colIndex} className={`loader__images-col loader__images-col-${colIndex + 1}`}>
                {images.map((src, index) => (
                    <div key={index} className="loader__images-image">
                        <img className="loader__image" src={src} alt={`Nature ${index + 1}`} />
                    </div>
                ))}
            </div>
        ));

    return (
        <>
            <div className="loader__images-section d--vh-100">
                {renderImageColumns()}
            </div>
            <TextOverlay textColor="text-color--light" textPosition="center" className="text-align--center">
                <h1>
                    <span className="block--display loader__text">Capture</span>
                    <span className="h2 block--display loader__text">Brilliance</span>
                </h1>
                <Button
                    onClick={() => handleLinkClick('/portfolio')}
                    text="See my work"
                    className="text-color--light loader__text"
                />
            </TextOverlay>
        </>
    );
};

export default LoaderHomePage;
