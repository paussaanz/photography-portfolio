import { editorialsParallaxHero } from "../assets/js/images";
import HeroDetails from "../components/EditorialsDetailsPage/HeroDetails";
import TextAnimationContainer from "../components/General/TextAnimationContainer";

const PortfolioDetailPage = () => {
    return (
        <>
            <section className="hero-details position-relative">
                <HeroDetails src="/images/photoshoots-4.jpg" />
            </section>
            <section className="text-animation">
                <div className="py-5 vh-100 align-content-center">
                    <TextAnimationContainer
                        text="Photography transforms ordinary moments into lasting memories, capturing the beauty and uniqueness of every scene. My portfolio is a journey through the lens, showcasing diverse perspectives and intimate glimpses of life. Each image is a story, a testament to the power of visual storytelling. This collection celebrates the art of seeing, from serene landscapes to vibrant street scenes."
                        textColor='text-light'
                        maskColor="bg-primary"
                    />
                </div>
            </section>
        </>
    );
};

export default PortfolioDetailPage;