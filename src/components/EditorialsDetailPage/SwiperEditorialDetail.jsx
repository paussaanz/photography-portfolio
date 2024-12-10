// import React, { useState, useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { CustomEase } from "gsap/CustomEase";

// gsap.registerPlugin(CustomEase);
// CustomEase.create(
//   "hop",
//   "M0,0 C0.488,0.02 0.467,0.286 0.5,0.5 0.532,0.712 0.58,1 1,1"
// );

// const SwiperEditorialDetail = () => {
//   const sliderRef = useRef(null);
//   const titleRef = useRef(null);
//   const [activeSlideIndex, setActiveSlideIndex] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);

//   const sliderContent = [
//     { name: "Serene Space", img: "/images/mid/lifestyle-5.webp" },
//     { name: "Gentle Horizon", img: "/images/mid/lifestyle-7.webp" },
//     { name: "Quiet Flow", img: "/images/mid/lifestyle-12.webp" },
//     { name: "Ethereal Light", img: "/images/mid/lifestyle-1.webp" },
//     { name: "Calm Drift", img: "/images/mid/lifestyle-2.webp" },
//     { name: "Subtle Balance", img: "/images/mid/lifestyle-3.webp" },
//     { name: "Soft Whisper", img: "/images/mid/lifestyle-4.webp" },
//   ];

//   const totalSlides = sliderContent.length;

//   const clipPath = {
//     closed: "polygon(25% 30%, 75% 30%, 75% 70%, 25% 70%)",
//     open: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
//   };

//   const slidePositions = {
//     prev: { left: "15%", rotation: -90 },
//     active: { left: "50%", rotation: 0 },
//     next: { left: "85%", rotation: 90 },
//   };

//   useEffect(() => {
//     const initialTitle = titleRef.current.querySelector("h1");
//     splitTextIntoSpans(initialTitle);

//     gsap.fromTo(
//       initialTitle.querySelectorAll("span"),
//       { y: 60 },
//       { y: 0, duration: 1, stagger: 0.02, ease: "hop" }
//     );

//     setSlideStyles();
//   }, [activeSlideIndex]);

//   const splitTextIntoSpans = (element) => {
//     element.innerHTML = element.innerText
//       .split("")
//       .map((char) => `<span>${char === " " ? "&nbsp;&nbsp;" : char}</span>`)
//       .join("");
//   };

//   const setSlideStyles = () => {
//     const slides = sliderRef.current.querySelectorAll(".slide-container");
//     slides.forEach((slide, index) => {
//       const position =
//         index === activeSlideIndex
//           ? slidePositions.active
//           : index === (activeSlideIndex + 1) % totalSlides
//           ? slidePositions.next
//           : index === (activeSlideIndex - 1 + totalSlides) % totalSlides
//           ? slidePositions.prev
//           : null;

//       if (position) {
//         gsap.set(slide, {
//           left: position.left,
//           rotation: position.rotation,
//           clipPath: index === activeSlideIndex ? clipPath.open : clipPath.closed,
//         });
//         gsap.to(slide.querySelector(".slide-img"), {
//           rotation: -position.rotation,
//           duration: 2,
//           ease: "hop",
//         });
//       }
//     });
//   };

//   const transitionSlides = (direction) => {
//     if (isAnimating) return;
//     setIsAnimating(true);

//     const nextActiveIndex =
//       (activeSlideIndex + (direction === "next" ? 1 : -1) + totalSlides) %
//       totalSlides;

//     const outgoingSlide = sliderRef.current.querySelector(".slide-container.active");
//     const incomingSlide = sliderRef.current.querySelector(
//       direction === "next" ? ".slide-container.next" : ".slide-container.prev"
//     );

//     gsap.to(outgoingSlide, {
//       clipPath: clipPath.closed,
//       duration: 2,
//       ease: "hop",
//     });

//     gsap.to(incomingSlide, {
//       clipPath: clipPath.open,
//       duration: 2,
//       ease: "hop",
//       onComplete: () => {
//         setActiveSlideIndex(nextActiveIndex);
//         setIsAnimating(false);
//       },
//     });
//   };

//   return (
//     <div className="slider" ref={sliderRef}>
//       {sliderContent.map((slide, index) => {
//         const className =
//           index === activeSlideIndex
//             ? "slide-container active"
//             : index === (activeSlideIndex + 1) % totalSlides
//             ? "slide-container next"
//             : index === (activeSlideIndex - 1 + totalSlides) % totalSlides
//             ? "slide-container prev"
//             : "slide-container";
//         return (
//           <div key={index} className={className}>
//             <div className="slide-img">
//               <img src={slide.img} alt={slide.name} />
//             </div>
//           </div>
//         );
//       })}

