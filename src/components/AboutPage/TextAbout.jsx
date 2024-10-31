import { useEffect, useRef, useState } from "react";
import { gsap } from 'gsap';
import { textAboutImages } from "../../assets/js/images";

const TextAbout = () => {
    const containerRef = useRef(null);
    const itemRefs = useRef([]);
    const [isMouseOverSpan, setIsMouseOverSpan] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [activeSpan, setActiveSpan] = useState(null); // Span activo
    const [currentImageSource, setCurrentImageSource] = useState([]);

    useEffect(() => {
        const updatePositions = () => {
            if (activeSpan && textAboutImages[activeSpan].positions) {
                itemRefs.current.forEach((item, index) => {
                    const { x, y, scale, rotation } = textAboutImages[activeSpan].positions[index];

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
        setCurrentImageSource(textAboutImages[spanId].images)
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
            <div className="about__text-content text-transform--uppercase text-color--primary text-align--center d--vh-100 align-content--center">
                <p className="p--b-5">
                    I'm Paula Sanz, a creative mind with a passion for both <span className="about__text-content-span">photography</span> and web development.
                    Graduated in Audiovisual Communication, I honed my skills in <span className="about__text-content-span">visual storytelling</span> through photography,
                    however my curiosity for the digital world led me to discover a deep interest in web design and development.
                    After completing an intensive bootcamp in web development, I combined both of my passions <span className="about__text-content-span">—visual and digital—</span> into one.
                </p>
                <p>
                    Through SYP!, I showcase my journey, blending photography with web development to create <span className="about__text-content-span"
                        onMouseEnter={(e) => handleMouseEnter(e, "experiences")}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}> captivating digital experiences </span>
                    that not only look good but also engage the users in meaningful ways.
                    Whether I’m behind the lens capturing the perfect shot or behind the screen crafting <span className="about__text-content-span"
                        onMouseEnter={(e) => handleMouseEnter(e, "websites")}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}> engaging websites </span> , my focus is always on bringing <span className="about__text-content-span"
                            onMouseEnter={(e) => handleMouseEnter(e, "visions")}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}> creative visions to life. </span>
                </p>
            </div>

            <div ref={containerRef} className="about__text-gallery--hover">
                {currentImageSource.map((src, index) => (
                    <div ref={el => itemRefs.current[index] = el} className="about__text-gallery-item" key={index}>
                        <img src={src} alt="Gallery hover item" />
                    </div>
                ))}
            </div>
        </>
    );
};

export default TextAbout;
