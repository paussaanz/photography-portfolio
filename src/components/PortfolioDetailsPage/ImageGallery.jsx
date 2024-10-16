import { useEffect, useRef, useState } from "react";
import GalleryItem from "./GalleryItem";

const ImageGallery = ({ images }) => {

    function groupImages(images, groupSize) {
        const groupedImages = [];

        for (let i = 0; i < images.length; i += groupSize) {
            const group = images.slice(i, i + groupSize);
            groupedImages.push(group);
        }

        return groupedImages;
    }


    const [items, setItems] = useState(groupImages(images, 5));
    const [mousePositions, setMousePositions] = useState({});


    // create the logic to scroll to the gallery section when component is mounted

    const handleMouseMoveImg = (e, itemId) => {
        const { clientX, clientY, currentTarget } = e;
        const rect = currentTarget.getBoundingClientRect();
        const x = clientX - rect.left; // Mouse position relative to the image
        const y = clientY - rect.top;

        setMousePositions((prevPositions) => ({
            ...prevPositions,
            [itemId]: { x, y }, // Update position for the specific item
        }));
    };

    const handleMouseLeaveImg = (itemId) => {
        setMousePositions((prevPositions) => ({
            ...prevPositions,
            [itemId]: null, // Reset the mouse position on leave
        }));
    };


    return (
        <div id="gallery-container">
            {items.map((row, rowIndex) => (
                <div className="gallery-row" key={`row-${rowIndex}`}>
                    {row.map((item) => (
                        <GalleryItem item={item} key={item.src} mousePositions={mousePositions} handleMouseLeaveImg={handleMouseLeaveImg} handleMouseMoveImg={handleMouseMoveImg} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ImageGallery;
