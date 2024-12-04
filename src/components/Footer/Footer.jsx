import { useLocation } from "react-router-dom";
import InfiniteCarrusel from "./InfiniteCarrusel";
import Scene3D from "./Scene3D";

const HIDDEN_ROUTES = ["/contact", "/contact/form"];

const Footer = () => {
    const { pathname } = useLocation();

    // Determine whether the footer should be hidden
    const isHidden = HIDDEN_ROUTES.includes(pathname);

    if (isHidden) {
        return null; // Early return to avoid rendering the footer
    }

    return (
        <div className="footer__section">
            <section className="footer__section-carrusel">
                <InfiniteCarrusel />
            </section>
            <section className="footer__section-3d-logo">
                <Scene3D />
            </section>
            <section className="footer__section-links">
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
