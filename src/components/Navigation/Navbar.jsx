import { Link, useLocation } from "react-router-dom";
import { useTransition } from "../../contexts/transitionContext";

const Navbar = () => {
  const { handleLinkClick } = useTransition();
  const location = useLocation();

  const isPrimaryPage = location.pathname === '' || location.pathname === '/editorials' || location.pathname === '/portfolio';


  return (
    <nav className={`cus-navbar cus-navbar--expand-lg background--transparent`}>
      <div className="cus-navbar__container cus-navbar__container-fluid p--y-4">
        <div className="flex flex--g-1">
          <ul className="cus-navbar__links m--r-auto m--b-2 m--b-lg-0">
            <li className="cus-navbar__item">
              <a onClick={() => handleLinkClick('/portfolio')} className={`cus-navbar__item-link ${isPrimaryPage ? 'text-color--light' : 'text-color--light'}`}>
                Portfolio
              </a>
            </li>
            <li className="cus-navbar__item">
              <a onClick={() => handleLinkClick('/editorials')} className={`cus-navbar__item-link ${isPrimaryPage ? 'text-color--light' : 'text-color--light'}`}>
                Editorials
              </a>
            </li>
            <li className="cus-navbar__item">
              <a onClick={() => handleLinkClick('/about')} className={`cus-navbar__item-link ${isPrimaryPage ? 'text-color--light' : 'text-color--light'}`}>
                About SYP!
              </a>
            </li>
          </ul>
        </div>
        <a onClick={() => handleLinkClick('/')} className="cus-navbar__logo--centered">
          <img src="/logo-white.svg" alt="Logo de Gunterz" width="39" height="61" />
        </a>
        <div className="flex">
          <ul className="cus-navbar__links m--l--auto m--b-2 m--b-lg-0">
            <li className="nav-item">
              <a onClick={() => handleLinkClick('/contact')} className={`cus-navbar__item-link ${isPrimaryPage ? 'text-color--light' : 'text-color--light'}`}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
