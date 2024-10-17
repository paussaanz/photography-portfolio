import React from 'react';
import InfiniteCarrusel from './InfiniteCarrusel';
import Scene3D from './Scene3D';

const Footer = () => {
    return (
        <div className='vh-100 d-flex flex-column bg-primary'>
            <section className='infinite-carrusel'>
                <InfiniteCarrusel />
            </section>
            <section className='3d-logo flex-grow-1'>
            <Scene3D/>
            </section>
            <section className='bottom-links mt-auto'>
                <div className="d-flex justify-content-between p-4 text-secondary text-uppercase">
                    <p>Privacy policy</p>
                    <p>Social Media Links</p>
                    <p>Site by SYP</p>
                </div>
            </section>
        </div>
    );
};

export default Footer;
