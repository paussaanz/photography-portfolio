import { useState } from "react";
import { editorialsCovers, editorialsParallaxHero } from "../assets/js/images";
import HeroEditorials from "../components/EditorialsPage/HeroEditorials";
import SwiperEditorialCard from "../components/EditorialsPage/SwiperEditorialCard";
import EditorialsDetailPageSeo from "./SEO/EditorialsDetailPageSeo";

const EditorialsPage = () => {
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
            <EditorialsDetailPageSeo />

            <section className="edetail__section-hero d--vh-100 overflow--x-clip">
                <div className="d--vh-100 flex">
                    <HeroEditorials images={editorialsParallaxHero} />
                </div>
            </section>
            <section className="editorial-cards">
                <div className="p--y-5">
                    <SwiperEditorialCard images={editorialsCovers} />
                </div>
            </section>
        </div>
    );
};

export default EditorialsPage;
