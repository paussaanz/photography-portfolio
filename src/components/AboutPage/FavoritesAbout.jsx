import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ClipPathAnimation from "./ClipPathAnimation";
import { favoritesAbout } from "../../assets/js/images";

gsap.registerPlugin(ScrollTrigger);

const FavoritesAbout = () => {
  const listItemsRef = useRef([]); // Store references to <li> elements

  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".favorites-about__text",
        start: "top 30%",
        end: "bottom+=300vh center",
        scrub: true,
      },
    });

    timeline
      .to(".favorites-about__text-title", {
        opacity: 0.25,
        duration: 1.6,
      })
      .to(".favorites-about__text-list", {
        opacity: 1,
        duration: 1.6,
      });

    return () => {
      timeline.kill();
    };
  }, []);

  const handleImageChange = (index) => {
    listItemsRef.current.forEach((li, liIndex) => {
      if (li) {
        gsap.to(li, {
          color: liIndex === index ? "#DA6A2D" : "#341116",
          scale: liIndex === index ? 1.2 : 1,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    });
  };

  return (
    <div style={{ height: "400vh", position: "relative" }}>
      <div className="d--vh-100 d--vh-navbar position--sticky position--top-0">
        <div className="flex flex--row flex--col-mbl flex--j-between d--h-100 p--t-6-mbl">
          <div className="favorites-about__text d--w-100 m--y-auto text-align--center text-color--primary">
            <h1 className="favorites-about__text-title text-transform--uppercase h2-mbl">
              <span>SOME OF MY</span>{" "}
              <span className="b1 favorites-about__text-gamilia">
                Personal <br /> Favorites
              </span>
            </h1>
            <ul className="favorites-about__text-list d--w-100">
              {favoritesAbout.map((image, index) => (
                <li
                  key={image.name}
                  ref={(el) => (listItemsRef.current[index] = el)}
                  className="favorites-about__text-list-item h5 d--w-100"
                >
                  {image.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="favorites-about__images d--w-100 flex flex--column flex--j-center flex--a-center">
            <ClipPathAnimation
              onImageChange={handleImageChange}
              images={favoritesAbout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesAbout;
