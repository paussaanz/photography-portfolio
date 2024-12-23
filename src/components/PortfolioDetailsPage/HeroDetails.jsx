import { useMediaQuery } from "../../contexts/MediaQueryContext";
import TextOverlay from "../General/TextOverlay";

const HeroDetails = ({ src, slug, number, subtitle }) => {
    const { isMobile } = useMediaQuery()

    return (
        <>
            <div className="d--vh-100">
                <div className="over over--dark d--w-100 d--h-100">
                    <img
                        className="object-fit--cover d--w-100 d--h-100"
                        src={src}
                        alt="Hero Editorials Image"
                        loading="lazy"
                    />
                </div>
                <TextOverlay textColor="text-color--overlay" textPosition={isMobile ? "center" : "bottom"} className="text-align---center z-index--5">
                    <h1 className={`${isMobile && 'text-align--center p--b-5'}`} style={{ fontSize: isMobile ? "12vw" : "15vw", whiteSpace: 'pre-line' }}>
                        {slug}
                    </h1>

                    {isMobile &&
                        <div className="text-align--center p--t-5 flex flex--col flex--j-center flex--a-center">
                            <h6>PHOTOGRAPHY</h6>
                            <h6 className="m--t-1">{number}   /   05</h6>
                            <h6 className="text-overlay__subtitle">{subtitle}</h6>
                        </div>
                    }
                </TextOverlay>
            </div>
        </>
    );
};

export default HeroDetails;
