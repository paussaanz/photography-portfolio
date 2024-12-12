const FourthSectionEditorials = ({ images }) => {
    return (
        <div
            style={{
                background: `url(${images[0].src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            className="editorials-detail__end-section__container flex flex--a-center flex--j-center d--vh-150"
        >
            <img src={images[1].src} alt="Slide 5" className="editorials-detail__end-section__container__image d--w-50" />
        </div>
    );
};

export default FourthSectionEditorials;