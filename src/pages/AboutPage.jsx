import ClipPathAnimation from '../components/AboutPage/ClipPathAnimation';
import HeroAbout from '../components/AboutPage/HeroAbout';
import MarqueeAbout from '../components/AboutPage/MarqueeAbout';
import TextAbout from '../components/AboutPage/TextAbout';
import AboutPageSeo from './SEO/AboutPageSeo';

const AboutPage = () => {
    return (
        <div data-barba="container">
            <AboutPageSeo />

            <section className="about__section-hero d--vh-150 overflow--y-hidden">
                <HeroAbout />
            </section>

            <section className="about__section-marquee">
                <MarqueeAbout />
            </section>

            <section className="about__section-text">
                <TextAbout />
            </section>

            <section className="about__section-work">
                <ClipPathAnimation />
            </section>
        </div>
    );
};

export default AboutPage;
