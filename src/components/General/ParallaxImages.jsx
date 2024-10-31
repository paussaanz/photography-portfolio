import { motion } from 'framer-motion';

const ParallaxImages = ({ images = [], getYTransform, classname}) => {
    return (
        <>
            {
                images.map(({ src, y }, i) => (
                    <motion.div 
                        style={{ y: getYTransform(y) }} 
                        key={`i_${i}`} 
                        className={`${classname}`}
                    >
                        <img
                            src={src}
                            className="d--h-100 d--w-100 object-fit--cover"
                            alt={`image-${i}`}
                        />
                    </motion.div>
                ))
            }
        </>
    );
};

export default ParallaxImages;
