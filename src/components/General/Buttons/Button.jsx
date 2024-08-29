import React from 'react';

const Button = ({href, text, className }) => {
    return (
        <>
            <a href={`${href}`} className={`text-uppercase text-decoration-none ${className}`}>{text}</a>
        </>
    );
};

export default Button;