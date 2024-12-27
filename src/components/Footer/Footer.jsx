import { useEffect, useState } from "react";
import InfiniteCarrusel from "./InfiniteCarrusel";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "../../contexts/MediaQueryContext";
import { motion } from "framer-motion";
import { useTransition } from "../../contexts/transitionContext";
import { contactLinks } from "../../assets/js/images";
import { useTheme } from "../../contexts/ThemeContext";

const Footer = () => {
    const HIDDEN_ROUTES = ["/contact", "/contact/form"];
    const { pathname } = useLocation();
    const { isMobile } = useMediaQuery();
    const { handleLinkClick } = useTransition();
    const { theme } = useTheme();

    const isHidden = HIDDEN_ROUTES.includes(pathname);
    if (isHidden) {
        return null;
    }


    const useImagesForTheme = (isMobile) => {

        const themeSuffixMap = {
            'light-theme': '',
            'dark-theme': '-d',
            'green-theme': '-g',
            'purple-theme': '-p', // Example suffix for purple theme
        };

        const themeSuffix = themeSuffixMap[theme] || ''; // Default to light-theme suffix if theme is not found

        const initialImages = [
            { url: `/images/stickers/connect-sticker${themeSuffix}.svg`, rotation: "20deg", top: "20%", left: isMobile ? "60px" : "12%", scale: 0.8, zIndex: 1 },
            { url: `/images/stickers/syp-sticker${themeSuffix}.svg`, rotation: "-30deg", top: isMobile ? "480px" : "52%", left: isMobile ? "90px" : "40%", scale: 0.8, zIndex: 2 },
            { url: `/images/stickers/tortoise-sticker${themeSuffix}.svg`, rotation: "10deg", top: isMobile ? "220px" : "34%", left: isMobile ? "180px" : "32%", scale: 0.8, zIndex: 3 },
            { url: `/images/stickers/face-sticker${themeSuffix}.svg`, rotation: "-50deg", top: isMobile ? "360px" : "62%", left: isMobile ? "20px" : "16%", scale: 0.6, zIndex: 4 },
            { url: `/images/stickers/syp-sticker-2${themeSuffix}.svg`, rotation: "0deg", top: isMobile ? "420px" : "45%", left: isMobile ? "95%" : "76%", scale: 1.2, zIndex: 5 },
            { url: `/images/stickers/click-sticker${themeSuffix}.svg`, rotation: "-10deg", top: isMobile ? "340px" : "63%", left: isMobile ? "210px" : "60%", scale: 0.7, zIndex: 6 },
            { url: `/images/stickers/sypppp-sticker${themeSuffix}.svg`, rotation: "30deg", top: isMobile ? "400px" : "74%", left: isMobile ? "250px" : "37%", scale: 0.7, zIndex: 7 },
            { url: `/images/stickers/programmed-sticker${themeSuffix}.svg`, rotation: "-5deg", top: isMobile ? "460px" : "210px", left: isMobile ? "270px" : "59%", scale: 0.7, zIndex: 8 },
        ];

        return initialImages;
    };

    const [images, setImages] = useState(() => useImagesForTheme(isMobile));

    // Update images when the theme or isMobile changes
    useEffect(() => {
        setImages(useImagesForTheme(isMobile));
    }, [theme, isMobile]);

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
                                height: 'auto',
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
