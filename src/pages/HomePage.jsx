import React from 'react';
import VideoBackground from '../components/Hero/VideoBackground';
import TextOverlay from '../components/Hero/TextOverlay';


const HomePage = () => {
    return (
        <div className="homepage">
            <VideoBackground videoSrc="/DJI_0155.MP4" />
            <TextOverlay textColor="text-light">
                <h1>Capture</h1>
                <h1 className="h2">Brilliance</h1>
                <p>Some additional description or subtitle text.</p>
            
            </TextOverlay>
        </div>
    );
};

export default HomePage;