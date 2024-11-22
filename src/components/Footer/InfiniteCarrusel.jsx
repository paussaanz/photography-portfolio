import { Link } from "react-router-dom";

const InfiniteCarrusel = () => {
    const footerItems = Array(3).fill("GET IN TOUCH");

    return (
        <Link to="/contact" className="footer__carrusel-wrapper heading--jumbo text-decoration--none">
            {footerItems.map((text, index) => (
                <div className="footer__carrusel-item" key={index}>
                    <div className="footer__carrusel-item--text">{text}</div>
                    <div className="footer__carrusel-item--logo"></div>
                </div>
            ))}
        </Link>
    );
};

export default InfiniteCarrusel;
