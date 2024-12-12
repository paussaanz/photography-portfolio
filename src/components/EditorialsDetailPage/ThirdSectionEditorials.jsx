const ThirdSectionEditorials = ({ images }) => {
    const { thirdSection, thirdSectionTitle, thirdSectionText } = images; // Destructure properties from `images`

    return (
        <>
            <h1 className="editorials-detail__sub-section__title h4 h5-mbl position--absolute">{thirdSectionTitle}</h1>

            <div className="editorials-detail__sub-section__container flex flex--col-mbl d--h-100">
                <div className="editorials-detail__sub-section__container__image flex p--l-3 overflow--hidden flex--1 d--w-max-50 d--w-max-100-mbl">
                    <img src={thirdSection[0].src} alt="Slide 5" />
                </div>
                <div className="editorials-detail__sub-section__container__mixed p--l-3 flex flex--col flex--1 d--w-max-50 d--w-max-100-mbl">
                    <div className="editorials-detail__sub-section__container__mixed__image flex">
                        <img src={thirdSection[1].src} alt="Slide 5" />
                    </div>
                    <div className="editorials-detail__sub-section__container__mixed__text flex flex--j-end flex--a-end flex--col-mbl">
                        {thirdSectionText.map((text) => (
                        <p className="tag-2 tag-2-mbl p--2 d--w-max-100-mbl">{text}</p>

                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ThirdSectionEditorials;