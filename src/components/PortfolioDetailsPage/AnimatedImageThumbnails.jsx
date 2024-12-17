import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import LenisContext from "../../contexts/LenisContext";
import ImageList from "./ImageList";

const AnimatedThumbnailList = ({
    getImageAspectRatio,
    imageList,
    setSelectedImage,
    selectedImage,
}) => {
    const [extendedList, setExtendedList] = useState([]);
    const { stop, start } = useContext(LenisContext);

    // Extender la lista para loop infinito
    useEffect(() => {
        stop();
        const extended = [...imageList, ...imageList, ...imageList];
        setExtendedList(extended);
        return () => {
            start();
        };
    }, [imageList]);

    return (
        <motion.div

            style={{
                display: "flex",
                flexDirection: "column",
                overflowY: "auto",
                height: "100vh",
            }}
            className="pdetails__container-thumbnails"
        >
            <ImageList
                extendedList={extendedList}
                imageList={imageList}
                getImageAspectRatio={getImageAspectRatio}
                setSelectedImage={setSelectedImage}
                selectedImage={selectedImage}
            />
        </motion.div>
    );
};

export default AnimatedThumbnailList;
