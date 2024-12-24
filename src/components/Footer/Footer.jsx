// import React, { useState } from "react";
// import InfiniteCarrusel from "./InfiniteCarrusel";
// import { useLocation } from "react-router-dom";
// import { useMediaQuery } from "../../contexts/MediaQueryContext";
// import { motion } from "framer-motion";
// import { useTransition } from "../../contexts/transitionContext";
// import { contactLinks } from "../../assets/js/images";

// const Footer = () => {
//     const HIDDEN_ROUTES = ["/contact", "/contact/form"];
//     const { pathname } = useLocation();
//     const { isMobile } = useMediaQuery();
//     const { handleLinkClick } = useTransition();

//     const isHidden = HIDDEN_ROUTES.includes(pathname);
//     if (isHidden) {
//         return null;
//     }

//     const initialImages = [
//         { url: "/images/stickers/connect-sticker.svg", rotation: "20deg", top: '250px', left: '0px', scale:  0.8, zIndex: 1 },
//         { url: "/images/stickers/syp-sticker.svg", rotation: "-30deg", top: '400px', left: '0px', scale:  0.8,  zIndex: 2 },
//         { url: "/images/stickers/tortoise-sticker.svg", rotation: "10deg", top: '300px', left: '100px', scale:  0.8, zIndex: 3 },
//         { url: "/images/stickers/face-sticker.svg", rotation: "-50deg", top: '400px', left: '0px', scale: 0.6, zIndex: 4 },
//         { url: "/images/stickers/syp-sticker-2.svg", rotation: "0deg", top: '350px', left: '100px', scale:  0.9, zIndex: 5 },
//     ];

//     const [images, setImages] = useState(initialImages);

//     const bringToFront = (index) => {
//         const maxZIndex = Math.max(...images.map((img) => img.zIndex));
//         const updatedImages = images.map((img, i) => ({
//             ...img,
//             zIndex: i === index ? maxZIndex + 1 : img.zIndex,
//         }));
//         setImages(updatedImages);
//     };

//     return (
//         <div data-hover="a" className="footer__section">
//             <section className="footer__section-carrusel">
//                 {isMobile ? (
//                     <h1
//                         onClick={() => handleLinkClick('/contact')}
//                         className="text-color--secondary"
//                         style={{
//                             marginTop: "30px",
//                             fontWeight: 400,
//                             fontSize: '50px',
//                             lineHeight: '70px',
//                         }}
//                     >
//                         LET’s HAVE A CHAT
//                         <span data-hover="a" className="contact__logo-circle icon-arrow b6 text-color--secondary" />
//                     </h1>
//                 ) : (
//                     <InfiniteCarrusel />
//                 )}
//             </section>
//             <section className="footer__section-draggable-logo">
//                 <div className="flex flex--j-center flex--a-center flex--nowrap d--h-100">
//                     {!isMobile && <h1 className="text-align--center text-color--secondary footer__section-draggable-title">LIFE IS TOO SHORT FOR BORING WEBSITES</h1>}
//                     {images.map((image, index) => (
//                         <motion.div
//                             key={index}
//                             drag
//                             dragMomentum={false} // Prevents inertia after drag
//                             whileDrag={isMobile ? { scale: image.scale + 0.1 } : { scale: image.scale + 0.1 }}
//                             onDragStart={() => bringToFront(index)} // Update zIndex on drag
//                             style={{
//                                 rotate: image.rotation,
//                                 position: "absolute",
//                                 width: isMobile ? 200 : 250,
//                                 height: isMobile ? 200 : 250,
//                                 top: image.top,
//                                 left: image.left,
//                                 cursor: "grab",
//                                 zIndex: image.zIndex,
//                                 transformOrigin: "center center",
//                             }}
//                         >
//                             <img
//                                 src={image.url}
//                                 alt={`drag-img-${index}`}
//                                 style={{
//                                     width: "100%",
//                                     height: "100%",
//                                     borderRadius: "8px",
//                                     pointerEvents: "none", // Ensures dragging isn't affected by img content
//                                 }}
//                             />
//                         </motion.div>
//                     ))}
//                 </div>
//             </section>
//             <section className="footer__section-links">
//                 <div className="flex flex--j-between flex--a-baseline p--4 text-color--secondary text-transform--uppercase">
//                     <p></p>
//                     <div className="flex">
//                         {contactLinks.map((contact) => (
//                             <a
//                                 className="text-decoration--none"
//                                 key={contact.href}
//                                 href={contact.href}
//                                 target="_blank"
//                                 rel="noreferrer"
//                             >
//                                 <span
//                                     data-hover="a"
//                                     className={`contact__logo-circle ${contact.logoClass} h5`}
//                                 ></span>
//                             </a>
//                         ))}
//                     </div>
//                     <p>Site by .SYP!</p>
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default Footer;


