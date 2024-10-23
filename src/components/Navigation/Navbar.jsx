import { Link, useLocation } from "react-router-dom";
import PreloadLink from './PreLoadLink';

const Navbar = () => {

  const location = useLocation();

  const isPrimaryPage = location.pathname === '' || location.pathname === '/editorials' || location.pathname === '/portfolio';


  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-transparent`}>
      <div className="container-fluid navbar-container py-4">
        <div className="d-flex flex-grow-1">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link reloadDocument to="/portfolio" className={`nav-link ${isPrimaryPage ? 'text-light' : 'text-light'}`}>
                Portfolio
              </Link>
            </li>
            <li className="nav-item">
              <Link reloadDocument to="/editorials" className={`nav-link ${isPrimaryPage ? 'text-light' : 'text-light'}`}>
                Editorials
              </Link>
            </li>
            <li className="nav-item">
              <Link reloadDocument to="/about" className={`nav-link ${isPrimaryPage ? 'text-light' : 'text-light'}`}>
                About SYP!
              </Link>

            </li>
          </ul>
        </div>
        <Link reloadDocument to="/" className={`navbar-brand-centered`}>
          <img src="/logo-white.svg" alt="Logo de Gunterz" width="39" height="61" />
        </Link>
        <div className="d-flex">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link reloadDocument to="/contact" className={`nav-link ${isPrimaryPage ? 'text-light' : 'text-light'}`}>
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
