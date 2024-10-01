import React from 'react';
import ProjectCard from '../General/ProjectCard';

const ImageBanner = ({ src, description, date, name, url }) => {
    return (
        <a href={url} className="text-decoration-none">
            <div className="position-relative vh-100 vw-100">
                <div className="blur overdark position-absolute" style={{ backgroundImage: `url(${src})` }}></div>
                <div className="container h-100 d-flex justify-content-center align-items-center">
                    <ProjectCard src={src} name={name} description={description} date={date} orientation="horizontal" />
                </div>
            </div>
        </a>
    );
};

export default ImageBanner;
