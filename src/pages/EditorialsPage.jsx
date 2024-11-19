import { useState } from "react";
import { editorialsCovers, editorialsParallaxHero } from "../assets/js/images";
import HeroEditorials from "../components/EditorialsPage/HeroEditorials";
import SwiperEditorialCard from "../components/EditorialsPage/SwiperEditorialCard";
import EditorialsPageSeo from "./SEO/EditorialsPageSeo";
import LoaderEditorials from "../components/Loaders/LoaderEditorials";


const EditorialsPage = ({ isVisited }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % editorialsCovers.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? editorialsCovers.length - 1 : prevIndex - 1
        );
    };

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
                    <SwiperEditorialCard images={editorialsCovers} />
                </div>
            </section>
        </div>
    );
};

export default EditorialsPage;
