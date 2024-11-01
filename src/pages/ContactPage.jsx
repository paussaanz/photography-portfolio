import { useState } from 'react';
import ContactLink from '../components/ContactPage/ContactLink';
import Scene3DContact from '../components/ContactPage/Scene3DContact';
import TextOverlay from '../components/General/TextOverlay';
import ContactPageSeo from './SEO/ContactPageSeo';
import CursorHover from '../components/Cursor/CursorHover';

const ContactPage = () => {
    const [hovered, setHovered] = useState(false);
    const [cursorVisible, setCursorVisible] = useState(false);

    return (
        <div data-barba="container">
            <ContactPageSeo />
            <CursorHover visible={cursorVisible} />

            <section className="contact__section-hero">
                <div className="d--vh-100 flex flex--col">
                    <div className="text-3d-logo d--vh-100 position--relative">
                        <Scene3DContact hovered={hovered} />
                        <TextOverlay onMouseEnter={() => {
                            setHovered(true);
                            setCursorVisible(true);  // Enable custom cursor
                        }}
                            onMouseLeave={() => {
                                setHovered(false);
                                setCursorVisible(false); // Disable custom cursor
                            }}
                            textColor="text-color--primary" textPosition="center" className="text-align--center d--w-100">
                            <h1>
                                <span className='block--display'>Click, design, develop</span>
                                <span className="block--display">Let's collaborate!</span>
                            </h1>
                        </TextOverlay>
                    </div>
                    <div className="contact__email">
                        <ContactLink text="paula@sypcreative.com" logoClass='mail' fontSize={'h4'} />

                    </div>
                    <div className="contact__links">
                        <ContactLink text="LINKEDIN" logoClass='linkedin' fontSize={'h5'} />
                        <ContactLink text="GITHUB" logoClass='github' fontSize={'h5'} />
                        <ContactLink text="INSTAGRAM" logoClass='instagram' fontSize={'h5'} />
                        <ContactLink text="BEHANCE" logoClass='behance' fontSize={'h5'} />
                    </div>
                </div>
            </section>
        </div>
    );
};


export default ContactPage;
