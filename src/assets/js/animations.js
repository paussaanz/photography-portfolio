import { useTransform } from 'framer-motion';

export const getYTransform = (scrollYProgress) => {
    const xsm = useTransform(scrollYProgress, [0, 1], [0, 250]);
    const sm = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const md = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const lg = useTransform(scrollYProgress, [0, 1], [0, -400]);

    return (size) => {
        switch (size) {
            case 'sm':
                return sm;
            case 'md':
                return md;
            case 'lg':
                return lg;
            default:
                return xsm;
        }
    };
};

export const useLetterTransforms = (word, scrollYProgress) => {
    const initialYPositions = [700, 720, 680, 740, 750, 710, 690, 760, 730];
    const scrollRanges = [[0, 0.35], [0, 0.55], [0, 0.45], [0, 0.55], [0, 0.5], [0, 0.6], [0, 0.4], [0, 0.65], [0, 0.35]];

    return word.split("").map((_, index) => {
        const initialY = initialYPositions[index % initialYPositions.length];
        const [start, end] = scrollRanges[index % scrollRanges.length];
        return useTransform(scrollYProgress, [start, end], [initialY, 0]);
    });
};

