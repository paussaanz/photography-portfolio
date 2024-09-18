import { useState } from "react";
import { editorialsCovers, editorialsParallaxHero } from "../assets/js/images";
import EditorialCard from "../components/EditorialsPage/EditorialCard";
import HeroEditorials from "../components/EditorialsPage/HeroEditorials";


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
        <div data-barba="container" className="editorials-page">
            <section className="editorials-hero bg-light vh-100">
                <div className="vh-100 d-flex">
                    <HeroEditorials images={editorialsParallaxHero} />
                </div>
            </section>
            <section className="editorial-cards bg-light vh-100">
                <div className="py-5 vh-100 align-content-center">
                    <EditorialCard
                        images={editorialsCovers}
                        currentIndex={currentIndex}
                        onNext={nextImage}
                        onPrev={prevImage}
                    />
                </div>
            </section>
        </div>
    );
};

export default EditorialsPage;
