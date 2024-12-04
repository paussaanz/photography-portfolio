import { Link } from "react-router-dom";

const InfiniteCarrusel = () => {
  const footerItems = Array.from({ length: 3 }, () => ({
    text: "GET IN TOUCH",
    logoClass: "footer__carrusel-item--logo",
  }));

  return (
    <Link to="/contact" className="footer__carrusel-wrapper heading--jumbo text-decoration--none">
      {footerItems.map((item, index) => (
        <div className="footer__carrusel-item" key={index}>
          <div className="footer__carrusel-item--text">{item.text}</div>
          <div className={item.logoClass}></div>
        </div>
      ))}
    </Link>
  );
};

export default InfiniteCarrusel;
