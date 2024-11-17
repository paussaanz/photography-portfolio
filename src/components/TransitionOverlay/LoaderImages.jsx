import gsap from "gsap";
import { useContext, useEffect } from "react";
import TextOverlay from '../General/TextOverlay.jsx';
import Button from "../General/Buttons/Button.jsx";
import LenisContext from "../../contexts/LenisContext.jsx";
import { useTransition } from "../../contexts/transitionContext";


const LoaderImages = () => {
    
    const { handleLinkClick } = useTransition();
    const { stop, start } = useContext(LenisContext);

    useEffect(() => {

        stop();

        const tl = gsap.timeline({
            delay: 0
        });

        tl.to(".loader__images-col", {
            top: 0,
            duration: 2,
            ease: "power4.inOut"
        });

        tl.to(".loader__images-col-1 .loader__images-image", {
            top: 0,
            stagger: 0.25,
            duration: 2,
            ease: "power4.inOut"
        }, "-=2")

        tl.to(".loader__images-col-2 .loader__images-image", {
            top: 0,
            stagger: -0.25,
            duration: 2,
            ease: "power4.inOut"
        }, "-=4")

        tl.to(".loader__images-col-3 .loader__images-image", {
            top: 0,
            stagger: 0.25,
            duration: 2,
            ease: "power4.inOut"
        }, "-=4")

        tl.to(".loader__images-col-4 .loader__images-image", {
            top: 0,
            stagger: -0.25,
            duration: 2,
            ease: "power4.inOut"
        }, "-=4")

        tl.to(".loader__images-col-5 .loader__images-image", {
            top: 0,
            stagger: 0.25,
            duration: 2,
            ease: "power4.inOut"
        }, "-=4")

        tl.to(".loader__images-section", {
            scale: 6,
            duration: 3,
            ease: "power4.inOut"
        }, "-=2")


        tl.to(".loader__text", {
            opacity: 1,
            stagger: 0.095,
            duration: 1.5,
            ease: "power3.out"
        }, "-=1")

        const timer = setTimeout(() => start(), 3000)
        return(() => clearTimeout(timer))
    }, []);
    return (
        <>
            <div className="loader__images-section d--vh-100">
                <div className="loader__images-col loader__images-col-1">
                    <div className="loader__images-image">
                        <img className="loader__image" src="/images/nature-1.webp" />
                    </div>
                    <div className="loader__images-image">
                        <img className="loader__image" src="/images/nature-2.webp" />
                    </div>
                    <div className="loader__images-image">
                        <img className="loader__image" src="/images/nature-3.webp" />
                    </div>
                    <div className="loader__images-image">
                        <img className="loader__image" src="/images/nature-4.webp" />
                    </div>
                    <div className="loader__images-image">
                        <img className="loader__image" src="/images/nature-5.webp" />
                    </div>

                </div>
                <div className="loader__images-col loader__images-col-2">
                    <div className="loader__images-image">
                        <img className="loader__image" src="/images/nature-6.webp" />
                    </div>
                    <div className="loader__images-image">
                        <img className="loader__image" src="/images/nature-7.webp" />
                    </div>
                    <div className="loader__images-image">
                        <img className="loader__image" src="/images/nature-8.webp" />
                    </div>
                    <div className="loader__images-image">
                        <img className="loader__image" src="/images/nature-9.webp" />
                    </div>
                    <div className="loader__images-image">
                        <img className="loader__image" src="/images/nature-10.webp" />
                    </div>
                </div>
                <div className="loader__images-col loader__images-col-3">
                    <div className="loader__images-image">
                        <img className="loader__image" src="/images/nature-11.webp" />
                    </div>
                    <div className="loader__images-image">
                        <img className="loader__image" src="/images/nature-12.webp" />
                    </div>
                    <div className="loader__images-image">
                        <img className="loader__image" src="/images/nature-13.webp" />
                    </div>
                    <div className="loader__images-image">
                        <img className="loader__image" src="/images/nature-14.webp" />
                    </div>
                    <div className="loader__images-image">
                        <img className="loader__image" src="/images/nature-15.webp" />
                    </div>
                </div>
                <div className="loader__images-col loader__images-col-4">
                    <div className="loader__images-image">
                        <img className="loader__image" src="/images/nature-16.webp" />
                    </div>
                    <div className="loader__images-image">
                        <img className="loader__image" src="/images/nature-17.webp" />
                    </div>
                    <div className="loader__images-image">
                        <img className="loader__image" src="/images/nature-18.webp" />
                    </div>
                    <div className="loader__images-image">
                        <img className="loader__image" src="/images/nature-19.webp" />
                    </div>
                    <div className="loader__images-image">
                        <img className="loader__image" src="/images/nature-20.webp" />
                    </div>
                </div>
                <div className="loader__images-col loader__images-col-5">
                    <div className="loader__images-image">
                        <img className="loader__image" src="/images/nature-21.webp" />
                    </div>
                    <div className="loader__images-image">
                        <img className="loader__image" src="/images/nature-22.webp" />
                    </div>
                    <div className="loader__images-image">
                        <img className="loader__image" src="/images/nature-23.webp" />
                    </div>
                    <div className="loader__images-image">
                        <img className="loader__image" src="/images/nature-24.webp" />
                    </div>
                    <div className="loader__images-image">
                        <img className="loader__image" src="/images/nature-7.webp" />
                    </div>
                </div>
            </div>
            <TextOverlay textColor="text-color--light" textPosition="center" className="text-align--center">
                <h1>
                    <span className='block--display loader__text'>Capture</span>
                    <span className="h2 block--display loader__text">Brilliance</span>
                </h1>
                <Button onClick={() => handleLinkClick('/portfolio')} text="See my work" className="text-color--light loader__text" />
            </TextOverlay>
        </>
    );
};

export default LoaderImages;