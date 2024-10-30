import ClipPathAnimation from '../components/AboutPage/ClipPathAnimation';
import HeroAbout from '../components/AboutPage/HeroAbout';
import MarqueeAbout from '../components/AboutPage/MarqueeAbout';
import TextAbout from '../components/AboutPage/TextAbout';
import AboutPageSeo from './SEO/AboutPageSeo';

const AboutPage = () => {
    return (
        <div data-barba="container">
            <AboutPageSeo />

            <section className="hero-about-section dimension--vh-150 overflow--y-hidden">
                <HeroAbout />
            </section>

            <section className="marquee-about-section">
                <MarqueeAbout />
            </section>

            <section className="text-about-section">
                <TextAbout />
            </section>

            <section className="work-about-section">
                <ClipPathAnimation />
            </section>
        </div>
    );
};

export default AboutPage;
