import React, { useRef, useEffect } from 'react';
import SplitType from 'split-type';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TextAnimation = ({ text, className = '', textColor = "text-color--primary", maskColor = 'background--light' }) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Dividir texto en líneas y palabras
    const typeSplit = new SplitType(textRef.current, {
      types: 'lines, words',
    });

    // Crear máscaras para cada palabra
    typeSplit.words.forEach((word) => {
      const mask = document.createElement('div');
      mask.className = `line-mask ${maskColor}`;
      word.appendChild(mask);
    });

    // Crear la animación de desplazamiento
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top center',
        end: '+=100vh',
        scrub: 1,
      },
    });

    const allMasks = gsap.utils.toArray('.line-mask');
    tl.to(allMasks, {
      height: '0%',
      duration: 1,
      stagger: 0.5,
    });

    return () => {
      typeSplit.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [text]);

  return (
    <div className={`text-container ${className}`}>
      <div ref={textRef} className={`fs-2 fw-light text-align--center ${textColor} text-transform--uppercase`}>
        {text}
      </div>
    </div>
  );
};

export default TextAnimation;
