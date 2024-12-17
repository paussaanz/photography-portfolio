import { Link } from "react-router-dom";
import { useTransition } from "../../contexts/transitionContext";

const InfiniteCarrusel = () => {
  const { handleLinkClick } = useTransition();

  const footerItems = Array.from({ length: 3 }, () => ({
    text: "GET IN TOUCH",
    logoClass: "footer__carrusel-item--logo",
  }));

  return (
    <div className="footer__carrusel-wrapper heading--jumbo text-decoration--none">
      {footerItems.map((item, index) => (
        <div onClick={() => handleLinkClick("/contact")} className="footer__carrusel-item" data-hover="a" key={index}>
          <div onClick={() => handleLinkClick("/contact")} className="footer__carrusel-item--text" data-hover="a">{item.text}</div>
          <div onClick={() => handleLinkClick("/contact")} className={item.logoClass} data-hover="a"></div>
        </div>
      ))}
    </div>
  );
};

export default InfiniteCarrusel;
