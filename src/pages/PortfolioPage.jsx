import React, { useRef } from 'react';
import HeroPortfolio from '../components/PortfolioPage/HeroPortfolio';
import TextAnimationContainer from '../components/General/TextAnimationContainer';
import { useScroll } from 'framer-motion';
import ProjectCardAnimationGSAP from '../components/PortfolioPage/ProjectCardAnimationGSAP';
import { portfolioCardAnimation, portfolioParallaxHero } from './../assets/js/images';

const PortfolioPage = () => {
    const portfolioPage = useRef();  // Referencia de la página principal
    const projectsRef = useRef();    // Referencia de la sección "projects-animation"

    // Scroll de la página completa (puede ser utilizado si tienes otras animaciones en el futuro)
    const { scrollYProgress } = useScroll({
        target: portfolioPage,
        offset: ["start start", "end end"]
    });

    // Scroll de la sección de proyectos específica
    const { scrollYProgress: scrollYProgressProjects } = useScroll({
        target: projectsRef,
        offset: ["start start", "end end"]  // Ajusta el rango según cómo quieres controlar el scroll en la sección de proyectos
    });


    return (
        <div data-barba="container" className='barba-container portfolio-page' ref={portfolioPage}>
            <section className="hero-portfolio vh-175 overflow-x-clip">
                <div className="vh-175 d-flex">
                    <HeroPortfolio images={portfolioParallaxHero} word="PORTFOLIO" />
                </div>
            </section>

            <section className="text-animation">
                <div className="py-5 vh-100 align-content-center">
                    <TextAnimationContainer
                        text="Photography transforms ordinary moments into lasting memories, capturing the beauty and uniqueness of every scene. My portfolio is a journey through the lens, showcasing diverse perspectives and intimate glimpses of life. Each image is a story, a testament to the power of visual storytelling. This collection celebrates the art of seeing, from serene landscapes to vibrant street scenes."
                        textColor='text-primary'
                        maskColor="bg-light"
                    />
                </div>
            </section>

            <section>
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
