import React from 'react';
import InfiniteCarrusel from './InfiniteCarrusel';

const Footer = () => {
    return (
        <div className='vh-100 d-flex flex-column bg-primary'>
            <section className='infinite-carrusel'>
                <InfiniteCarrusel />
            </section>
            <section className='3d-logo'>
            <h1>SECCION 3D</h1>
            <h1>SECCION 3D</h1>
            <h1>SECCION 3D</h1>
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
