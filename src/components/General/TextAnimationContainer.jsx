import React, { useRef, useEffect } from 'react';
import TextAnimation from './TextAnimation';
import SplitType from 'split-type';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TextAnimationContainer = ({ text, className = '' }) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    const typeSplit = new SplitType(textRef.current, {
      types: 'lines, words',
    });

    typeSplit.words.forEach((word) => {
      const mask = document.createElement('div');
      mask.className = 'line-mask';
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
      width: '0%',
      duration: 1,
      stagger: 0.5,
    });

    return () => {
      typeSplit.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [text]); // Depend on text, so it re-runs if text changes

  return (
    <div className="container">
      <div className="row">
        <TextAnimation ref={textRef} className={className}>
          {text}
        </TextAnimation>
      </div>
    </div>
  );
};

export default TextAnimationContainer;
