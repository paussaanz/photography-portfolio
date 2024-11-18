import React from 'react';

const ProjectCard = ({ src, name, date, description }) => {


    return (
        <>
            <div className="flex flex--a-center flex--j-center flex--col">
                <div className="p--y-3 d--vh-50 d--vw-50">
                    <img className="d--h-100 d--w-100 object-fit--cover" src={src} alt="project image" loading="lazy"/>
                </div>

                <div className='text-transform--uppercase text-align--center text-color--light'>
                    <p className="m--0">{name} - {date}</p>
                    <p className="m--0">{description}</p>
                </div>
            </div>
        </>
    );
};

export default ProjectCard;