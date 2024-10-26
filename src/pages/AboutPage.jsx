import HeroAbout from '../components/AboutPage/HeroAbout';
import AboutPageSeo from './SEO/AboutPageSeo';

const AboutPage = () => {
    return (
        <div data-barba="container">
            <AboutPageSeo />
            <HeroAbout />
        </div>
    );
};

export default AboutPage;
