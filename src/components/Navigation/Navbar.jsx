import { Link, useLocation } from "react-router-dom";
import PreloadLink from './PreLoadLink';

const Navbar = () => {

  const location = useLocation();

  const isPrimaryPage = location.pathname === '' || location.pathname === '/editorials' || location.pathname === '/portfolio';


  return (
    <nav className={`cus-navbar cus-navbar--expand-lg background--transparent`}>
      <div className="cus-navbar--container-fluid cus-navbar--container padding--y-4">
        <div className="flex--display flex--grow-1">
          <ul className="cus-navbar--navbar-nav margin--right-auto margin--bottom-2 margin--bottom-lg-0">
            <li className="nav-item">
              <Link reloadDocument to="/portfolio" className={`cus-navbar--nav-link ${isPrimaryPage ? 'text-color--light' : 'text-color--light'}`}>
                Portfolio
              </Link>
            </li>
            <li className="nav-item">
              <Link reloadDocument to="/editorials" className={`cus-navbar--nav-link ${isPrimaryPage ? 'text-color--light' : 'text-color--light'}`}>
                Editorials
              </Link>
            </li>
            <li className="nav-item">
              <Link reloadDocument to="/about" className={`cus-navbar--nav-link ${isPrimaryPage ? 'text-color--light' : 'text-color--light'}`}>
                About SYP!
              </Link>

            </li>
          </ul>
        </div>
        <Link reloadDocument to="/" className={`cus-navbar--brand-centered`}>
          <img src="/logo-white.svg" alt="Logo de Gunterz" width="39" height="61" />
        </Link>
        <div className="flex--display">
          <ul className="cus-navbar--navbar-nav margin--left--auto margin--bottom-2 margin--bottom-lg-0">
            <li className="nav-item">
              <Link reloadDocument to="/contact" className={`cus-navbar--nav-link ${isPrimaryPage ? 'text-color--light' : 'text-color--light'}`}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
