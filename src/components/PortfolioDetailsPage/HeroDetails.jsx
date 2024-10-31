import TextOverlay from "../General/TextOverlay";

const HeroDetails = ({ src, slug }) => {
    return (
        <>
            <div className="d--vh-100">
                <img className="object-fit--cover d--w-100 d--h-100" src={src} />
                <TextOverlay textColor="text-color--light" textPosition="bottom" className="text-align---center">
                    <h1 style={{ fontSize: "15vw", whiteSpace: 'pre-line' }}>
                        {slug}
                    </h1>
                </TextOverlay>
            </div>
        </>
    );
};

export default HeroDetails;