import React, { useState } from "react";
import InfiniteCarrusel from "./InfiniteCarrusel";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "../../contexts/MediaQueryContext";
import { motion } from "framer-motion";
import { useTransition } from "../../contexts/transitionContext";
import { contactLinks } from "../../assets/js/images";

const Footer = () => {
    const HIDDEN_ROUTES = ["/contact", "/contact/form"];
    const { pathname } = useLocation();
    const { isMobile } = useMediaQuery();
    const { handleLinkClick } = useTransition();

    const isHidden = HIDDEN_ROUTES.includes(pathname);
    if (isHidden) {
        return null;
    }

    const initialImages = [ 
        { url: "/images/stickers/connect-sticker.svg", rotation: "20deg", top: '250px', left: isMobile ? '50px' : '120px', scale: 0.8, zIndex: 1 },
        { url: "/images/stickers/syp-sticker.svg", rotation: "-30deg", top: isMobile ? '530px' : '450px', left: isMobile ? '80px' : '440px', scale: 0.8, zIndex: 2 },
        { url: "/images/stickers/tortoise-sticker.svg", rotation: "10deg", top: isMobile ? '240px' : '230px', left: isMobile ? '200px' : '400px', scale: 0.8, zIndex: 3 },
        { url: "/images/stickers/face-sticker.svg", rotation: "-50deg", top: isMobile ? '400px' : '500px', left: isMobile ? '0px' : '150px', scale: 0.6, zIndex: 4 },
        { url: "/images/stickers/syp-sticker-2.svg", rotation: "0deg", top: isMobile ? '380px' : '350px', left: isMobile ? '200px' : undefined, right: isMobile ? '0px' : '100px', scale: 0.9, zIndex: 5 },
    ];

    const [images, setImages] = useState(initialImages);

    const bringToFront = (index) => {
        const maxZIndex = Math.max(...images.map((img) => img.zIndex));
        const updatedImages = images.map((img, i) => ({
            ...img,
            zIndex: i === index ? maxZIndex + 1 : img.zIndex,
        }));
        setImages(updatedImages);
    };

    return (
        <div data-hover="a" className="footer__section">
            <section className="footer__section-carrusel">
                {isMobile ? (
                   <div className="footer__section-mobile position--relative container-bem-mbl">
                   <h1
                       onClick={() => handleLinkClick('/contact')}
                       className="text-color--secondary"
                       style={{
                           marginTop: "100px",
                           fontWeight: 400,
                           fontSize: '50px',
                           lineHeight: '70px',
                           display: "inline-block",
                       }}
                   >
                           LET’s HAVE A CHAT
                       <span
                           data-hover="a"
                           className="contact__logo-circle icon-arrow b6 text-color--secondary"
                           style={{
                               display: "inline-block",
                               verticalAlign: "bottom", // Aligns span to the text line
                               marginLeft: "15px",     // Adjust spacing from text
                               lineHeight: "inherit"
                           }}
                       />
                   </h1>
               </div>
               
                ) : (
                    <InfiniteCarrusel />
                )}
            </section>
            <section className="footer__section-draggable-logo">
                <div className="flex flex--j-center flex--a-center flex--nowrap d--h-100">
                    {!isMobile && <h1 className="text-align--center text-color--secondary footer__section-draggable-title">LIFE IS TOO SHORT FOR BORING WEBSITES</h1>}
                    {images.map((image, index) => (
                        <motion.div
                            key={index}
                            drag
                            dragMomentum={false} // Prevents inertia after drag
                            whileDrag={isMobile ? { scale: image.scale + 0.1 } : { scale: image.scale + 0.1 }}
                            onDragStart={() => bringToFront(index)} // Update zIndex on drag
                            style={{
                                rotate: image.rotation,
                                position: "absolute",
                                width: isMobile ? 200 : 250,
                                height: isMobile ? 200 : 250,
                                top: image.top,
                                left: image.left,
                                right: image.right,
                                cursor: "grab",
                                zIndex: image.zIndex,
                                transformOrigin: "center center",
                            }}
                        >
                            <img
                                src={image.url}
                                alt={`drag-img-${index}`}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "8px",
                                    pointerEvents: "none", // Ensures dragging isn't affected by img content
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            </section>
            <section className="footer__section-links">
                <div className="flex flex--j-between flex--a-baseline p--4 text-color--secondary text-transform--uppercase">
                    <p></p>
                    <div className="flex">
                        {contactLinks.map((contact) => (
                            <a
                                className="text-decoration--none"
                                key={contact.href}
                                href={contact.href}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span
                                    data-hover="a"
                                    className={`contact__logo-circle ${contact.logoClass} h5`}
                                ></span>
                            </a>
                        ))}
                    </div>
                    <p>Site by .SYP!</p>
                </div>
            </section>
        </div>
    );
};

export default Footer;
