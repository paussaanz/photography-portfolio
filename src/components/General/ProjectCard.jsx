import React from "react";
import { useMediaQuery } from "../../contexts/MediaQueryContext";

const ProjectCard = ({ src, name, date, description }) => {

    const { isMobile } = useMediaQuery();
    
    if (isMobile) {
        return (
            <div className="flex flex--a-center flex--j-center flex--col pointer-events--none">
                <div className="p--y-3 d--vh-50 d--vw-50">
                    <img
                        className="d--h-100 d--w-100 object-fit--cover"
                        src={src}
                        alt={name || "Project image"}
                        loading="lazy"
                    />
                </div>

                <div className="text-transform--uppercase text-align--center text-color--overlay">
                    <p className="m--0 h4">{name}</p>
                    {description && (
                        <p className="m--0 text-style--italic">{description}</p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex--a-center flex--j-center flex--col pointer-events--none">
            <p className="m--0 h4 font--di" style={{ color: "white", fontSize: "65px", fontWeight: "700" }}>
                {name}
            </p>

            <div className="p--y-3 d--vh-50 d--vw-50">
                <img
                    className="d--h-100 d--w-100 object-fit--cover"
                    src={src}
                    alt={name || "Project image"}
                    loading="lazy"
                />
            </div>

            <div
                className="text-transform--uppercase text-align--center text-color--overlay flex flex--row flex--col-mbl flex--j-between m--t-5"
                style={{ maxWidth: "55%" }}
            >
                <p className="m--0 text-style--italic">{description}</p>
                {description && (
                    <p
                        className="m--0 text-style--italic"
                        style={{
                            maxWidth: "53%",
                            fontStyle: "normal",
                            fontSize: "12px",
                            textAlign: "justify",
                        }}
                    >
                        A photoshoot is a creative space where stories come to life through light, emotion, and vision.
                        It's the art of capturing moments, turning ideas into stunning visual expressions.
                    </p>
                )}
            </div>
        </div>
    )
};

export default ProjectCard;
