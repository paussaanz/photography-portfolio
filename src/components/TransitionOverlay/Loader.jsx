import { useEffect, useState } from 'react';
import { and, ellipse1, ellipse2, excl1, noellipse, quest1 } from '../../assets/js/svg.js';
import { interpolate } from 'flubber';
import { motion, animate, useMotionValue, useTransform } from 'framer-motion';
import SypComponent from './SypComponent';

const Loader = ({ onCompleteLoading }) => {
    const [isReadyToFade, setIsReadyToFade] = useState(false);

    const SVGMorph = ({ paths, onComplete }) => {
        const [indexOfPath, setIndexOfPath] = useState(0);
        const progress = useMotionValue(0);

        // Create the transform to morph between paths
        const pathValue = useTransform(progress, paths.map((_, i) => i), paths, {
            mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 8 }),
        });

        useEffect(() => {
            const startAnimation = () => {
                animate(progress, indexOfPath, {
                    duration: 0.1,
                    ease: 'easeInOut',
                    delay: 0.5,
                    onComplete: () => {
                        const nextIndex = (indexOfPath + 1) % paths.length;
                        setIndexOfPath(nextIndex);

                        if (indexOfPath === paths.length - 1 && onComplete) {
                            onComplete(); // Notify when the sequence is complete
                        }
                    },
                });
            };

            startAnimation();
        }, [indexOfPath, progress, paths, onComplete]);

        return <motion.path  fill="var(--cor-primary)" d={pathValue} />;
    };

    const handleAnimationComplete = () => {
        setIsReadyToFade(true);
        if (onCompleteLoading) onCompleteLoading();
    };

    return (
        <motion.div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: isReadyToFade ? 0 : 1 }}
            transition={{ opacity: { duration: 1 } }}
        >
            <SypComponent />
            <svg
                style={{ height: '200px' }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 433.11 491.1"
            >
                <SVGMorph
                    paths={[excl1, quest1, and, excl1]}
                    onComplete={handleAnimationComplete}
                />
                <SVGMorph
                    paths={[ellipse1, ellipse2, noellipse, ellipse1]}
                    onComplete={handleAnimationComplete}
                />
            </svg>
        </motion.div>
    );
};

export default Loader;
