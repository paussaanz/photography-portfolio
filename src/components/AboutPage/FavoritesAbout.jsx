import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ClipPathAnimation from "./ClipPathAnimation";
import { favoritesAbout } from "../../assets/js/images";
import { useMediaQuery } from "../../contexts/MediaQueryContext";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const FavoritesAbout = () => {
  const listItemsRef = useRef([]); // Store references to <li> elements
  const { isMobile } = useMediaQuery();
  const { t, i18n } = useTranslation();

  // Function to initialize GSAP animations
  const initAnimations = useCallback(() => {
    // Kill previous animations
    gsap.killTweensOf(".favorites-about__text-title");
    gsap.killTweensOf(".favorites-about__text-list");

    // ScrollTrigger animation
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

  useEffect(() => {
    initAnimations(); // Initialize animations on mount

    // Listen for language changes to reinitialize animations
    const handleLanguageChange = () => {
      initAnimations();
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [initAnimations]);

  const handleImageChange = (index) => {
    listItemsRef.current.forEach((li, liIndex) => {
      if (li) {
        gsap.to(li, {
          color: liIndex === index ? "var(--cor-secondary)" : "var(--cor-primary)",
          scale: liIndex === index ? (isMobile ? 1.1 : 1.2) : 1,
          duration: 0.2,
          ease: "power2.out",
        });
      }
    });
  };

  return (
    <div style={{ height: "240vh", position: "relative" }}>
      <div className="d--vh-100 position--sticky position--top-0 overflow--y-hidden ">
        <div className="flex flex--row flex--col-mbl flex--j-between d--h-100 p--t-6-mbl">
          <div className="favorites-about__text d--w-100 m--y-auto text-align--center text-color--primary">
            <h1 className="favorites-about__text-title text-transform--uppercase h2-mbl">
              <span>{t("about.favourites.title.0")}</span>{" "}
              <span className="b1 favorites-about__text-gamilia">
                {t("about.favourites.title.1")} <br /> {t("about.favourites.title.2")}
              </span>
            </h1>
            <ul className="favorites-about__text-list d--w-100">
              {favoritesAbout.map((image, index) => (
                <li
                  key={image.name}
                  ref={(el) => (listItemsRef.current[index] = el)}
                  className="favorites-about__text-list-item h5 d--w-100"
                >
                  {t(image.name)}
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
