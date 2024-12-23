import { useContext, useRef, useState } from "react";
import HeroDetails from "../components/PortfolioDetailsPage/HeroDetails";
import TextAnimation from "../components/General/TextAnimation";
import Button from "../components/General/Buttons/Button";
import GalleryGrid from "../components/PortfolioDetailsPage/GalleryGrid";
import PortfolioDetailPageSeo from "./SEO/PortfolioDetailPageSeo";
import LenisContext from "../contexts/LenisContext";

const PortfolioDetailPage = ({ images, title, textAnimation, number, subtitle }) => {
  const { heroImage, projectImages } = images;
  const [ordered, setOrdered] = useState(false);
  const [disabledButtons, setDisabledButtons] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const imagesSectionRef = useRef(null);
  const galleryRef = useRef(null);

  const { lenis } = useContext(LenisContext);

  // Toggle grid/gallery view and scroll to top of the gallery 
  const handleChangeOrder = () => {
    setOrdered((prev) => !prev);
    setDisabledButtons(true);

    setTimeout(() => {
      setDisabledButtons(false);

      if (imagesSectionRef.current && lenis) {
        lenis.scrollTo(imagesSectionRef.current.offsetTop, { immediate: true });
      } else {
        console.error("Lenis instance is not available.");
      }
    }, 100);
  };

  // Mouse move effect on gallery
  const handleMouseMove = (e) => {
    if (!galleryRef.current) return;

    const { clientX, clientY, currentTarget } = e;
    const { width, height } = currentTarget.getBoundingClientRect();
    const deltaX = (width / 2 - clientX) / 2; // Adjust sensitivity
    const deltaY = (height / 2 - clientY) / 0.55;

    galleryRef.current.style.transform = ordered
      ? `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px))`
      : "translate(0, 0)";
  };

  // Reset gallery position on mouse leave
  const handleMouseLeave = () => {
    galleryRef.current.style.transform = ordered
      ? "translate(-50%, -50%)"
      : "translate(0, 0)";
  };

  return (
    <div
      data-barba="container"
      className={selectedImage ? "pdetails__detail-mode" : ""}
    >
      {/* SEO */}
      <PortfolioDetailPageSeo title={title} heroImage={heroImage} />

      {/* Hero Section */}
      <section className="pdetails__hero-section position--relative">
        <HeroDetails slug={title} src={heroImage.src} number={number} subtitle={subtitle}/>
      </section>

      {/* Text Animation Section */}
      <section className="pdetails__text-animation-section">
        <div className="p--y-5 d--vh-100 align-content--center">
          <TextAnimation
            text={textAnimation}
            textColor="text-color--primary"
            maskColor="background--light"
          />
        </div>
      </section>

      {/* Images Gallery Section */}
      <section
        ref={imagesSectionRef}
        className="pdetails__images-gallery-section"
      >
        <div
          className={`pdetails__button--fixed-bottom ${disabledButtons ? "pointer-events-none" : ""
            }`}
        >
          <Button
            className="text-color--primary"
            text="Grid"
            onClick={handleChangeOrder}
          />
          |
          <Button
            className="text-color--primary"
            text="Gallery"
            onClick={handleChangeOrder}
          />
        </div>

        <div
          className={ordered ? "pdetails__images-gallery" : "pdetails__images"}
          onMouseEnter={handleMouseMove}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={ordered ? "pdetails__images-gallery--ordered" : "pdetails__images-gallery-unordered"}
            ref={galleryRef}
          >
            <GalleryGrid
              ordered={ordered}
              images={projectImages}
              handleImageClick={setSelectedImage}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioDetailPage;
