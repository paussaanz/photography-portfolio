import React, { useRef } from 'react';
import HeroPortfolio from '../components/PortfolioPage/HeroPortfolio';
import TextAnimationContainer from '../components/General/TextAnimationContainer';
import { useScroll, motion } from 'framer-motion';

const PortfolioPage = () => {
    const portfolioPage = useRef();
    const { scrollYProgress } = useScroll({
        target: portfolioPage,
        offset: ["start start", "center center"]
    });

    return (
        <div >
            <section className="hero-portfolio vh-100 overflow-hidden">
            <div className="bg-light vh-100 d-flex">

                    <HeroPortfolio />
                </div>
            </section>

            <section className="text-animation">
                <div className="bg-light py-5 vh-100 align-content-center" scrollyprogress={scrollYProgress}>
                    <TextAnimationContainer text="Photography transforms ordinary moments into lasting memories, capturing the beauty and uniqueness of every scene. My portfolio is a journey through the lens, showcasing diverse perspectives and intimate glimpses of life. Each image is a story, a testament to the power of visual storytelling. This collection celebrates the art of seeing, from serene landscapes to vibrant street scenes." />
                </div>

            </section>
        </div>
    );
};

export default PortfolioPage;