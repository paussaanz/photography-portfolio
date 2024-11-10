import { useState } from 'react';
import ContactLink from '../components/ContactPage/ContactLink';
import Scene3DContact from '../components/ContactPage/Scene3DContact';
import TextOverlay from '../components/General/TextOverlay';
import ContactPageSeo from './SEO/ContactPageSeo';
import CursorHover from '../components/Cursor/CursorHover';

const ContactPage = () => {
    const [hovered, setHovered] = useState(false);
    const [cursorVisible, setCursorVisible] = useState(true);

    const contactLinks = [
        { text: "LINKEDIN", logoClass: "icon-linkedin", href: "https://www.linkedin.com/in/paula-sanz-perez/" },
        { text: "GITHUB", logoClass: "icon-github", href: "https://github.com/paussaanz" },
        { text: "INSTAGRAM", logoClass: "icon-instagram", href: "https://www.instagram.com/sypcreative/" },
        { text: "BEHANCE", logoClass: "icon-behance", href: "https://www.behance.net/paulasanz1", fontSize:"h6" }
    ];

    return (
        <div data-barba="container">
            <ContactPageSeo />
            <CursorHover visible={cursorVisible} />

            <section className="contact__section-hero">
                <div className="d--vh-100 flex flex--col">
                    <div className="text-3d-logo d--vh-100 position--relative">
                        <Scene3DContact hovered={hovered} />
                        <TextOverlay
                            onMouseEnter={() => {
                                setHovered(true);
                                setCursorVisible(true);  // Enable custom cursor
                            }}
                            onMouseLeave={() => {
                                setHovered(false);
                                setCursorVisible(false); // Disable custom cursor
                            }}
                            href="/contact/form"
                            textColor="text-color--primary"
                            textPosition="center"
                            className="text-align--center d--w-100 text-decoration--none">
                            <h1>
                                <span className='block--display'>Click, design, develop</span>
                                <span className="block--display">Let's collaborate!</span>
                            </h1>
                        </TextOverlay>
                    </div>
                    <div className="contact__email">
                        <ContactLink
                            text="paula@sypcreative.com"
                            href="mailto:paula@sypcreative.com"
                            logoClass='icon-mail'
                            fontSize={'h4'} />

                    </div>
                    <div className="contact__links">
                        {contactLinks.map((link) => (
                            <ContactLink
                                key={link.text} // Use a unique key for each child in a list
                                text={link.text}
                                logoClass={link.logoClass}
                                href={link.href}
                                backgroundColor= "background--primary"
                                fontSize={link.fontSize ? link.fontSize : 'h5'}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};


export default ContactPage;
