import React from 'react';

const VideoBackground = ({videoSrc}) => {
    return (
        <div>
            <div className="video-container">
      <video autoPlay loop muted className="video" src={videoSrc}></video>
    </div>
        </div>
    );
};

export default VideoBackground;