import InfiniteCarrusel from './InfiniteCarrusel';
import Scene3D from './Scene3D';

const Footer = () => {
    return (
        <div className='footer__section'>
            <section className='footer__section-carrusel'>
                <InfiniteCarrusel />
            </section>
            <section className='footer__section-3d-logo'>
            <Scene3D/>
            </section>
            <section className='footer__section-links'>
                <div className="flex flex--j-between p--4 text-color--secondary text-transform--uppercase">
                    <p>Privacy policy</p>
                    <p>Social Media Links</p>
                    <p>Site by SYP</p>
                </div>
            </section>
        </div>
    );
};

export default Footer;
