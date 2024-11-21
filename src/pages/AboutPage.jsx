import FavoritesAbout from '../components/AboutPage/FavoritesAbout';
import HeroAbout from '../components/AboutPage/HeroAbout';
import MarqueeAbout from '../components/AboutPage/MarqueeAbout';
import TextAbout from '../components/AboutPage/TextAbout';
import LoaderAbout from '../components/Loaders/LoaderAbout';
import AboutPageSeo from './SEO/AboutPageSeo';

const AboutPage = ({ isVisited }) => {
    return (
        <div data-barba="container">
            <AboutPageSeo />

            <section className="about__section-hero d--vh-150 overflow--y-hidden">
                {isVisited ?
                    <HeroAbout />
                    :
                    <LoaderAbout />
                }
            </section>

            <section className="about__section-marquee">
                <MarqueeAbout />
            </section>

            <section className="about__section-text">
                <TextAbout />
            </section>

            <section className="about__section-work">
                <FavoritesAbout/>
            </section>
        </div>
    );
};

export default AboutPage;
