import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LoaderAbout = () => {
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial loader animation
    const loaderTimeline = gsap.timeline();

    loaderTimeline
      .fromTo(
        imageRef.current,
        { height: 0 },
        {
          height: "400px",
          duration: 2,
          ease: "power4.inOut",
        }
      )
      .to(
        titleRef.current,
        {
          opacity: 1,
          duration: 1,
          ease: "power4.inOut",
        },
        "<" // Aligns with the start of the previous animation
      );

    // Scroll-triggered animations
    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top", // Start when the container reaches the top
        end: "center top", // End when the container's center reaches the top
        scrub: 1, // Smooth scrolling
      },
    });

    scrollTimeline
      .fromTo(
        titleRef.current,
        { yPercent: 50, fontSize: "12vw" },
        { yPercent: -45, fontSize: "9vw" }
      )
      .fromTo(
        imageRef.current,
        { yPercent: 0, height: "400px" },
        { yPercent: 110, width: "100vw", height: "70vh" },
        0 // Synchronize with the title animation
      );

    // Cleanup on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.globalTimeline.clear();
    };
  }, []);

  return (
    <div ref={containerRef} className="container-bem">
      <div className="text-color--primary text-align--center flex flex--j-center flex--a-center flex--col d--vh-100">
        <img
          ref={imageRef}
          className="about__hero-image about__hero-image-loader"
          src="/images/hi/about.webp"
          alt="Hero image"
          loading="lazy"
        />
        <h1
          ref={titleRef}
          className="about__hero-title about__hero-title-loader"
        >
          ABOUT SYP!
        </h1>
      </div>
    </div>
  );
};

export default LoaderAbout;
