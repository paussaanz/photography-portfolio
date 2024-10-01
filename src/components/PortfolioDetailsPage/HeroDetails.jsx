import TextOverlay from "../General/TextOverlay";

const HeroDetails = ({ src, slug }) => {
    return (
        <>
            <div className="vh-100">
                <img className="object-fit-cover w-100 h-100" src={src} />
                <TextOverlay textColor="text-light" textPosition="bottom" className="text-animated text-center">
                    <h1 style={{"font-size": "15vw"}}>
                        {slug}
                    </h1>
                </TextOverlay>
            </div>
        </>
    );
};

export default HeroDetails;