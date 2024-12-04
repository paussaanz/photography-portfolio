import { useRef, useMemo } from 'react';
import HeroPortfolio from '../components/PortfolioPage/HeroPortfolio';
import TextAnimation from '../components/General/TextAnimation';
import ProjectCardAnimationGSAP from '../components/PortfolioPage/ProjectCardAnimationGSAP';
import ProjectCardMobile from '../components/PortfolioPage/ProjectCardMobile';
import PortfolioPageSeo from './SEO/PortfolioPageSeo';
import LoaderPortfolio from '../components/Loaders/LoaderPortfolio';
import { portfolioCardAnimation, portfolioParallaxHero, mobilePortfolioCard } from './../assets/js/images';
import { useMediaQuery } from '../contexts/MediaQueryContext';

const PortfolioPage = ({ isVisited }) => {
    const sectionRef = useRef(null);
    const { isMobile } = useMediaQuery();

    const heroContent = useMemo(() => isVisited 
        ? <HeroPortfolio images={portfolioParallaxHero} word="PORTFOLIO" />
        : <LoaderPortfolio images={portfolioParallaxHero} />, [isVisited]);

    const projectCardContent = useMemo(() => isMobile 
        ? <ProjectCardMobile images={mobilePortfolioCard} />
        : <ProjectCardAnimationGSAP portfolioCardAnimation={portfolioCardAnimation} parentRef={sectionRef} />, [isMobile]);

    const sectionClass = useMemo(() => `${isMobile ? 'd--vh-100' : 'd--vh-175'} flex`, [isMobile]);
    const textAnimationClass = useMemo(() => `${isMobile ? 'd--h-100' : ' d--vh-100 '} p--y-5 align-content--center position--relative z-index--5`, [isMobile]);

    return (
        <div data-barba="container">
            <PortfolioPageSeo portfolioParallaxHero={portfolioParallaxHero} />

            <section className="portfolio__hero-section">
                <div className={sectionClass}>
                    {heroContent}
                </div>
            </section>

            <section className="portfolio__text-animation-section" ref={sectionRef}>
                <div className={textAnimationClass}>
                    <TextAnimation
                        text="Photography transforms ordinary moments into lasting memories, capturing the beauty and uniqueness of every scene. My portfolio is a journey through the lens, showcasing diverse perspectives and intimate glimpses of life. Each image is a story, a testament to the power of visual storytelling. This collection celebrates the art of seeing, from serene landscapes to vibrant street scenes."
                        textColor='text-color--primary'
                        maskColor="background--light"
                    />
                </div>

                <div className="portfolio__projects-animation-section">
                    {projectCardContent}
                </div>
            </section>
        </div>
    );
};

export default PortfolioPage;
