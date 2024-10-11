import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import AnimatedImage from "../components/PortfolioDetailsPage/AnimatedImage";
import HeroDetails from "../components/PortfolioDetailsPage/HeroDetails";
import TextAnimationContainer from "../components/General/TextAnimationContainer";
import Button from "../components/General/Buttons/Button";
import ImageGallery from "../components/PortfolioDetailsPage/ImageGallery";

const PortfolioDetailPage = ({ images, title, textAnimation }) => {
    const { heroImage, projectImages } = images;
    const [activeContent, setActiveContent] = useState('Grid');
    const imagesSectionRef = useRef(null);
    const galleryRef = useRef(null);

    const handleShowGrid = () => {
        setActiveContent('Grid');

        console.log(imagesSectionRef.current)

    };

    const handleShowGallery = () => {
        setActiveContent('Gallery');

        console.log(imagesSectionRef.current)

    };

    useLayoutEffect(() => {
        if (imagesSectionRef.current) {
            requestAnimationFrame(() => {
                imagesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
            });
        }
    }, [activeContent]);

    const handleMouseMove = (e) => {
        if (!galleryRef.current) return; // Prevents errors if gallery is not rendered
        const { clientX, clientY, currentTarget } = e;
        const { width, height } = currentTarget.getBoundingClientRect();
        const centerX = width / 2;
        const centerY = height / 2;

        const sensitivityX = 0.9;
        const sensitivityY = 0.25;
        const deltaX = (centerX - clientX) / sensitivityX;
        const deltaY = (centerY - clientY) / sensitivityY;

        galleryRef.current.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px))`;
    };

    return (
        <div data-barba="container" className="barba-container">
            <section className="hero-details position-relative">
                <HeroDetails slug={title} src={heroImage.src} />
            </section>

            <section className="text-animation">
                <div className="py-5 vh-100 align-content-center">
                    <TextAnimationContainer
                        text={textAnimation}
                        textColor="text-primary"
                        maskColor="bg-light"
                    />
                </div>
            </section>

            <div ></div>
            <section ref={imagesSectionRef} className="images-gallery">
                <div className="text-dark text-center bottom-fixed-button">
                    <Button className="text-dark" text="Grid" onClick={handleShowGrid} />
                    |
                    <Button className="text-dark" text="Gallery" onClick={handleShowGallery} />
                </div>
                {
                    activeContent === 'Grid' ? (
                        <div className="project-details d-grid justify-content-center align-items-center">
                            {images && projectImages.map((img, index) => (
                                <AnimatedImage
                                    key={index}
                                    src={img.src}
                                    colStart={img.colStart}
                                    colSpan={img.colSpan}
                                    rowStart={img.rowStart}
                                    rowSpan={img.rowSpan}
                                    width={img.width}
                                    height={img.height}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="container-gallery" onMouseMove={handleMouseMove}>
                            <div className="gallery" ref={galleryRef}>
                                <ImageGallery
                                    images={projectImages}
                                />
                            </div>
                        </div>
                    )
                }
            </section >
        </div >
    );
};

export default PortfolioDetailPage;
