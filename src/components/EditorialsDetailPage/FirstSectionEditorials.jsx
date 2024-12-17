import gsap from 'gsap';
import { Flip, ScrollTrigger } from 'gsap/all';
import { useEffect } from 'react';
import { useRef } from 'react';

const FirstSectionEditorials = ({ images }) => {
    const largeImageRef = useRef(null);
    const targetImageRef = useRef(null);
    const containerRef = useRef(null);
    const { firstSection, firstSectionTitle, firstSectionText, firstSectionText2 } = images; // Destructure properties from `images`

    //   useEffect(() => {
    //     gsap.registerPlugin(ScrollTrigger, Flip);

    //     // Set up the ScrollTrigger with Flip for scroll control
    //     ScrollTrigger.create({
    //       trigger: containerRef.current,
    //       start: "top center",
    //       end: "bottom center",
    //       scrub: true, // Ties animation progress to scroll progress
    //       onEnter: () => {
    //         const state = Flip.getState(largeImageRef.current);

    //         // Move LargeImage inside the TargetImage container
    //         targetImageRef.current.appendChild(largeImageRef.current);

    //         // Animate using Flip with scroll control
    //         Flip.from(state, {
    //           ease: "power1.inOut",
    //           scale: true,
    //           absolute: true, // Ensures positions are calculated in absolute space
    //           duration: 1, // Optional for smoothness if you need transition on scrub
    //         });
    //       },
    //     });

    //     return () => {
    //       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    //     };
    //   }, []);

    return (
        <>
            <div ref={containerRef} className=" flex flex--col-mbl d--w-100 d--vh-100 flex--a-center d--h-100-mbl">
                <div className="editorials-detail__first-section__container__text flex flex--1 d--w-max-50 d--w-max-100-mbl p--4 flex--j-center flex--a-center flex--col d--vh-80">
                    <h2 className="h4 text-align--right ">
                        {firstSectionTitle}
                    </h2>
                    {/* <TextShuffleScroll text={firstSectionText}/> */}
                    <p className="tag-2 tag-2-mbl">
                        {firstSectionText}
                    </p>
                </div>
                <div className="editorials-detail__first-section__container__img flex--1 d--w-max-50 d--w-max-100-mbl p--y-5 d--h-100 overflow--hidden p--0-mbl">
                    <img ref={largeImageRef} src={firstSection[0].src} alt="Slide 5" className="d--w-100 d--h-100 object-fit--cover"/>
                </div>
            </div>

            <div className="editorials-detail__first-section__thumbnails d--w-100 m--t-5 d--h-100-mbl flex flex--col-mbl">
                <div className="editorials-detail__first-section__thumbnails__text flex flex--j-end flex--j-start-mbl flex--1 d--w-max-50 d--w-max-100-mbl">
                    <p className="editorials-detail__first-section__thumbnails__text--content p--4 tag-2 tag-2-mbl flex--1 d--w-max-50 d--w-max-100-mbl text-align--right">
                        {firstSectionText2}
                    </p>
                </div>
                <div className="editorials-detail__first-section__thumbnails__images flex flex--1 d--w-max-50 d--w-max-100-mbl flex--j-between">
                    <img src={firstSection[1].src} alt="Slide 5" className="editorials-detail__first-section__thumbnails__image flex--1 object-fit--cover" />
                    <img src={firstSection[2].src} alt="Slide 5" className="editorials-detail__first-section__thumbnails__image flex--1 object-fit--cover" />
                    {/* <div
                        ref={targetImageRef}
                        className="editorials-detail__first-section__thumbnails__image"
                    /> */}
                </div>
            </div>
        </>
    );
};

export default FirstSectionEditorials;