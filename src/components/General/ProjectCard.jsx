import React from 'react';

const ProjectCard = ({ src, name, date, description, orientation = 'vertical' }) => {

    const isHorizontal = orientation === 'horizontal';

    return (
        <>
            <div className="flex--disiplay flex--align-center flex--justify-center flex--column">
                <div className={`${isHorizontal ? 'aspect-16-9 ' : 'aspect-box'} flex--display flex--column flex--justify-center flex--align-center py-3`} style={{ height: '50vh', width: '50vw' }}>
                    <img className="dimension--h-100 dimension--w-100 object-fit--cover" src={src} alt="" />
                </div>

                <div className='text-transform--uppercase text-align--center text-color--light'>
                    <p className="margin--0">{name} - {date}</p>
                    <p className="margin--0">{description}</p>
                </div>
            </div>
        </>
    );
};

export default ProjectCard;