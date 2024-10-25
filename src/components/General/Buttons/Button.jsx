import React from 'react';

const Button = ({ href, text, className, onClick }) => {
    return (
        <>
            {href ? (
                <a href={href} className={`text-transform--uppercase text-decoration--none ${className}`}>
                    {text}
                </a>
            ) : (
                <button
                    className={`text-transform--uppercase text-decoration--none ${className}`}
                    onClick={onClick}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }} 
                >
                    {text}
                </button>
            )}
        </>
    );
};

export default Button;
