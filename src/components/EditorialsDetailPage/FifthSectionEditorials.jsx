import React from 'react';

const FifthSectionEditorials = ({ images }) => {
    // Destructure with default values to prevent undefined
    const {
        fifthSectionTitle = "",
        fifthSectionTitle2 = "",
        fifthSectionText = "",
        fifthSectionText2 = "",
        fifthSectionText3 = "",
        fifthSectionImage
    } = images || {}; // Handle cases where `images` itself is undefined

    console.log(fifthSectionImage)
    const randomStyledTitle = (title, className) => {
        // Safeguard against undefined or empty strings
        if (!title || title.length === 0) return null;

        const randomIndex = Math.floor(Math.random() * title.length);

        return (
            <>
                {title.slice(0, randomIndex)}
                <span className={className}>{title[randomIndex]}</span>
                {title.slice(randomIndex + 1)}
            </>
        );
    };

    return (
        <div className="editorials-detail__fifth-section__container flex flex--col d--vh-100 flex--j-around">
            <div className='editorials-detail__fifth-section__title p--t-5 container-bem position--relative text-align--right'>
                <h2 className='editorials-detail__fifth-section__title_1'>
                    {randomStyledTitle(fifthSectionTitle, "font--dirty")}
                </h2>
                <h2 className="editorials-detail__fifth-section__title_2">
                    {randomStyledTitle(fifthSectionTitle2, "font--dirty")}
                </h2>
            </div>
            <div className='editorials-detail__fifth-section__image position--relative'>
                <img className="d--w-100 d--h-100 object-fit--cover" src={fifthSectionImage[0].src} alt="Tanzania" />
                <div className="editorials-detail__fifth-section__image_overlay">
                    {/* Add overlay content here */}
                </div>
            </div>
            <div className='editorials-detail__fifth-section__text flex flex--row flex--col-mbl g--3 container-bem tag-2 tag-2-mbl position--relative'>
                <p className='flex--1 d--w-100'></p>
                <p className="flex--1 d--w-100">{fifthSectionText}</p>
                <p className="flex--1 d--w-100">{fifthSectionText2}</p>
                <p className="flex--1 d--w-100">{fifthSectionText3}</p>
            </div>
        </div>
    );
};

export default FifthSectionEditorials;
