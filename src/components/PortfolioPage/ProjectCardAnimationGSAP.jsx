import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { portfolioCardAnimation } from "../../assets/js/images";
import { Link } from "react-router-dom";
import { useTransition } from "../../contexts/transitionContext";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const getInitialTranslateZ = (slide) => {
  const style = window.getComputedStyle(slide);
  const matrix = style.transform.match(/matrix3d\((.+)\)/);
  if (matrix) {
    const values = matrix[1].split(", ");
    return parseFloat(values[14] || 0);
  }
  return 0;
};


const mapRange = (value, inMin, inMax, outMin, outMax) =>
  ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

const ProjectCardAnimation = () => {
  const containerRef = useRef(null);
  const { handleLinkClick } = useTransition()
  const { t } = useTranslation();


  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const slides = Array.from(container.querySelectorAll(".card-3d__animation-slide"));
    const activeSlide = container.querySelector(".card-3d__animation-active-slide");
    const activeSlideImages = Array.from(
      container.querySelectorAll(".card-3d__animation-active-slide--image")
    );

    slides.forEach((slide, i) => {
      const initialZ = getInitialTranslateZ(slide);

      ScrollTrigger.create({
        trigger: container,
        start: "top center",
        end: "bottom bottom",
        onUpdate: ({ progress }) => {
          gsap.to(activeSlide, {
            opacity: progress * 100,
            ease: "power4.out",
            duration: 0.5,
          });
        },
      });

      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: ({ progress }) => {
          const zIncrement = progress * 10000;
          const currentZ = initialZ + zIncrement;

          const opacity =
            currentZ > -2500
              ? mapRange(currentZ, -2500, 0, 0.5, 1)
              : mapRange(currentZ, -5000, -2500, 0.2, 0.5);

          slide.style.opacity = opacity;
          slide.style.transform = `translateX(-50%) translateY(-50%) translateZ(${currentZ}px)`;

          const isInActiveRange = currentZ >= -1300 && currentZ <= 1000;
          gsap.to(activeSlideImages[i], {
            opacity: isInActiveRange ? 1 : 0,
            duration: 0.5,
            ease: "power3.out",
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="card-3d__animation-container">
      <div className="card-3d__animation-active-slide">
        {portfolioCardAnimation.map((image, index) => (
          <img
            key={index}
            className={`card-3d__animation-active-slide--image card-3d__animation-active-slide--image-${index + 1}`}
            src={image.src}
            alt={t(image.name) || `Slide ${index + 1}`}
            loading="lazy"
          />
        ))}
      </div>

      <div className="card-3d__animation-slider">
        {portfolioCardAnimation.map((image, index) => (
          <div key={index} className="card-3d__animation-slide" id={`slide-${index + 1}`}>
            <a onClick={() => handleLinkClick(image.url)} className="text-decoration--none" aria-label={`View details for ${image.name}`}>
              <div className="slide-img pointer-events--none">
                <img
                  className="d--vh-50 d--w-100 object-fit--cover pointer-events--none"
                  src={image.src}
                  alt={t(image.name) || `Image ${index + 1}`}
                  loading="lazy"
                />
              </div>
              <div className="flex flex--row flex--j-between flex--a-baseline text-transform--uppercase text-color--overlay m--t-3">
                <p className="m--0 h4">{t(image.name)}</p>
                <p className="m--0 h6">({image.date})</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCardAnimation;
