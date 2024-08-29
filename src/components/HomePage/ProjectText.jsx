import React from 'react';

const ProjectText = ({name, description, date, textColor}) => {
    return (
        <div className={`text-uppercase text-center ${textColor}`}>
            <p className="m-0">{name} - {date}</p>
            <p className="m-0">{description}</p>
        </div>
    );
};

export default ProjectText;