const EditorialCard = ({ images }) => {
    return (
        <>
                {
                images.map(({ src, name, year }, i) => (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                    <div className="d-flex flex-column justify-content-center align-items-center " style={{ height: '50vh', width: '50vw' }}>
                        <img className="h-100 w-100 object-fit-cover" src={src} alt="Imagen" />
                    </div>
                    <div className="d-flex justify-content-between text-uppercase text-primary h5" style={{ marginTop: '10px', width: '50vw' }}>
                        <p className="m-0" style={{ textAlign: 'left' }}>{name}</p>
                        <p className="m-0" style={{ textAlign: 'center' }}>x </p>
                        <p className="m-0" style={{ textAlign: 'right' }}> {year}</p>
                    </div>
                </div>
                ))
            }
</>
    );
};

export default EditorialCard;