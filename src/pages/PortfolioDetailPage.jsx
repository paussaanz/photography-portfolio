import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import HeroDetails from "../components/PortfolioDetailsPage/HeroDetails";
import TextAnimation from "../components/General/TextAnimation";
import Button from "../components/General/Buttons/Button";
import GalleryGrid from "../components/PortfolioDetailsPage/GalleryGrid";
import PortfolioDetailPageSeo from "./SEO/PortfolioDetailPageSeo";
import LenisContext from "../contexts/LenisContext";


const PortfolioDetailPage = ({ images, title, textAnimation }) => {
    const { heroImage, projectImages } = images;
    const [ordered, setOrdered] = useState(false);
    const [disabledButtons, setDisabledButtons] = useState(false);
    const imagesSectionRef = useRef(null);
    const galleryRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null); // State to manage selected image for overlay

    const { lenis, stop } = useContext(LenisContext);  // Utiliza el contexto de Lenis


    const handleImageClick = (img) => {
        setSelectedImage(img); // Set the selected image to show in the overlay


    };

    const closeOverlay = () => {
        setSelectedImage(null); // Close overlay when clicked outside or on a close button
    };

    const handleChangeOrder = () => {
        setOrdered(prev => !prev);
        setDisabledButtons(true);
        setTimeout(() => {
            setDisabledButtons(false);
        }, 100);

        setTimeout(() => {
            requestAnimationFrame(() => {
                if (imagesSectionRef.current && lenis) {
                    // stop();
                    const offsetTop = imagesSectionRef.current.offsetTop;
                    lenis.scrollTo(offsetTop, { immediate: true });
                } else {
                    console.error("Lenis instance is not available.");
                }
            });
        }, 100);
    };

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
        const translateOnOrder = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px))`;
        const translateOnUnordered = `translate(0, 0)`;

        galleryRef.current.style.transform = ordered ? translateOnOrder : translateOnUnordered;
    };

    const handleMouseLeave = () => {
        const translateOnOrder = 'translate(-50%, -50%)';
        const translateOnUnordered = `translate(0, 0)`;

        galleryRef.current.style.transform = ordered ? translateOnOrder : translateOnUnordered;
    };

    return (
        <div data-barba="container" className={`${selectedImage ? 'pdetails__detail-mode' : ''} `}>
            <PortfolioDetailPageSeo title={title} heroImage={heroImage} />

            <section className="pdetails__hero-section position--relative">
                <HeroDetails slug={title} src={heroImage.src} />
            </section>

            <section className="pdetails__text-animation-section">
                <div className="p--y-5 d--vh-100 align-content--center">
                    <TextAnimation
                        text={textAnimation}
                        textColor="text-color--primary"
                        maskColor="background--light"
                    />
                </div>
            </section>

            <section ref={imagesSectionRef} className="pdetails__images-gallery-section">
                <div className={`pdetails__button--fixed-bottom ${disabledButtons ? 'pointer-events-none' : ''}`}>
                    <Button className="text-color--primary" text="Grid" onClick={handleChangeOrder} />
                    |
                    <Button className="text-color--primary" text="Gallery" onClick={handleChangeOrder} />
                </div>
                <div className={ordered ? 'pdetails__images-gallery' : ''} onMouseEnter={handleMouseMove} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                    <div className={ordered ? 'pdetails__images-gallery--ordered' : ''} ref={galleryRef}>
                        <GalleryGrid
                            ordered={ordered}
                            images={projectImages}
                            handleImageClick={handleImageClick}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PortfolioDetailPage;
