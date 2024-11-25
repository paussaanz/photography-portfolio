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
      types: 'words, chars',
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

    typeSplit.chars.forEach((char) => {
      char.addEventListener('mousemove', (e) => {
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
          scale:1.6,
          duration: 0.3,
          ease: 'power3.out',
        });
      });
  
      // Reset character position when the mouse leaves
      char.addEventListener('mouseleave', () => {
        gsap.to(char, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power3.out',
        });
        gsap.delayedCall(1.5, () => {
          gsap.to(char, {
            rotation: 0, // Reset rotation to 0
            scale:1,
            duration: 0.5, // Duration of the reset
            ease: 'power3.out',
          });
        });
      });
    });
    

    return () => {
      typeSplit.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [text]);

  return (
    <div className={`text-container ${className} container-bem-mbl`}>
      <div ref={textRef} className={`b1 b4-mbl text-align--center text-align--left-mbl ${textColor} text-transform--uppercase`}>
        {text}
      </div>
    </div>
  );
};

export default TextAnimation;
