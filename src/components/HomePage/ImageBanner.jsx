import React from 'react';
import ProjectCard from '../General/ProjectCard';

const ImageBanner = ({ src, description, date, name, url }) => {
    return (
        <a href={url} className="text-decoration--none">
            <div className="position--relative dimension--vh-100 dimension--vw-100">
                <div className="blur over--dark position--absolute" style={{ backgroundImage: `url(${src})` }}></div>
                <div className="container-bem dimension--h-100 flex--display flex--justify-center flex--align-center">
                    <ProjectCard src={src} name={name} description={description} date={date} orientation="horizontal" />
                </div>
            </div>
        </a>
    );
};

export default ImageBanner;
