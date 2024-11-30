import { useState } from "react";
import EditorialsDetailPageSeo from "./SEO/EditorialsDetailPageSeo";
import BookPathAnimation from "../components/EditorialsDetailPage/BookPathAnimation";

const EditorialsPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        <div className="slide-image">
            <img src="/editorials/slide-1.webp" alt="Slide 1" />
        </div>,
        <div className="slide-text">
            <img src="/editorials/slide-2.webp" alt="Slide 1" />
        </div>,
        <div className="slide-custom">
            <img src="/editorials/slide-3.webp" alt="Slide 1" />
        </div>,
        <div className="slide-custom">
            <img src="/editorials/slide-4.webp" alt="Slide 1" />
        </div>,
    ];


    return (
        <div data-barba="container">
            <EditorialsDetailPageSeo />

            <>
                <BookPathAnimation
                />
            </>
        </div>
    );
};

export default EditorialsPage;
