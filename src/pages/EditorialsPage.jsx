import { editorialsCovers, editorialsParallaxHero } from "../assets/js/images";
import HeroEditorials from "../components/EditorialsPage/HeroEditorials";
import SwiperEditorialCard from "../components/EditorialsPage/SwiperEditorialCard";
import EditorialsPageSeo from "./SEO/EditorialsPageSeo";
import LoaderEditorials from "../components/Loaders/LoaderEditorials";
import ProjectCardMobile from "../components/PortfolioPage/ProjectCardMobile";
import { useMediaQuery } from "../contexts/MediaQueryContext";


const EditorialsPage = ({ isVisited }) => {

    const { isMobile } = useMediaQuery();

    return (
        <div data-barba="container">

            <EditorialsPageSeo editorialsParallaxHero={editorialsParallaxHero} />

            <section className="editorials__section-hero">
                <div className="d--vh-100 flex overflow--x-clip">
                    {isVisited ?
                        <HeroEditorials images={editorialsParallaxHero} />
                        :
                        <LoaderEditorials images={editorialsParallaxHero} />
                    }
                </div>
            </section>
            <section className="editorials__section-cards">
                <div className="p--y-5 overflow--clip">
                {isMobile ? 
                    // <ProjectCardMobile images={editorialsCovers}/>
                    <SwiperEditorialCard images={editorialsCovers} />

                    :
                    <SwiperEditorialCard images={editorialsCovers} />}
                
                    
                </div>
            </section>
        </div>
    );
};

export default EditorialsPage;
