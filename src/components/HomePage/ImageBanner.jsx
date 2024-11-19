import React from 'react';
import ProjectCard from '../General/ProjectCard';
import { Link } from 'react-router-dom';

const ImageBanner = ({ src, description, date, name, url }) => {
    return (
        <Link to={url} className="text-decoration--none">
            <div className="position--relative d--vh-100 d--vw-100">
                <div className="blur over--dark position--absolute" style={{ backgroundImage: `url(${src})` }}></div>
                <div className="container-bem d--h-100 flex flex--j-center flex--a-center">
                    <ProjectCard src={src} name={name} description={description} date={date} />
                </div>
            </div>
        </Link>
    );
};

export default ImageBanner;
