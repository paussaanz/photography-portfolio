import { useRef } from 'react';
import HeroPortfolio from '../components/PortfolioPage/HeroPortfolio';
import TextAnimation from '../components/General/TextAnimation';
import ProjectCardAnimationGSAP from '../components/PortfolioPage/ProjectCardAnimationGSAP';
import { portfolioCardAnimation, portfolioParallaxHero } from './../assets/js/images';
import PortfolioPageSeo from './SEO/PortfolioPageSeo';
import LoaderPortfolio from '../components/Loaders/LoaderPortfolio';
import ProjectCardMobile from '../components/PortfolioPage/ProjectCardMobile';

const PortfolioPage = ({ isVisited, isMobile }) => {
    const sectionRef = useRef(null);

    const cardsData = [
        { image: "/images/mid/lifestyle-18.webp", title: "LIFESTYLE", subtitle: "2020" },
        { image: "/images/mid/sports-4.webp", title: "SPORTS", subtitle: "2022" },
        { image: "/images/mid/nature-15.webp", title: "NATURE", subtitle: "2024" },
      ];

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
                    {isMobile ? 
                    <ProjectCardMobile cards={cardsData}/>
                    :
                    <ProjectCardAnimationGSAP portfolioCardAnimation={portfolioCardAnimation} parentRef={sectionRef}/>}
                </div>
            </section>
        </div>
    );
};

export default PortfolioPage;
