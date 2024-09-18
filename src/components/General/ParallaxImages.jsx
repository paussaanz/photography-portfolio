import { motion } from 'framer-motion';

const ParallaxImages = ({ images = [], getYTransform, containerNumber}) => {
    return (
        <>
            {
                images.map(({ src, size }, i) => (
                    <motion.div 
                        style={{ y: getYTransform(size) }} 
                        key={`i_${i}`} 
                        className={`position-absolute image-container-${containerNumber}`}
                    >
                        <img
                            src={src}
                            placeholder="blur"
                            className="h-100 w-100 object-fit-cover"
                            alt={`image-${i}`}
                        />
                    </motion.div>
                ))
            }
        </>
    );
};

export default ParallaxImages;
