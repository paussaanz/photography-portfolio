import { useEffect, useRef } from 'react';
import HeroPortfolio from '../components/PortfolioPage/HeroPortfolio';
import TextAnimation from '../components/General/TextAnimation';
import ProjectCardAnimationGSAP from '../components/PortfolioPage/ProjectCardAnimationGSAP';
import { portfolioCardAnimation, portfolioParallaxHero } from './../assets/js/images';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import PortfolioPageSeo from './SEO/PortfolioPageSeo';
import LoaderPortfolio from '../components/Loaders/LoaderPortfolio';

const PortfolioPage = ({ isVisited }) => {
    const sectionRef = useRef(null);

    console.log(isVisited)
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

        <div data-barba="container">
            <PortfolioPageSeo portfolioParallaxHero={portfolioParallaxHero} />

            <section className="portfolio__hero-section">
                <div className="d--vh-175 flex">
                    {isVisited ?
                        <HeroPortfolio images={portfolioParallaxHero} word="PORTFOLIO" />
                        :
                        <LoaderPortfolio images={portfolioParallaxHero} />
                    }

                </div>
            </section>

            <section className="portfolio__text-animation-section" ref={sectionRef}>
                <div className="p--y-5 d--vh-100 align-content--center">
                    <TextAnimation
                        text="Photography transforms ordinary moments into lasting memories, capturing the beauty and uniqueness of every scene. My portfolio is a journey through the lens, showcasing diverse perspectives and intimate glimpses of life. Each image is a story, a testament to the power of visual storytelling. This collection celebrates the art of seeing, from serene landscapes to vibrant street scenes."
                        textColor='text-color--primary'
                        maskColor="background--light"
                    />
                </div>

                <div className="portfolio__projects-animation-section">
                    <ProjectCardAnimationGSAP portfolioCardAnimation={portfolioCardAnimation} />
                </div>
            </section>
        </div>
    );
};

export default PortfolioPage;
