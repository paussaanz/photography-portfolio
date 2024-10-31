const InfiniteCarrusel = () => {
    const footerItems = Array(3).fill("GET IN TOUCH");

    return (
        <div className="footer__carrusel-wrapper heading--jumbo">
            {footerItems.map((text, index) => (
                <div className="footer__carrusel-item" key={index}>
                    <div className="footer__carrusel-item--text">{text}</div>
                    <div className="footer__carrusel-item--logo"></div>
                </div>
            ))}
        </div>
    );
};

export default InfiniteCarrusel;
