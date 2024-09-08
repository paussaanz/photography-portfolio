import React from 'react';

const ImageBanner = ({ src, description, date, name }) => {
    return (
        <div className="position-relative vh-100 vw-100">
            <div className="blur overdark" style={{ backgroundImage: `url(${src})` }}></div>
            <div className="container h-100 d-flex justify-content-center align-items-center">
                <div className="row w-100">
                    <div className="col-12 col-md-6 offset-md-3">
                        
                        <div className="aspect-16-9 d-flex justify-content-center align-items-center py-3">
                            <p className="moving-text position-absolute d-block">
                                HOLA HOLA HOLA
                            </p>
                            <img className=" img-fluid h-100 w-100 object-fit-cover" src={src} alt="" />
                        </div>

                        <div className='text-uppercase text-center text-white'>
                            <p className="m-0">{name} - {date}</p>
                            <p className="m-0">{description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageBanner;
