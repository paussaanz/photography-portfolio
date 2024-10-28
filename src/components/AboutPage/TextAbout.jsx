import { useEffect, useRef, useState } from "react";
import { gsap } from 'gsap';

const TextAbout = () => {
    const containerRef = useRef(null);
    const itemRefs = useRef([]);
    const [isMouseOverSpan, setIsMouseOverSpan] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const numberOfItems = itemRefs.current.length;
        const angleIncrement = (2 * Math.PI) / numberOfItems;

        const updatePositions = () => {
            itemRefs.current.forEach((item, index) => {
                const angle = index * angleIncrement;
                const radius = 300;  // radius of the circle
                const itemX = mousePosition.x + radius * Math.cos(angle) - item.offsetWidth / 2;
                const itemY = mousePosition.y + radius * Math.sin(angle) - item.offsetHeight / 2;

                gsap.to(item, {
                    x: itemX,
                    y: itemY,
                    opacity: isMouseOverSpan ? 1 : 0,
                    duration: 0.5,
                    ease: "power1.out"
                });
            });
        };

        if (isMouseOverSpan) {
            updatePositions();
        }
    }, [mousePosition, isMouseOverSpan]);

    const handleMouseEnter = (event) => {
        setIsMouseOverSpan(true);
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        });
    };

    const handleMouseMove = (event) => {
        if (!isMouseOverSpan) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        });
    };

    const handleMouseLeave = () => {

        setIsMouseOverSpan(false);
        console.log("SPAN", isMouseOverSpan )
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
                        onMouseEnter={handleMouseEnter}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}>
                        captivating digital experiences
                    </span>
                    that not only look good but also engage the users in meaningful ways.
                    Whether I’m behind the lens capturing the perfect shot or behind the screen crafting
                    <span className="text-about__content-span"
                        onMouseEnter={handleMouseEnter}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}>
                        engaging websites
                    </span>
                    , my focus is always on bringing
                    <span className="text-about__content-span"
                        onMouseEnter={handleMouseEnter}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}>
                        creative visions to life.
                    </span>
                </p>
            </div>

            <div ref={containerRef} className="container-gallery-hover">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div ref={el => itemRefs.current[index] = el} className="item-gallery-hover" key={index}>
                        <img src={`https://picsum.photos/id/${index + 10}/200/200`} alt="Gallery item" />
                    </div>
                ))}

            </div>
        </>
    );
};

export default TextAbout;