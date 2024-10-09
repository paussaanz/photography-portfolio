import { motion } from "framer-motion";

const GalleryItem = ({item, mousePositions, handleMouseMoveImg, handleMouseLeaveImg}) => {
    return (
        <>
            <motion.div className="item" key={item.id}
                onMouseMove={(e) => handleMouseMoveImg(e, item.id)}
                onMouseLeave={() => handleMouseLeaveImg(item.id)}
                animate={{
                    marginTop: `-${(mousePositions[item.id]?.y || 0) * 0.2}px`,
                    marginLeft: `-${(mousePositions[item.id]?.x || 0) * 0.2}px`,
                    scale: mousePositions[item.id] ? 1.2 : 1, // Scaling on hover
                }}
                transition={{
                    type: "tween",
                    stiffness: 30,
                    duration: 0.3, // Smooth transition for scaling and movement
                }}>
                <div className="preview-img">
                    <img className="gallery-img" src={item.src} alt="prueba" />
                </div>
            </motion.div>
        </>
    );
};

export default GalleryItem;