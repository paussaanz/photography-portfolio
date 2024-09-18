import TextOverlay from "../General/TextOverlay";

const HeroDetails = ({src}) => {
    return (
        <>
            <div className="vh-100">
                <img className="object-fit-cover w-100 h-100" src={src}/>
                <TextOverlay textColor="text-light" textPosition="text-center" className="text-animated">
                    <h1>
PHOTOSHOOTS                    </h1>
                </TextOverlay>
            </div>
        </>
    );
};

export default HeroDetails;