import React from 'react';

const VideoBackground = ({ videoSrc, height }) => {
    return (
        <>
            <div className={`video-container ${height}`}>
                <video autoPlay loop muted className="object-fit--cover dimension--w-100 dimension--h-100" src={videoSrc}></video>
            </div>
        </>
    );
};

export default VideoBackground;