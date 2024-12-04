import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import SplitType from "split-type";

const MarqueeAbout = () => {
  gsap.registerPlugin(ScrollTrigger);
  const marqueeRef = useRef(null);
  const splitInstances = useRef([]);

  useEffect(() => {
    // Initialize SplitType for all lines
    const marqueeLines = ["#marqueeTop", "#marqueeMiddle", "#marqueeBottom"];
    splitInstances.current = marqueeLines.map((selector) =>
      new SplitType(selector, {
        types: "chars",
        tagName: "span",
        charClass: "about__marquee-char",
      })
    );

    const chars = marqueeRef.current.querySelectorAll(".about__marquee-char");

    // Mousemove and mouseleave handlers
    const handleMouseMove = (e, char) => {
      const rect = char.getBoundingClientRect();
      const charX = rect.left + rect.width / 2;
      const charY = rect.top + rect.height / 2;

      const distanceX = (e.clientX - charX) / 3;
      const distanceY = (e.clientY - charY) / 4;
      const rotationAngle = (e.clientX - charX) / 4;

      gsap.to(char, {
        x: distanceX,
        y: distanceY,
        rotate: rotationAngle,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = (char) => {
      gsap.to(char, {
        x: 0,
        y: 0,
        rotate: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    chars.forEach((char) => {
      const onMouseMove = (e) => handleMouseMove(e, char);
      const onMouseLeave = () => handleMouseLeave(char);

      char.addEventListener("mousemove", onMouseMove);
      char.addEventListener("mouseleave", onMouseLeave);

      // Cleanup listeners
      return () => {
        char.removeEventListener("mousemove", onMouseMove);
        char.removeEventListener("mouseleave", onMouseLeave);
      };
    });

    // Initialize marquee scroll animation
    gsap.set(marqueeLines, { xPercent: 0 });

    ScrollTrigger.create({
      trigger: marqueeRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to("#marqueeTop", { xPercent: -25 * progress, ease: "none" });
        gsap.to("#marqueeMiddle", { xPercent: 25 * progress, ease: "none" });
        gsap.to("#marqueeBottom", { xPercent: -7 * progress, ease: "none" });
      },
    });

    // Cleanup on unmount
    return () => {
      splitInstances.current.forEach((instance) => instance.revert());
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <div
      ref={marqueeRef}
      className="d--vh-100 d--h-100-mbl position--relative flex flex--j-center flex--a-center text-transform--uppercase overflow--hidden"
    >
      <div className="marquee-about__inner">
        <div id="marqueeTop" className="about__marquee-part">
          CREATIVE
        </div>
        <div id="marqueeMiddle" className="about__marquee-part">
          Freelance
        </div>
        <div id="marqueeBottom" className="about__marquee-part">
          DEVELOPER
        </div>
      </div>
    </div>
  );
};

export default MarqueeAbout;
