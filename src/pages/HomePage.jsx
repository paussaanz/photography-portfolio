import React from 'react';
import VideoBackground from '../components/HomePage/VideoBackground';
import TextOverlay from '../components/General/TextOverlay';
import Button from '../components/General/Buttons/Button';
import SwiperPortfolio from '../components/HomePage/SwiperPortfolio';


const HomePage = () => {
    return (
        <div className="homepage">
            <section className="hero-homepage">
                <VideoBackground videoSrc="/DJI_0155.MP4" height="vh-100" />
                <TextOverlay textColor="text-light" textPosition="text-center">
                    <h1>
                        <span>Capture</span>
                        <br />
                        <span className="h2">Brilliance </span>
                    </h1>
                    <Button href="/portfolio" text="See my work" className="text-light" />
                </TextOverlay>
            </section>
            <section className="container py-5">
                <div className="row">
                    <h2 className="fs-2 fw-light text-center text-primary text-uppercase">Photography is the art of capturing fleeting moments, turning the transient into something eternal. Through the lens, everyday scenes transform into extraordinary glimpses of life. It allows us to explore perspectives beyond our own, revealing the hidden depths of both nature and humanity.</h2>
                </div>
            </section>
            <section className="position-relative text-center">
                <div className="position-absolute z-3 text-light text-center centered-button">
                    <Button className="text-light" text="Portfolio" /> | <Button className="text-light" text="Editorials" />
                </div>
                <SwiperPortfolio />
            </section>
        </div>
    );
};

export default HomePage;
