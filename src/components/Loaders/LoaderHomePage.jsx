import { useEffect, useContext } from "react";
import gsap from "gsap";
import TextOverlay from "../General/TextOverlay.jsx";
import Button from "../General/Buttons/Button.jsx";
import LenisContext from "../../contexts/LenisContext.jsx";
import { useTransition } from "../../contexts/transitionContext.jsx";
import { homePageLoader } from "../../assets/js/images.js";

const LoaderHomePage = () => {
  const { handleLinkClick } = useTransition();
  const { stop, start } = useContext(LenisContext);

  useEffect(() => {
    // Initialize GSAP Timeline
    const timeline = gsap.timeline();

    // Animate image columns container
    timeline.to(".loader__images-col", {
      top: 0,
      duration: 2,
      ease: "power4.inOut",
    });

    // Animate individual columns
    homePageLoader.forEach((_, colIndex) => {
      const stagger = colIndex % 2 === 0 ? 0.25 : -0.25;
      timeline.to(
        `.loader__images-col-${colIndex + 1} .loader__images-image`,
        {
          top: 0,
          stagger,
          duration: 2,
          ease: "power4.inOut",
        },
        colIndex === 0 ? 0 : "-=4" // Synchronize with other animations
      );
    });

    // Scale animation
    timeline.to(
      ".loader__images-section",
      {
        scale: 6,
        duration: 3,
        ease: "power4.inOut",
      },
      "-=2"
    );

    // Fade-in text animation
    timeline.to(
      ".loader__text",
      {
        opacity: 1,
        stagger: 0.095,
        duration: 1.5,
        ease: "power3.out",
      },
      "-=1"
    );

    // Start smooth scrolling after animation
    const timer = setTimeout(start, 3000);

    // Cleanup on unmount
    return () => clearTimeout(timer);
  }, [start]);

  // Render image columns dynamically
  const renderImageColumns = () =>
    homePageLoader.map((images, colIndex) => (
      <div
        key={colIndex}
        className={`loader__images-col loader__images-col-${colIndex + 1}`}
      >
        {images.map((src, index) => (
          <div key={index} className="loader__images-image">
            <img
              className="loader__image"
              src={src}
              alt={`Nature ${index + 1}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    ));

  return (
    <>
      <div className="loader__images-section d--vh-100">
        {renderImageColumns()}
      </div>
      <TextOverlay
        textColor="text-color--light"
        textPosition="center"
        className="text-align--center"
      >
        <h1>
          <span className="block--display loader__text">Capture</span>
          <span className="h2 block--display loader__text">Brilliance</span>
        </h1>
        <Button
          onClick={() => handleLinkClick("/portfolio")}
          text="See my work"
          className="text-color--light loader__text"
        />
      </TextOverlay>
    </>
  );
};

export default LoaderHomePage;
