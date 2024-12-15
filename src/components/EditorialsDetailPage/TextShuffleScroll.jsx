// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const TextShuffleScroll = ({ text }) => {
//     const textRef = useRef(null);

//     useEffect(() => {
//         const textElement = textRef.current;

//         // Split the text into words
//         const words = text.split(" ");

//         function shuffleWord(word) {
//             const letters = word.split("");
//             for (let i = letters.length - 1; i > 0; i--) {
//                 const j = Math.floor(Math.random() * (i + 1));
//                 [letters[i], letters[j]] = [letters[j], letters[i]];
//             }
//             return letters.join("");
//         }

//         // Create a shuffled version of each word
//         const shuffledWords = words.map((word) => shuffleWord(word));

//         // Set the initial shuffled text
//         textElement.innerHTML = shuffledWords.join(" ");

//         // Create a GSAP timeline
//         const tl = gsap.timeline({
//             scrollTrigger: {
//                 trigger: textElement,
//                 start: "top center",
//                 end: "bottom center",
//                 scrub: true,
//                 markers: true, // Debugging markers
//             },
//         });

//         // Animate each word to untangle
//         words.forEach((word, wordIndex) => {
//             const shuffledWord = shuffledWords[wordIndex].split("");

//             shuffledWord.forEach((_, charIndex) => {
//                 tl.to(
//                     {},
//                     {
//                         onUpdate: () => {
//                             const updatedWords = shuffledWords.map((shuffled, i) => {
//                                 if (i < wordIndex) return words[i]; // Previous words are fully untangled
//                                 if (i > wordIndex) return shuffled; // Next words remain shuffled

//                                 // Untangle the current word progressively
//                                 const currentWord = shuffledWord.map((char, j) => {
//                                     return j <= charIndex ? word[j] : shuffled[j];
//                                 });

//                                 return currentWord.join("");
//                             });

//                             textElement.innerHTML = updatedWords.join(" ");
//                         },
//                         duration: 0.1,
//                     },
//                     (wordIndex * 0.5) + (charIndex * 0.1) // Stagger word and character animations
//                 );
//             });
//         });

//         return () => {
//             // Clean up ScrollTrigger
//             ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//         };
//     }, [text]);

//     return (
//         <div style={{ width: "100%", textAlign: "center" }}>
//             <p
//                 ref={textRef}
//                 className="tag-2 tag-2-mbl"
//                 style={{
//                     whiteSpace: "normal", // Allows wrapping
//                     wordWrap: "break-word", // Break long words if needed
//                     lineHeight: "1.5", // Adjust line height for better readability
//                     textAlign: "left", // Align text to the left for natural wrapping
//                 }}
//             >
//                 {text}
//             </p>
//         </div>
//     );
// };

// export default TextShuffleScroll;
