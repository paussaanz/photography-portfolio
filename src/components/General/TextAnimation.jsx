import React, { useRef, useEffect } from "react";
import SplitType from "split-type";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "../../contexts/MediaQueryContext";
import { useLocation } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const TextAnimation = ({
  text,
  className = "",
  textColor = "text-color--primary",
  maskColor = "background--light",
}) => {
  const textRef = useRef(null);
  const { isMobile } = useMediaQuery();
  const { pathname } = useLocation();

  // Helper function to create masks for words
  const createMasks = (words) => {
    words.forEach((word) => {
      const mask = document.createElement("div");
      mask.className = `line-mask ${maskColor}`;
      word.appendChild(mask);
    });
  };

  // Helper function for character animations
  const setupCharacterInteractions = (chars) => {
    chars.forEach((char) => {
      char.addEventListener("mousemove", (e) => {
        const rect = char.getBoundingClientRect();
        const charX = rect.left + rect.width / 2;
        const charY = rect.top + rect.height / 2;

        const distanceX = (e.clientX - charX) / 7;
        const distanceY = (e.clientY - charY) / 1;
        const rotationAngle = (e.clientX - charX) / 0.8;

        gsap.to(char, {
          x: distanceX,
          y: distanceY,
          rotate: rotationAngle,
          scale: 1.6,
          duration: 0.3,
          ease: "power3.out",
        });
      });

      char.addEventListener("mouseleave", () => {
        gsap.delayedCall(1.5, () => {
          gsap.to(char, {
            x: 0,
            y: 0,
            rotation: 0, // Reset rotation to 0
            scale:1,
            duration: 0.5, // Duration of the reset
            ease: 'power3.out',
          });
        });
      });
    });
  };

  useEffect(() => {
    if (!textRef.current) return;

    // Split text into words and characters
    const typeSplit = new SplitType(textRef.current, { types: "words, chars" });

    // Create masks for each word
    createMasks(typeSplit.words);

    // Setup scroll-triggered animation
    const allMasks = gsap.utils.toArray(".line-mask");
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: "top center",
        end: isMobile ? "bottom bottom" : "+=100vh",
        scrub: 1,
      },
    });

    timeline.to(allMasks, {
      width: "0%",
      duration: 1,
      stagger: 0.5,
    });

    // Setup character-specific interactions
    setupCharacterInteractions(typeSplit.chars);

    // Cleanup on component unmount
    return () => {
      typeSplit.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [text, maskColor, isMobile]);

  return (
    <div className={`text-container ${className} ${pathname === "/" ? "" : "container-bem-mbl"}`}>
      <div
        ref={textRef}
        className={`b1 b2-mbl text-align--center text-align--left-mbl ${textColor} text-transform--uppercase`}
      >
        {text}
      </div>
    </div>
  );
};

export default TextAnimation;