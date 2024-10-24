import React, { useEffect, useRef } from 'react';
import HeroPortfolio from '../components/PortfolioPage/HeroPortfolio';
import TextAnimationContainer from '../components/General/TextAnimationContainer';
import ProjectCardAnimationGSAP from '../components/PortfolioPage/ProjectCardAnimationGSAP';
import { portfolioCardAnimation, portfolioParallaxHero } from './../assets/js/images';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

const PortfolioPage = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Inicializa el ScrollTrigger
        const scrollTriggerInstance = ScrollTrigger.create({
            trigger: sectionRef.current, // Contenedor donde quieres aplicar el ScrollTrigger
            start: "top top", // Inicia en la parte superior
            end: "bottom bottom", // Termina en la parte inferior
            scrub: 15, // Suaviza el efecto
            onUpdate: (self) => {
                const progress = self.progress;

                const newColor = `rgba(0, 0, 0, ${progress})`;
                gsap.to(sectionRef.current, {
                    backgroundColor: newColor,
                    duration: 0.5,
                    ease: "power3.out"
                });

              
            }
        });

        return () => {
            scrollTriggerInstance.kill();
        };
    }, []);


    return (
        <div data-barba="container" className='barba-container portfolio-page' >
            <section className="hero-portfolio dimension--vh-175 overflow--x-clip">
                <div className="dimension--vh-175 flex--display">
                    <HeroPortfolio images={portfolioParallaxHero} word="PORTFOLIO" />
                </div>
            </section>

            <section className="text-animation" ref={sectionRef}>
                <div className="padding--y-5 dimension--vh-100 align-content--center">
                    <TextAnimationContainer
                        text="Photography transforms ordinary moments into lasting memories, capturing the beauty and uniqueness of every scene. My portfolio is a journey through the lens, showcasing diverse perspectives and intimate glimpses of life. Each image is a story, a testament to the power of visual storytelling. This collection celebrates the art of seeing, from serene landscapes to vibrant street scenes."
                        textColor='text-color--primary'
                        maskColor="background--light"
                    />
                </div>

                <div className="projects-animation">
                    <div className="container-card-animation-wrapper">
                        <ProjectCardAnimationGSAP portfolioCardAnimation={portfolioCardAnimation} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PortfolioPage;
