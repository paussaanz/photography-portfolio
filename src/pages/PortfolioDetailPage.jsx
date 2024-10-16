import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { scroller } from "react-scroll";  // Importamos 'scroller' para hacer scroll
// import AnimatedImage from "../components/PortfolioDetailsPage/AnimatedImage";
import HeroDetails from "../components/PortfolioDetailsPage/HeroDetails";
import TextAnimationContainer from "../components/General/TextAnimationContainer";
import Button from "../components/General/Buttons/Button";
import GalleryCarles from "../components/PortfolioDetailsPage/GalleryCarles";
import Detail from "../components/Detail/Detail";

const PortfolioDetailPage = ({ images, title, textAnimation }) => {
    const { heroImage, projectImages } = images;
    const [ordered, setOrdered] = useState(false);
    const [disabledButtons, setDisabledButtons] = useState(false);
    const imagesSectionRef = useRef(null);
    const galleryRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null); // State to manage selected image for overlay

    const handleImageClick = (img) => {
      setSelectedImage(img); // Set the selected image to show in the overlay

      console.log(selectedImage)
    };
  
    // const closeOverlay = () => {
    //   setSelectedImage(null); // Close overlay when clicked outside or on a close button
    // };

    const handleChangeOrder = () => {
        setOrdered(prev => !prev); // Cambia el orden cuando el botón es presionado
        setDisabledButtons(true)
        setTimeout(() => {
            setDisabledButtons(false)
        }, [100])

        scroller.scrollTo('images-gallery', {
            duration: 20,
            delay: 0,
            smooth: 'linear'
        });
    };

    useEffect(() => {
        scroller.scrollTo('images-gallery', {
            duration: 1000,
            delay: 0,
            smooth: 'linear'
        });
    }, [ordered]); // Asegúrate de que scroll solo ocurra cuando 'ordered' cambia


    const handleMouseMove = (e) => {
        if (!galleryRef.current) return; // Prevents errors if gallery is not rendered
        const { clientX, clientY, currentTarget } = e;
        const { width, height } = currentTarget.getBoundingClientRect();
        const centerX = width / 2;
        const centerY = height / 2;

        const sensitivityX = 2;
        const sensitivityY = 0.55;
        const deltaX = (centerX - clientX) / sensitivityX;
        const deltaY = (centerY - clientY) / sensitivityY;
        const translateOnOrder = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px))`
        const translateOnUnordered = `translate(0, 0)`

        galleryRef.current.style.transform = ordered ? translateOnOrder : translateOnUnordered;
    };

    const handleMouseLeave = () => {
        const translateOnOrder = 'translate(-50%, -50%)'
        const translateOnUnordered = `translate(0, 0)`

        galleryRef.current.style.transform = ordered ? translateOnOrder : translateOnUnordered;
    };


    return (
        <div data-barba="container" className={`${selectedImage ? 'detail-mode' : ''} `}>

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
                <div className={`text-dark text-center bottom-fixed-button ${disabledButtons ? 'pointer-events-none' : ''}`}>
                    <Button className="text-dark" text="Grid" onClick={handleChangeOrder} />
                    |
                    <Button className="text-dark" text="Gallery" onClick={handleChangeOrder} />
                </div>
                <div className={ordered ? 'container-gallery' : ''} onMouseEnter={handleMouseMove} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                    <div className={ordered ? 'gallery' : ''} ref={galleryRef}>
                        <GalleryCarles
                            ordered={ordered}
                            images={projectImages}
                            handleImageClick={handleImageClick}
                        />
                    </div>
                </div>
            </section >
            {selectedImage && (
                <Detail images={projectImages} />
            )}
        </div >
    );
};

export default PortfolioDetailPage;
