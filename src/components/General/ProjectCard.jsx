import React from 'react';

const ProjectCard = ({src, name, date, description, orientation = 'vertical'}) => {

    const isHorizontal = orientation === 'horizontal';

    return (
        <>
            <div className="d-flex align-items-center justify-content-center flex-column">
                <div className={`${isHorizontal ? 'aspect-16-9 ' : 'aspect-box'} d-flex flex-column justify-content-center align-items-center py-3`} style={{height: '50vh', width: '50vw'}}>
                    <img className="h-100 w-100 object-fit-cover" src={src} alt="" />
                </div>

                <div className='text-uppercase text-center text-white'>
                    <p className="m-0">{name} - {date}</p>
                    <p className="m-0">{description}</p>
                </div>
            </div>
        </>
    );
};

export default ProjectCard;