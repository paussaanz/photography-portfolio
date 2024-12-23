import { useEffect, useContext, useRef } from "react";
import gsap from "gsap";
import TextOverlay from "../General/TextOverlay.jsx";
import Button from "../General/Buttons/Button.jsx";
import LenisContext from "../../contexts/LenisContext.jsx";
import { useTransition } from "../../contexts/transitionContext.jsx";
import { homePageLoader } from "../../assets/js/images.js";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const LoaderHomePage = () => {
  const { handleLinkClick } = useTransition();
  const { stop, start } = useContext(LenisContext);
  const containerRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      const container = containerRef.current;
      console.log(container, "Container");

      if (!container) return;

      // Target the specific column and image
      const targetImage = container.querySelector('#col-3 #image-3');
      console.log(targetImage, "Target Image");

      if (targetImage) {
        gsap.set(targetImage, { scale: 1 });
        gsap.to(targetImage, {
          scale: 1.3, // Scale up to 1.5
          scrollTrigger: {
            trigger: targetImage,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          ease: "slow(0.7, 0.7, false)"
        });
      }
    }, 1000); // Short delay to ensure the DOM is ready

    return () => clearTimeout(timer);
  }, []);



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
    return () => {
      clearTimeout(timer);
      ScrollTrigger.killAll(); // Cleanup ScrollTriggers
    };
  }, [start]);

  // Render image columns dynamically
  const renderImageColumns = () =>
    homePageLoader.map((images, colIndex) => (
      <div
        key={colIndex}
        className={`loader__images-col loader__images-col-${colIndex + 1}`}
        id={`col-${colIndex + 1}`}
      >
        {images.map((src, index) => (
          <div key={index} className="loader__images-image">
            <img
              className={`loader__image loader__image--${index}`}
              id={`image-${index + 1}`}
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
      <div className="loader__images-section d--vh-100" ref={containerRef}>
        {renderImageColumns()}
      </div>
      <TextOverlay
        textColor="text-color--overlay"
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
          className="text-color--overlay loader__text"
        />
      </TextOverlay>
    </>
  );
};

export default LoaderHomePage;
