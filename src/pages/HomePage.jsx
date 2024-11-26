import { useEffect, useRef } from 'react';
import VideoBackground from '../components/HomePage/VideoBackground';
import TextOverlay from '../components/General/TextOverlay';
import Button from '../components/General/Buttons/Button';
import SwiperPortfolio from '../components/HomePage/SwiperPortfolio';
import { useScroll, motion, useMotionValue, useTransform } from 'framer-motion';
import TextAnimation from '../components/General/TextAnimation';
import { useLocation } from 'react-router-dom';
import HomeSeo from './SEO/HomeSeo';
import LoaderHomePage from '../components/Loaders/LoaderHomePage';
import AnimatedHeading from '../components/General/LinkReveal';

const HomePage = ({ isVisited }) => {
    const homepageRef = useRef(); // Renombramos para evitar duplicidad
    const location = useLocation();

    const word = "CAPTURE"
    const { scrollYProgress } = useScroll({
        target: homepageRef,
        offset: ["start start", "center center"]
    });

    const scale = useMotionValue(1);
    const rotate = useMotionValue(0);


    const yTranslate = useTransform(scrollYProgress, [0, 0.1], ["0%", "-100%"]);
    const yTranslateInverse = useTransform(scrollYProgress, [0, 0.1], ["100%", "0%"]);

    useEffect(() => {
        scale.set(1);
        rotate.set(0);

        const unsubscribe = scrollYProgress.onChange((value) => {
            const newScale = 1 - 0.2 * value;
            const newRotate = 0 + 0.5 * value;

            scale.set(newScale);
            rotate.set(newRotate);
        });

        return () => {
            // Limpia el efecto al desmontar
            unsubscribe();
        };
    }, [scrollYProgress, location.pathname, scale, rotate]);

    return (
        <div ref={homepageRef} data-barba="container">
            <HomeSeo />

            <section className="home__section-hero position--relative d--vh-100 overflow--hidden">
                {isVisited ?
                    <>
                        <VideoBackground videoSrc="/images/mid/nature-30.webp" height="d--vh-100" />
                        <TextOverlay textColor="text-color--light" textPosition="center" className="text-align--center">
                            <h1>
                                <span className='block--display'>Capture</span>
                                <span className="h2 block--display">Brilliance</span>
                            </h1>

                            {/* <h1>
                                <div className="text-decoration--none position--relative block--display white-space--nowrap overflow--hidden">
                                    <motion.div
                                        style={{ y: yTranslate }}>
                                        CAPTURE
                                    </motion.div>
                                    <motion.div
                                        style={{ y: yTranslateInverse }}
                                        className="position--absolute inset--0">
                                        CAPTURE
                                    </motion.div>
                                </div>

                                <div className="text-decoration--none position--relative block--display white-space--nowrap overflow--hidden">
                                    <motion.div
                                        style={{ y: yTranslate }}
                                        className="h2">
                                        BRILLIANCE
                                    </motion.div>
                                    <motion.div
                                        style={{ y: yTranslateInverse }}
                                        className="h2 position--absolute inset--0">
                                        BRILLIANCE
                                    </motion.div>
                                </div>
                            </h1> */}

                            <Button href="/portfolio" text="See my work" className="text-color--light" />
                        </TextOverlay>
                    </>
                    :
                    <LoaderHomePage />
                }
            </section>
            <section className="home__section-swiper-animation">
                <motion.div
                    key={location.pathname}
                    style={{ scale, rotate }}
                    className="position--sticky position--top-0 p--y-5 d--vh-100 align-content--center">
                    <TextAnimation text="Photography is the art of capturing fleeting moments, turning the transient into something eternal. Through the lens, everyday scenes transform into extraordinary glimpses of life. It allows us to explore perspectives beyond our own, revealing the hidden depths of both nature and humanity." />
                </motion.div>

                <SwiperPortfolio />
            </section>
        </div >
    );
};


export default HomePage;
