import { useRef, useMemo, useEffect } from 'react';
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

    const heroContent = useMemo(() => {
        if (isVisited) {
            return <HeroPortfolio images={portfolioParallaxHero} word="PORTFOLIO" />;
        }
        return <LoaderPortfolio images={portfolioParallaxHero} />;
    }, [isVisited]);

    const projectCardContent = useMemo(() => {
        if (isMobile) {
            return <ProjectCardMobile images={mobilePortfolioCard} />;
        }
        return <ProjectCardAnimationGSAP portfolioCardAnimation={portfolioCardAnimation} parentRef={sectionRef} />;
    }, [isMobile]);

    const sectionClass = useMemo(() => `${isMobile ? 'd--vh-100' : 'd--vh-175'} flex`, [isMobile]);
    const textAnimationClass = useMemo(() => `${isMobile ? 'd--h-100' : ' d--vh-100 '} p--y-5 align-content--center position--relative z-index--5`, [isMobile]);
 
    useEffect(() => {
        return () => {
            portfolioCardAnimation.forEach((image) => URL.revokeObjectURL(image.src));
            portfolioParallaxHero.forEach((image) => URL.revokeObjectURL(image.src));
            mobilePortfolioCard.forEach((image) => URL.revokeObjectURL(image.src));
        };
    }, []);

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
                        text="Photography transforms moments into lasting memories, showcasing beauty and uniqueness. My portfolio shares diverse perspectives and stories, from serene landscapes to vibrant street scenes."
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
