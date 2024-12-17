import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HeroAbout = () => {
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize animations and scroll triggers
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top", // Start animation when the top of the container hits the top of the viewport
        end: "center top", // End animation when the container's center hits the top of the viewport
        scrub: 1, // Smooth animation syncing with scroll
      },
    });

    timeline
      .fromTo(
        titleRef.current,
        { yPercent: 50, fontSize: "12vw" },
        { yPercent: -45, fontSize: "9vw", ease: "power1.out" }
      )
      .fromTo(
        imageRef.current,
        { yPercent: 0, height: "400px" },
        { yPercent: 110, width: "100vw", height: "70vh", ease: "power1.out" },
        0 // Synchronize with title animation
      );

    // Cleanup on component unmount to prevent memory leaks
    return () => {
      if (timeline.scrollTrigger) timeline.scrollTrigger.kill();
      timeline.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="container-bem">
      <div className="text-color--primary text-align--center flex flex--j-center flex--a-center flex--col d--vh-100">
        <img
          ref={imageRef}
          loading="lazy"
          className="about__hero-image"
          src="/images/hi/about.webp"
          alt="Hero about"
        />
        <h1 ref={titleRef} className="about__hero-title">
          ABOUT SYP!
        </h1>
      </div>
    </div>
  );
};

export default HeroAbout;
