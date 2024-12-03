import { editorialsCovers, editorialsParallaxHero } from "../assets/js/images";
import HeroEditorials from "../components/EditorialsPage/HeroEditorials";
import SwiperEditorialCard from "../components/EditorialsPage/SwiperEditorialCard";
import EditorialsPageSeo from "./SEO/EditorialsPageSeo";
import LoaderEditorials from "../components/Loaders/LoaderEditorials";
import ProjectCardMobile from "../components/PortfolioPage/ProjectCardMobile";
import { useMediaQuery } from "../contexts/MediaQueryContext";
import TextAnimation from "../components/General/TextAnimation";


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
            <section className="editorials__section-text-animation">
                <div className={`${isMobile ? 'd--h-100' : ' d--vh-100 '} p--y-5 align-content--center position--relative z-index--5`}>
                    <TextAnimation text="Step into a world of stories through SYP! editorials, where each journey comes to life through words and imagery. From vibrant streets to serene landscapes, these curated narratives blend captivating photography with intriguing insights about the places I've explored. It’s more than just travel—it's a lens into culture, emotion, and the untold details that make each destination unforgettable." />
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
