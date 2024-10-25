import TextOverlay from "../General/TextOverlay";

const HeroDetails = ({ src, slug }) => {
    return (
        <>
            <div className="dimension--vh-100">
                <img className="object-fit--cover dimension--w-100 dimension--h-100" src={src} />
                <TextOverlay textColor="text-color--light" textPosition="bottom" className="text-animated text-align---center">
                    <h1 style={{ fontSize: "15vw", whiteSpace: 'pre-line' }}>
                        {slug}
                    </h1>
                </TextOverlay>
            </div>
        </>
    );
};

export default HeroDetails;
