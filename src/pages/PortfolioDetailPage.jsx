import React from "react";
import AnimatedImage from "../components/PortfolioDetailsPage/AnimatedImage";
import HeroDetails from "../components/PortfolioDetailsPage/HeroDetails";
import TextAnimationContainer from "../components/General/TextAnimationContainer";


const PortfolioDetailPage = ({ images, title, textAnimation }) => {
    const { heroImage, projectImages } = images

    return (
        <div data-barba="container" className="barba-container">
            <section className="hero-details position-relative">
                <HeroDetails slug={title} src={heroImage.src} />
            </section>
            <section className="text-animation">
                <div className="py-5 vh-100 align-content-center">
                    <TextAnimationContainer
                        text={textAnimation}
                        textColor="text-primary"
                        maskColor="bg-light"
                    />
                </div>
            </section>
            <section className="position-relative">
                <div className="project-details d-grid justify-content-center align-items-center">
                    {images && projectImages.map((img, index) => (
                        <AnimatedImage
                            key={index}
                            src={img.src}
                            colStart={img.colStart}  
                            colSpan={img.colSpan}      
                            rowStart={img.rowStart} 
                            rowSpan={img.rowSpan}
                            width={img.width}
                            height={img.height}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default PortfolioDetailPage;
