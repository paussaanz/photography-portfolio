import React, { useRef, useEffect } from 'react';
import TextAnimation from './TextAnimation';
import SplitType from 'split-type';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TextAnimationContainer = ({ text, className = '', textColor, maskColor='background--light'}) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    const typeSplit = new SplitType(textRef.current, {
      types: 'lines, words',
    });

    typeSplit.words.forEach((word) => {
      const mask = document.createElement('div');
      mask.className = `line-mask ${maskColor}`; // Aquí agregas una clase basada en textColor
      word.appendChild(mask);
    });

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
  }, [text]); // Depend on text, so it re-runs if text changes

  return (
    <>
        <TextAnimation ref={textRef} className={className} textColor={textColor}>
          {text}
        </TextAnimation>
    </>
  );
};

export default TextAnimationContainer;