//       <div className="slider-title" ref={titleRef}>
//         <h1>{sliderContent[activeSlideIndex].name}</h1>
//       </div>

//       <div className="slider-counter">
//         <p>
//           <span>{activeSlideIndex + 1}</span> / {totalSlides}
//         </p>
//       </div>

//       <div className="slider-items">
//         {sliderContent.map((slide, index) => (
//           <p
//             key={index}
//             className={index === activeSlideIndex ? "activeItem" : ""}
//             onClick={() => !isAnimating && setActiveSlideIndex(index)}
//           >
//             {slide.name}
//           </p>
//         ))}
//       </div>

//       <div className="slider-preview">
//         <img
//           src={sliderContent[activeSlideIndex].img}
//           alt={sliderContent[activeSlideIndex].name}
//         />
//       </div>

//       <div className="slider-controls">
//         <button onClick={() => transitionSlides("prev")} disabled={isAnimating}>
//           Prev
//         </button>
//         <button onClick={() => transitionSlides("next")} disabled={isAnimating}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SwiperEditorialDetail;

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);
CustomEase.create(
    "hop",
    "M0,0 C0.488,0.02 0.467,0.286 0.5,0.5 0.532,0.712 0.58,1 1,1"
);

const SwiperEditorialDetail = () => {
    const sliderRef = useRef(null);
    const titleRef = useRef(null);
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

const sliderContent = [
    { name: "Serene Space", img: "/images/mid/lifestyle-5.webp" },
    { name: "Gentle Horizon", img: "/images/mid/lifestyle-7.webp" },
    { name: "Quiet Flow", img: "/images/mid/lifestyle-12.webp" },
    { name: "Ethereal Light", img: "/images/mid/lifestyle-1.webp" },
    { name: "Calm Drift", img: "/images/mid/lifestyle-2.webp" },
    { name: "Subtle Balance", img: "/images/mid/lifestyle-3.webp" },
    { name: "Soft Whisper", img: "/images/mid/lifestyle-4.webp" },
];

    const totalSlides = sliderContent.length;

    const clipPath = {
        closed: "polygon(25% 30%, 75% 30%, 75% 70%, 25% 70%)",
        open: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    };

    const slidePositions = {
        prev: { left: "15%", rotation: -90 },
        active: { left: "50%", rotation: 0 },
        next: { left: "85%", rotation: 90 },
    };

    const getSlideClassAndStyle = (index) => {
        if (index === activeSlideIndex) {
            return { className: "slide-container active", style: slidePositions.active };
        } else if ((index + 1) % totalSlides === activeSlideIndex) {
            return { className: "slide-container prev", style: slidePositions.prev };
        } else if ((index - 1 + totalSlides) % totalSlides === activeSlideIndex) {
            return { className: "slide-container next", style: slidePositions.next };
        }
        return null; // Exclude other slides
    };

    useEffect(() => {
        const initialTitle = titleRef.current.querySelector("h1");
        splitTextIntoSpans(initialTitle);

        gsap.fromTo(
            initialTitle.querySelectorAll("span"),
            { y: 60 },
            { y: 0, duration: 1, stagger: 0.02, ease: "hop" }
        );

        setSlideClipPaths();
    }, [activeSlideIndex]);

    const splitTextIntoSpans = (element) => {
        element.innerHTML = element.innerText
            .split("")
            .map((char) => `<span>${char === " " ? "&nbsp;&nbsp;" : char}</span>`)
            .join("");
    };

    const setSlideClipPaths = () => {
        const slides = sliderRef.current.querySelectorAll(".slide-container");
        slides.forEach((slide, index) => {
            const clipPathStyle =
                index === activeSlideIndex ? clipPath.open : clipPath.closed;
            gsap.set(slide, { clipPath: clipPathStyle });
        });
    };

    const transitionSlides = (direction) => {
        if (isAnimating) return;
        setIsAnimating(true);

        const nextActiveIndex =
            (activeSlideIndex + (direction === "next" ? 1 : -1) + totalSlides) %
            totalSlides;

        const outgoingSlide = sliderRef.current.querySelector(".slide-container.active");
        const incomingSlide = sliderRef.current.querySelector(
            direction === "next" ? ".slide-container.next" : ".slide-container.prev"
        );

        gsap.timeline({
            onComplete: () => {
                setActiveSlideIndex(nextActiveIndex);
                setIsAnimating(false);
            },
        })
            .to(outgoingSlide, {
                clipPath: clipPath.closed,
                duration: 1.5,
                ease: "hop",
            })
            .to(
                outgoingSlide.querySelector("img"),
                {
                    opacity: 0.5,
                    scale: 0.8,
                    duration: 1.5,
                    ease: "power2.inOut",
                },
                0
            )
            .set(incomingSlide, {
                clipPath: clipPath.closed,
            })
            .to(incomingSlide.querySelector("img"), {
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease: "power2.inOut",
            });
    };

    return (
        <div className="slider" ref={sliderRef}>
            {sliderContent.map((slide, index) => {
                const slideClassAndStyle = getSlideClassAndStyle(index);
                if (!slideClassAndStyle) return null; // Render only `prev`, `active`, and `next`
                return (
                    <div
                        key={index}
                        className={slideClassAndStyle.className}
                        style={slideClassAndStyle.style}
                    >
                        <div className="slide-img">
                            <img src={slide.img} alt={slide.name} />
                        </div>
                    </div>
                );
            })}

            <div className="slider-title" ref={titleRef}>
                <h1>{sliderContent[activeSlideIndex].name}</h1>
            </div>

            <div className="slider-counter">
                <p>
                    <span>{activeSlideIndex + 1}</span> / {totalSlides}
                </p>
            </div>

            <div className="slider-items">
                {sliderContent.map((slide, index) => (
                    <p
                        key={index}
                        className={index === activeSlideIndex ? "activeItem" : ""}
                        onClick={() => !isAnimating && setActiveSlideIndex(index)}
                    >
                        {slide.name}
                    </p>
                ))}
            </div>

            <div className="slider-controls">
                <button onClick={() => transitionSlides("prev")} disabled={isAnimating}>
                    Prev
                </button>
                <button onClick={() => transitionSlides("next")} disabled={isAnimating}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default SwiperEditorialDetail;

// import React, { useState, useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { CustomEase } from "gsap/CustomEase";

// gsap.registerPlugin(CustomEase);
// CustomEase.create(
//     "hop",
//     "M0,0 C0.488,0.02 0.467,0.286 0.5,0.5 0.532,0.712 0.58,1 1,1"
// );

// const SwiperEditorialDetail = () => {
//     const sliderRef = useRef(null);
//     const titleRef = useRef(null);
//     const sliderTitleRef = useRef(null);
//     const sliderCounterRef = useRef(null);
//     const sliderItemsRef = useRef(null);

//     const totalSlides = 7;
//     const [activeSlideIndex, setActiveSlideIndex] = useState(0);
//     const [isAnimating, setIsAnimating] = useState(false);

//     const sliderContent = [
//         { name: "Serene Space", img: "/images/mid/lifestyle-5.webp" },
//         { name: "Gentle Horizon", img: "/images/mid/lifestyle-7.webp" },
//         { name: "Quiet Flow", img: "/images/mid/lifestyle-12.webp" },
//         { name: "Ethereal Light", img: "/images/mid/lifestyle-1.webp" },
//         { name: "Calm Drift", img: "/images/mid/lifestyle-2.webp" },
//         { name: "Subtle Balance", img: "/images/mid/lifestyle-3.webp" },
//         { name: "Soft Whisper", img: "/images/mid/lifestyle-4.webp" },
//     ];

//     const clipPath = {
//         closed: "polygon(25% 30%, 75% 30%, 75% 70%, 25% 70%)",
//         open: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
//     };

//     const slidePositions = {
//         prev: { left: "15%", rotation: -90 },
//         active: { left: "50%", rotation: 0 },
//         next: { left: "85%", rotation: 90 },
//     };

//     const getSlideClassAndStyle = (index) => {
//         if (index === activeSlideIndex) {
//             return { className: "slide-container active", style: slidePositions.active };
//         }
//         if ((index + 1) % totalSlides === activeSlideIndex) {
//             return { className: "slide-container prev", style: slidePositions.prev };
//         }
//         if ((index - 1 + totalSlides) % totalSlides === activeSlideIndex) {
//             return { className: "slide-container next", style: slidePositions.next };
//         }
//         return null;
//     };

//     useEffect(() => {
//         const initialTitle = sliderTitleRef.current.querySelector("h1");
//         splitTextIntoSpans(initialTitle);

//         gsap.fromTo(
//             initialTitle.querySelectorAll("span"),
//             { y: 60 },
//             { y: 0, duration: 1, stagger: 0.02, ease: "hop" }
//         );

//         updateCounterAndHighlight(activeSlideIndex);
//     }, [activeSlideIndex]);

//     const splitTextIntoSpans = (element) => {
//         element.innerHTML = element.innerText
//             .split("")
//             .map((char) => `<span>${char === " " ? "&nbsp;&nbsp;" : char}</span>`)
//             .join("");
//     };

//     const createAndAnimateTitle = (content, direction) => {
//         const newTitle = document.createElement("h1");
//         newTitle.innerText = content.name;
//         sliderTitleRef.current.appendChild(newTitle);
//         splitTextIntoSpans(newTitle);

//         const yOffset = direction === "next" ? 60 : -60;
//         gsap.set(newTitle.querySelectorAll("span"), { y: yOffset });
//         gsap.to(newTitle.querySelectorAll("span"), {
//             y: 0,
//             duration: 1.25,
//             stagger: 0.02,
//             ease: "hop",
//             delay: 0.25,
//         });

//         const currentTitle = sliderTitleRef.current.querySelector("h1:not(:last-child)");
//         if (currentTitle) {
//             gsap.to(currentTitle.querySelectorAll("span"), {
//                 y: -yOffset,
//                 duration: 1.25,
//                 stagger: 0.02,
//                 ease: "hop",
//                 delay: 0.25,
//                 onComplete: () => currentTitle.remove(),
//             });
//         }
//     };

//     const updateCounterAndHighlight = (index) => {
//         const counter = sliderCounterRef.current.querySelector("span:first-child");
//         counter.textContent = index + 1;
//         const items = sliderItemsRef.current.querySelectorAll("p");
//         items.forEach((item, i) => {
//             item.classList.toggle("activeItem", i === index);
//         });
//     };

//     const animateSlide = (slide, props) => {
//         gsap.to(slide, { ...props, duration: 2, ease: "hop" });
//         gsap.to(slide.querySelector(".slide-img"), {
//             rotation: -props.rotation,
//             duration: 2,
//             ease: "hop",
//         });
//     };

//     const transitionSlides = (direction) => {
//         if (isAnimating) return;

//         setIsAnimating(true);

//         const outgoingIndex = activeSlideIndex;
//         const nextActiveIndex =
//             (activeSlideIndex + (direction === "next" ? 1 : -1) + totalSlides) % totalSlides;

//         setActiveSlideIndex(nextActiveIndex);

//         const outgoingSlide = sliderRef.current.querySelector(`.slide-container:nth-child(${outgoingIndex + 1})`);
//         const incomingSlide = sliderRef.current.querySelector(`.slide-container:nth-child(${nextActiveIndex + 1})`);

//         animateSlide(outgoingSlide, { clipPath: clipPath.closed });
//         animateSlide(incomingSlide, { clipPath: clipPath.open });

//         gsap.timeline({
//             onComplete: () => setIsAnimating(false),
//         });
//     };

//     return (
//         <div className="slider" ref={sliderRef}>
//             {sliderContent.map((slide, index) => {
//                 const slideClassAndStyle = getSlideClassAndStyle(index);
//                 if (!slideClassAndStyle) return null;
//                 return (
//                     <div
//                         key={index}
//                         className={slideClassAndStyle.className}
//                         style={slideClassAndStyle.style}
//                     >
//                         <div className="slide-img">
//                             <img src={slide.img} alt={slide.name} />
//                         </div>
//                     </div>
//                 );
//             })}

//             <div className="slider-title" ref={sliderTitleRef}>
//                 <h1>{sliderContent[activeSlideIndex].name}</h1>
//             </div>

//             <div className="slider-counter" ref={sliderCounterRef}>
//                 <p>
//                     <span>{activeSlideIndex + 1}</span> / {totalSlides}
//                 </p>
//             </div>

//             <div className="slider-items" ref={sliderItemsRef}>
//                 {sliderContent.map((slide, index) => (
//                     <p
//                         key={index}
//                         className={index === activeSlideIndex ? "activeItem" : ""}
//                         onClick={() => !isAnimating && setActiveSlideIndex(index)}
//                     >
//                         {slide.name}
//                     </p>
//                 ))}
//             </div>

//             <div className="slider-controls">
//                 <button onClick={() => transitionSlides("prev")} disabled={isAnimating}>
//                     Prev
//                 </button>
//                 <button onClick={() => transitionSlides("next")} disabled={isAnimating}>
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default SwiperEditorialDetail;


