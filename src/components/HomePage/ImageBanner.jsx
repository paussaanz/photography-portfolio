import React from 'react';
import ProjectCard from '../General/ProjectCard';
import { useTransition } from '../../contexts/transitionContext';

const ImageBanner = ({ src, description, date, name, url }) => {
    const { handleLinkClick } = useTransition();

    return (
        <a onClick={() => {
            console.log('entro')
            handleLinkClick(url)
        }} className="text-decoration--none">
            <div className="position--relative d--vh-100 d--vw-100 pointer-events--none">
                <div className="blur over--dark position--absolute pointer-events--none" style={{ backgroundImage: `url(${src})` }}></div>
                <div className="container-bem d--h-100 flex flex--j-center flex--a-center pointer-events--none">
                    <ProjectCard src={src} name={name} description={description} date={date} />
                </div>
            </div>
        </a>
    );
};

export default ImageBanner;
