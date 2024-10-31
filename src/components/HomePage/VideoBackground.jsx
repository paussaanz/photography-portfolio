import React from 'react';

const VideoBackground = ({ videoSrc, height }) => {
    return (
        <>
            <div className={`home__hero-video ${height}`}>
                <video autoPlay loop muted className="object-fit--cover d--w-100 d--h-100" src={videoSrc}></video>
            </div>
        </>
    );
};

export default VideoBackground;