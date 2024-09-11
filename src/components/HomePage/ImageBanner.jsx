import React from 'react';
import ProjectCard from '../General/ProjectCard';

const ImageBanner = ({ src, description, date, name }) => {
    return (
        <div className="position-relative vh-100 vw-100">
            <div className="blur overdark position-absolute" style={{ backgroundImage: `url(${src})` }}></div>
            <div className="container h-100 d-flex justify-content-center align-items-center">
                <ProjectCard src={src} name={name} description={description} date={date} orientation="horizontal"/>
            </div>
        </div>
    );
};

export default ImageBanner;
