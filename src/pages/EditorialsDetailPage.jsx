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
        <div data-barba="container" className="editorials-page bg-light">
            <EditorialsDetailPageSeo />

            <section className="editorials-hero vh-100 overflow-x-clip">
                <div className="vh-100 d-flex">
                    <HeroEditorials images={editorialsParallaxHero} />
                </div>
            </section>
            <section className="editorial-cards">
                <div className="py-5">
                    <SwiperEditorialCard images={editorialsCovers} />
                </div>
            </section>
        </div>
    );
};

export default EditorialsPage;
