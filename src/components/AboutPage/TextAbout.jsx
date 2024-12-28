import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { textAboutImages } from "../../assets/js/images";
import { useTranslation } from "react-i18next";

const TextAbout = () => {
    const containerRef = useRef(null);
    const itemRefs = useRef([]);
    const [hoverState, setHoverState] = useState({
        isHovering: false,
        activeSpan: null,
        mousePosition: { x: 0, y: 0 },
        currentImages: [],
    });
    const { t } = useTranslation();

    useEffect(() => {
        const updatePositions = () => {
            if (!hoverState.isHovering || !hoverState.activeSpan) return;

            const { activeSpan, mousePosition } = hoverState;
            const { positions } = textAboutImages[activeSpan] || {};

            if (positions) {
                itemRefs.current.forEach((item, index) => {
                    const { x, y, scale, rotation } = positions[index];

                    gsap.fromTo(
                        item,
                        {
                            x: mousePosition.x + x,
                            y: mousePosition.y + y,
                            scale,
                            rotation,
                        },
                        {
                            x: mousePosition.x + x,
                            y: mousePosition.y + y,
                            scale,
                            rotation,
                            opacity: 1,
                            delay: 0.1 * index,
                            duration: 0.5,
                            ease: "power1.out",
                        }
                    );
                });
            }
        };

        if (hoverState.isHovering) {
            updatePositions();
        } else {
            itemRefs.current.forEach((item) => {
                gsap.to(item, {
                    opacity: 0,
                    duration: 0.2,
                    ease: "power1.out",
                });
            });
        }
    }, [hoverState]);

    const handleMouseEnter = (event, spanId) => {
        const rect = containerRef.current.getBoundingClientRect();
        setHoverState({
            isHovering: true,
            activeSpan: spanId,
            mousePosition: {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
            },
            currentImages: textAboutImages[spanId]?.images || [],
        });
    };

    const handleMouseLeave = () => {
        setHoverState({
            isHovering: false,
            activeSpan: null,
            mousePosition: { x: 0, y: 0 },
            currentImages: [],
        });
    };

    return (
        <>
            <div className="about__text-content container-bem-mbl text-transform--uppercase text-color--primary align-content--center">
                <p className="p--b-5">
                    {t("about.texts.0")}
                    <span className="about__text-content-span">{t("about.keywords.0")}</span> {t("about.texts.1")}
                    {t("about.texts.2")}
                    <span className="about__text-content-span">{t("about.keywords.1")}</span>{t("about.texts.3")}
                    {t("about.texts.4")}
                    <span className="about__text-content-span">{t("about.keywords.2")}</span>{t("about.texts.5")}
                </p>
                <p>
                    {t("about.texts.6")}
                    <span
                        className="about__text-content-span"
                        onMouseEnter={(e) => handleMouseEnter(e, "experiences")}
                        onMouseLeave={handleMouseLeave}
                    >
                        {t("about.keywords.3")}
                    </span>{" "}
                    {t("about.texts.7")}
                    <span
                        className="about__text-content-span"
                        onMouseEnter={(e) => handleMouseEnter(e, "websites")}
                        onMouseLeave={handleMouseLeave}
                    >
                        {t("about.keywords.4")}
                    </span>
                    {t("about.texts.8")}
                    <span
                        className="about__text-content-span"
                        onMouseEnter={(e) => handleMouseEnter(e, "visions")}
                        onMouseLeave={handleMouseLeave}
                    >
                        {t("about.keywords.5")}
                    </span>
                </p>
            </div>

            <div ref={containerRef} className="about__text-gallery--hover">
                {hoverState.currentImages.map((src, index) => (
                    <div ref={(el) => (itemRefs.current[index] = el)} className="about__text-gallery-item" key={index}>
                        <img src={src} loading="lazy" alt="Gallery hover item" className="pointer-events--none" />
                    </div>
                ))}
            </div>
        </>
    );
};

export default TextAbout;
