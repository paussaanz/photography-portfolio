import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ClipPathAnimation = React.memo(({ onImageChange, images }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const children = Array.from(container.children);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom+=200vh top",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const index = Math.min(Math.floor(progress * images.length), images.length - 1);
          onImageChange(index);
        },
      },
    });

    children.forEach((child, index) => {
      timeline.fromTo(
        child,
        { clipPath: "circle(0% at 100% 0%)" },
        { clipPath: "circle(150% at 100% 0%)", duration: 1 },
        index * 1
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      timeline.kill();
    };
  }, [onImageChange, images]);

  return (
    <div className="favorites-about__clip-path">
      <div ref={containerRef} className="overflow--hidden d--vh-100 d--w-100">
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <div className="flex flex--col d--h-100">
              <div className="favorites-about__clip-path-item">
                <img
                  src={image.src}
                  loading="lazy"
                  alt={`Favorite Image ${index}`}
                  className="favorites-about__clip-path-item-image object-fit--cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ClipPathAnimation;
