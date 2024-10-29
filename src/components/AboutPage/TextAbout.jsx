import { useEffect, useRef, useState } from "react";
import { gsap } from 'gsap';

const TextAbout = () => {
    const containerRef = useRef(null);
    const itemRefs = useRef([]);
    const [isMouseOverSpan, setIsMouseOverSpan] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [activeSpan, setActiveSpan] = useState(null); // Span activo

    // Definir posiciones y rotaciones predefinidas para cada span
    const predefinedPositions = {
        "experiences": [
            { x: -150, y: -100, scale: 1.2, rotation: -10 },
            { x: 100, y: -150, scale: 1.3, rotation: 15 },
            { x: -120, y: 100, scale: 1.4, rotation: -20 },
            { x: 130, y: 80, scale: 1.1, rotation: 10 },
        ],
        "websites": [
            { x: -180, y: -130, scale: 1.3, rotation: -5 },
            { x: 120, y: -120, scale: 1.5, rotation: 20 },
            { x: -100, y: 130, scale: 1.2, rotation: -15 },
            { x: 150, y: 100, scale: 1.0, rotation: 5 },
        ],
        "visions": [
            { x: -160, y: -140, scale: 1.1, rotation: -8 },
            { x: 140, y: -140, scale: 1.4, rotation: 18 },
            { x: -110, y: 140, scale: 1.2, rotation: -12 },
            { x: 160, y: 120, scale: 1.1, rotation: 8 },
        ]
    };

    useEffect(() => {
        const updatePositions = () => {
            if (activeSpan && predefinedPositions[activeSpan]) {
                itemRefs.current.forEach((item, index) => {
                    const { x, y, scale, rotation } = predefinedPositions[activeSpan][index];

                    gsap.fromTo(item, {
                        x: mousePosition.x + x,
                        y: mousePosition.y + y,
                        scale: scale,
                        rotation: rotation,
                    }, {
                        x: mousePosition.x + x,
                        y: mousePosition.y + y,
                        scale: scale,
                        rotation: rotation,
                        opacity: 1,
                        delay: 0.3 * index,
                        duration: 0.5,
                        ease: "power1.out"
                    });
                });
            }
        };

        if (isMouseOverSpan) {
            updatePositions();
        } else {
            itemRefs.current.forEach((item) => {
                gsap.killTweensOf(item); // Detenemos animaciones previas
                gsap.to(item, {
                    opacity: 0,
                    duration: 0,
                    ease: "power1.out"
                });
            });
        }

    }, [isMouseOverSpan, activeSpan]);

    const handleMouseEnter = (event, spanId) => {
        setIsMouseOverSpan(true);
        setActiveSpan(spanId); // Actualizar el span activo
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        });
    };

    const handleMouseMove = (event) => {
        console.log('no haria nada aun si no es necesario ya')
    };

    const handleMouseLeave = () => {
        setIsMouseOverSpan(false);
        setActiveSpan(null); // Limpiar el span activo cuando el mouse sale
    };

    return (
        <>
            <div className="text-about__content text-transform--uppercase text-color--primary text-align--center dimension--vh-100">
                <p className="padding--bottom-5">
                    I'm Paula Sanz, a creative mind with a passion for both <span className="text-about__content-span">photography</span> and web development.
                    Graduated in Audiovisual Communication, I honed my skills in <span className="text-about__content-span">visual storytelling</span> through photography,
                    however my curiosity for the digital world led me to discover a deep interest in web design and development.
                    After completing an intensive bootcamp in web development, I combined both of my passions <span className="text-about__content-span">—visual and digital—</span> into one.
                </p>
                <p>
                    Through SYP!, I showcase my journey, blending photography with web development to create
                    <span className="text-about__content-span"
                        onMouseEnter={(e) => handleMouseEnter(e, "experiences")}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}>
                        captivating digital experiences
                    </span>
                    that not only look good but also engage the users in meaningful ways.
                    Whether I’m behind the lens capturing the perfect shot or behind the screen crafting
                    <span className="text-about__content-span"
                        onMouseEnter={(e) => handleMouseEnter(e, "websites")}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}>
                        engaging websites
                    </span>
                    , my focus is always on bringing
                    <span className="text-about__content-span"
                        onMouseEnter={(e) => handleMouseEnter(e, "visions")}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}>
                        creative visions to life.
                    </span>
                </p>
            </div>

            <div style={{ pointerEvents: 'none' }} ref={containerRef} className="container-gallery-hover">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div ref={el => itemRefs.current[index] = el} className="item-gallery-hover" key={index}>
                        <img src={`https://picsum.photos/id/${index + 10}/300/300`} alt="Gallery item" />
                    </div>
                ))}
            </div>
        </>
    );
};

export default TextAbout;
