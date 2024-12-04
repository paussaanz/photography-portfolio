import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { textAboutImages } from "../../assets/js/images";

const TextAbout = () => {
    const containerRef = useRef(null);
    const itemRefs = useRef([]);
    const [hoverState, setHoverState] = useState({
        isHovering: false,
        activeSpan: null,
        mousePosition: { x: 0, y: 0 },
        currentImages: [],
    });

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
                    I'm Paula Sanz, a creative mind with a passion for both{" "}
                    <span className="about__text-content-span">photography</span> and web development.
                    Graduated in Audiovisual Communication, I honed my skills in{" "}
                    <span className="about__text-content-span">visual storytelling</span> through photography,
                    however my curiosity for the digital world led me to discover a deep interest in web design and development.
                    After completing an intensive bootcamp in web development, I combined both of my passions{" "}
                    <span className="about__text-content-span">—visual and digital—</span> into one.
                </p>
                <p>
                    Through SYP!, I showcase my journey, blending photography with web development to create{" "}
                    <span
                        className="about__text-content-span"
                        onMouseEnter={(e) => handleMouseEnter(e, "experiences")}
                        onMouseLeave={handleMouseLeave}
                    >
                        captivating digital experiences
                    </span>{" "}
                    that not only look good but also engage the users in meaningful ways. Whether I’m behind the lens
                    capturing the perfect shot or behind the screen crafting{" "}
                    <span
                        className="about__text-content-span"
                        onMouseEnter={(e) => handleMouseEnter(e, "websites")}
                        onMouseLeave={handleMouseLeave}
                    >
                        engaging websites
                    </span>
                    , my focus is always on bringing{" "}
                    <span
                        className="about__text-content-span"
                        onMouseEnter={(e) => handleMouseEnter(e, "visions")}
                        onMouseLeave={handleMouseLeave}
                    >
                        creative visions to life.
                    </span>
                </p>
            </div>

            <div ref={containerRef} className="about__text-gallery--hover">
                {hoverState.currentImages.map((src, index) => (
                    <div ref={(el) => (itemRefs.current[index] = el)} className="about__text-gallery-item" key={index}>
                        <img src={src} loading="lazy" alt="Gallery hover item" />
                    </div>
                ))}
            </div>
        </>
    );
};

export default TextAbout;
