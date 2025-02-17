import React from 'react';
import InfiniteTicker from './InfiniteTicker';

const SecondSectionEditorials = ({ images }) => {
    const { secondSection, secondSectionText } = images; // Destructure properties from `images`

    return (
        <>
            <div className="editorials-detail__first-section__thumbnails d--w-100 m--t-5 d--h-100-mbl flex flex--col-mbl">
                <div className="editorials-detail__first-section__thumbnails__text flex flex--j-end flex--j-start-mbl flex--1">
                    <img src={secondSection[0].src} alt="Slide 5" className="editorials-detail__first-section__thumbnails__image flex--1 d--w-max-50 object-fit--cover" />
                </div>
                <div className="editorials-detail__first-section__thumbnails__images flex flex--j-between flex--1">
                    <div className="editorials-detail__first-section__thumbnails__images--content flex flex--col tag-1 tag-1-mbl text-align--right flex--j-end flex--1 d--w-max-50"><p>PHOTOGRAPHY AND<br /> DESIGN BY .SYP!</p></div>
                    <img src={secondSection[1].src} alt="Slide 5" className="editorials-detail__first-section__thumbnails__image flex--1 object-fit--cover" />
                </div>
            </div>
            <div className="editorials-detail__first-section__long-image d--w-100" style={{ background: `url(${secondSection[2].src})`, backgroundSize: "cover", backgroundRepeat: 'no-repeat', backgroundPosition: "center", height: '500px' }} />

            <InfiniteTicker />
            {/* <InfiniteTicker /> */}
            <p className="editorials-detail__long-image-paragraph tag-2 tag-2-mbl p--0-mbl">
                {secondSectionText}
            </p>
        </>
    );
};

export default SecondSectionEditorials;