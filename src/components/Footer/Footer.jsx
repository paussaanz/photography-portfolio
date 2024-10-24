import InfiniteCarrusel from './InfiniteCarrusel';
import Scene3D from './Scene3D';

const Footer = () => {
    return (
        <div className='dimension--vh-100 flex--display flex--column background--primary'>
            <section className='infinite-carrusel'>
                <InfiniteCarrusel />
            </section>
            <section className='3d-logo flex--grow-1'>
            <Scene3D/>
            </section>
            <section className='bottom-links margin--top-auto'>
                <div className="flex--display flex--justify-between padding--4 text-color--secondary text-transform--uppercase">
                    <p>Privacy policy</p>
                    <p>Social Media Links</p>
                    <p>Site by SYP</p>
                </div>
            </section>
        </div>
    );
};

export default Footer;
