import { useState } from "react";
import { editorialsCovers, editorialsParallaxHero } from "../assets/js/images";
import EditorialCard from "../components/EditorialsPage/EditorialCard";
import HeroEditorials from "../components/EditorialsPage/HeroEditorials";
import SwiperEditorialCard from "../components/EditorialsPage/SwiperEditorialCard";


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
        <div data-barba="container" className="editorials-page background--light">
            <section className="editorials-hero dimension--vh-100 overflow--x-clip">
                <div className="dimension--vh-100 flex--display">
                    <HeroEditorials images={editorialsParallaxHero} />
                </div>
            </section>
            <section className="editorial-cards">
                <div className="padding--y-5">
                    <SwiperEditorialCard images={editorialsCovers}/>
                </div>
            </section>
        </div>
    );
};

export default EditorialsPage;
